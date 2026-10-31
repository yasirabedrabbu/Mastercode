/** Number of trailing ripples the pointer leaves behind. Must match the shader constant. */
export const RIPPLE_COUNT = 8;

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
  #define LIFE 2.4

  uniform sampler2D uTexture;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  uniform vec2 uPointer;
  uniform vec3 uRipples[RIPPLE_COUNT]; // xy = drop position, z = birth time
  uniform float uTime;
  uniform float uHover;
  uniform float uPointerActive;

  varying vec2 vUv;

  /* object-fit: cover, as a uv scale about the centre. Applied last, so every
     measurement before it happens in screen space and the rings stay round. */
  vec2 coverScale() {
    float planeRatio = uPlaneSize.x / uPlaneSize.y;
    float imageRatio = uImageSize.x / uImageSize.y;
    return planeRatio < imageRatio
      ? vec2(planeRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / planeRatio);
  }

  /* Slow ambient swell: four directional gravity waves, returned as a slope so
     the displacement stays coherent instead of shearing the photo like jelly. */
  vec2 waveSlope(vec2 p, float t) {
    vec2 slope = vec2(0.0);
    for (int i = 0; i < WAVES; i++) {
      float fi = float(i);
      vec2 dir = vec2(cos(fi * 2.4 + 0.7), sin(fi * 2.4 + 0.7));
      float k = 3.6 + fi * 4.2;                       // wave number -> wavelength
      float amp = 0.9 / (1.0 + fi * 1.15);            // gentle falloff per octave
      slope += dir * (amp * k * cos(dot(dir, p) * k + t * (0.85 + fi * 0.4)));
    }
    return slope;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime;

    /* --- Ambient swell, energised while the pointer is over the card. --- */
    vec2 slope = waveSlope(uv * 0.8, t * 0.5) * (0.42 + uHover * 0.5);

    /* --- Wake: every drop launches one ring that expands out and decays. --- */
    float crest = 0.0;
    for (int i = 0; i < RIPPLE_COUNT; i++) {
      float age = t - uRipples[i].z;
      if (age < 0.0 || age > LIFE) continue;
      vec2 delta = uv - uRipples[i].xy;
      float dist = length(delta) + 1e-4;
      float ring = dist - age * 0.34;                 // the outward wavefront
      float packet = exp(-ring * ring * 120.0);       // one localised pulse
      float amp = exp(-age * 0.9) * (1.0 - age / LIFE);
      float wave = sin(ring * 30.0) * packet * amp;
      slope += (delta / dist) * wave * 26.0 * (0.4 + uPointerActive * 0.6);
      crest += wave;
    }

    /* --- The cursor presses a shallow lens into the surface. --- */
    vec2 lens = uv - uPointer;
    float press = exp(-length(lens) * 7.0) * max(uHover, uPointerActive);
    slope += lens * press * 90.0;
    crest += press * 0.3;

    /* --- Refract along the slope; hover adds a touch of magnification. --- */
    vec2 displacement = clamp(slope, -32.0, 32.0) * 0.0026;
    vec2 surface = uv + displacement;
    vec2 base = mix(surface, 0.5 + (surface - 0.5) * 0.94, uHover);
    vec2 sc = coverScale();
    vec2 sampleUv = (base - 0.5) * sc + 0.5;

    /* --- Split the channels for the thin colour fringe of moving water. --- */
    vec2 split = displacement * 0.35 * sc;
    vec3 col;
    col.r = texture2D(uTexture, sampleUv + split).r;
    col.g = texture2D(uTexture, sampleUv).g;
    col.b = texture2D(uTexture, sampleUv - split).b;

    /* --- Glints that ride the crests, plus a sheen on the lens. --- */
    vec3 normal = normalize(vec3(-slope * 0.006, 1.0));
    vec3 hv = normalize(normalize(vec3(0.35, 0.62, 0.7)) + vec3(0.0, 0.0, 1.0));
    col += vec3(1.0) * pow(max(dot(normal, hv), 0.0), 44.0) * 0.28;
    col += vec3(1.0) * pow(max(crest, 0.0), 2.0) * 0.1;

    gl_FragColor = vec4(col, 1.0);
  }
`;
