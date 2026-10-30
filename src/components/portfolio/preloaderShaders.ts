/** Water-horizon and gold-dust shaders for the preloader backdrop. */

export const gridVertex = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uCalm;
  uniform float uSweep;

  varying vec2 vUv;
  varying float vHeight;
  varying float vFog;

  /* Layered sines plus an outward ripple: cheap, but reads as moving water. */
  float surface(vec2 p, float t) {
    float h = sin(p.y * 0.30 + t * 0.85) * 0.90;
    h += sin(p.x * 0.24 - t * 0.65) * 0.75;
    h += sin((p.x + p.y) * 0.36 + t * 1.15) * 0.42;
    h += sin(length(p) * 0.20 - t * 1.50) * 1.15;
    return h * (1.0 - uCalm * 0.55);
  }

  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += surface(p.xy, uTime);
    /* A crest that races outward once the counter has finished. */
    p.z += exp(-abs(length(p.xy) - uSweep) * 0.30) * 3.2 * step(0.5, uSweep);
    vHeight = p.z;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depth = -mv.z;
    /* Keep a visible band of water: skip what is under the camera, fade the horizon. */
    vFog = smoothstep(2.5, 11.0, depth) * (1.0 - smoothstep(20.0, 46.0, depth));
    gl_Position = projectionMatrix * mv;
  }
`;

export const gridFragment = /* glsl */ `
  precision highp float;

  uniform vec3 uGold;
  uniform vec3 uCream;
  uniform float uProgress;

  varying vec2 vUv;
  varying float vHeight;
  varying float vFog;

  void main() {
    /* A crisp grid reads cleaner than a triangle wireframe. */
    vec2 cell = abs(fract(vUv * 120.0) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.06, min(cell.x, cell.y));
    if (line < 0.01 || vFog < 0.01) discard;

    float crest = smoothstep(0.05, 1.7, vHeight);
    vec3 col = mix(uGold, uCream, clamp(crest * 0.8 + uProgress * 0.3, 0.0, 1.0));
    /* Crests overshoot 1.0 so the bloom pass has something to pick up. */
    gl_FragColor = vec4(col * (0.45 + crest * 1.25), line * (0.16 + crest * 0.85) * vFog);
  }
`;

export const dustVertex = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute float aPhase;

  varying float vFlicker;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFlicker = 0.5 + 0.5 * sin(uTime * 1.7 + aPhase);
    gl_PointSize = clamp(aSize * uPixelRatio * (16.0 / max(0.6, -mv.z)), 1.0, 30.0);
    gl_Position = projectionMatrix * mv;
  }
`;

export const dustFragment = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;

  varying float vFlicker;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(uColor * (0.7 + vFlicker), soft * (0.3 + vFlicker * 0.7));
  }
`;
