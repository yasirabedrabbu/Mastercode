import * as THREE from "three";
import { dustFragment, dustVertex } from "./preloaderShaders";

const COUNT = 1100;
const TOP = 15;
const FLOOR = -3;

/** Gold dust drifting upward through the horizon, flickering as it rises. */
export function createDust(pixelRatio: number) {
  const positions = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  const phases = new Float32Array(COUNT);
  const speeds = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    positions.set([(Math.random() - 0.5) * 58, Math.random() * (TOP - FLOOR) + FLOOR, (Math.random() - 0.5) * 58], i * 3);
    sizes[i] = 1.4 + Math.random() * 4.2;
    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.25 + Math.random() * 0.85;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  const uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uColor: { value: new THREE.Color(0xc9a24b) },
  };
  const material = new THREE.ShaderMaterial({
    vertexShader: dustVertex,
    fragmentShader: dustFragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;

  const drift = (dt: number) => {
    const attr = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const y = attr.getY(i) + speeds[i] * dt;
      attr.setY(i, y > TOP ? FLOOR : y);
    }
    attr.needsUpdate = true;
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
  };

  return { points, uniforms, drift, dispose };
}
