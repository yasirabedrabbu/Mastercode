/** Number of trailing ripples the pointer leaves behind. Must match the shader constant. */
export const RIPPLE_COUNT = 6;

/** Full-screen quad drawn in clip space, so the camera / projection matrices are unused. */
export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  #define RIPPLE_COUNT ${RIPPLE_COUNT}
  #define WAVES 4

  uniform sampler2D uTexture;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  uniform vec2 uPointer;
  uniform vec3 uRipples[RIPPLE_COUNT]; // xy = uv centre, z = birth time
  uniform float uTime;
  uniform float uHover;
  uniform float uPointerActive;

  varying vec2 vUv;

  /* object-fit: cover, expressed in uv space. */
  vec2 coverUv(vec2 uv) {
    float planeRatio = uPlaneSize.x / uPlaneSize.y;
    float imageRatio = uImageSize.x / uImageSize.y;
    vec2 scale = planeRatio < imageRatio
      ? vec2(planeRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / planeRatio);
    return (uv - 0.5) * scale + 0.5;
  }

  /* Directional gravity waves. Returning the slope (gradient) instead of a raw
     height is what makes the surface bend light like water rather than wobble
     like jelly: neighbouring points stay correlated, so the image never shears. */
  vec2 waveSlope(vec2 p, float t) {
    vec2 slope = vec2(0.0);
    for (int i = 0; i < WAVES; i++) {
      float fi = float(i);
      float angle = fi * 2.4 + 0.7;
      vec2 dir = vec2(cos(angle), sin(angle));
      float k = 3.6 + fi * 4.2;                       // wave number -> wavelength
      float amp = 0.9 / (1.0 + fi * 1.15);            // gentle falloff per octave
      slope += dir * (amp * k * cos(dot(dir, p) * k + t * (0.85 + fi * 0.4)));
    }
    return slope;
  }

  void main() {
    vec2 uv = coverUv(vUv);
    float t = uTime;

    /* --- Slow coherent swell; the whole surface breathes as one body. --- */
    vec2 slope = waveSlope(uv * 0.8, t * 0.5) * (0.5 + uHover * 0.35);

    /* --- Pointer wake: rings that widen and fade out like real ripples. --- */
    float crest = 0.0;
    for (int i = 0; i < RIPPLE_COUNT; i++) {
      vec3 ripple = uRipples[i];
      float age = t - ripple.z;
      if (age < 0.0 || age > 3.4) continue;
      vec2 delta = uv - ripple.xy;
      float dist = length(delta) + 1e-4;
      float phase = dist * 20.0 - age * 5.5;
      float envelope = exp(-dist * 4.2) * exp(-age * 0.85) * (1.0 - age / 3.4);
      slope += (delta / dist) * (envelope * cos(phase) * 20.0) * (0.35 + uPointerActive * 0.65);
      crest += sin(phase) * envelope;
    }

    /* --- Refract the image along the slope, then read a normal off it. --- */
    vec2 displacement = slope * 0.0026;
    vec2 surface = uv + displacement;
    vec2 sampleUv = mix(surface, 0.5 + (surface - 0.5) * 0.94, uHover);

    vec2 split = displacement * 0.3;
    vec3 col;
    col.r = texture2D(uTexture, sampleUv + split).r;
    col.g = texture2D(uTexture, sampleUv).g;
    col.b = texture2D(uTexture, sampleUv - split).b;

    /* --- Glints that travel with the waves, plus a soft glow at the cursor. --- */
    vec3 normal = normalize(vec3(-slope * 0.006, 1.0));
    vec3 hv = normalize(normalize(vec3(0.35, 0.62, 0.7)) + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(normal, hv), 0.0), 44.0);
    col += vec3(1.0) * spec * 0.26;
    col += vec3(1.0) * pow(max(crest, 0.0), 2.0) * 0.1;
    col += vec3(1.0) * exp(-length(uv - uPointer) * 4.5) * uPointerActive * 0.05;

    gl_FragColor = vec4(col, 1.0);
  }
`;
