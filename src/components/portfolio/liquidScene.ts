import * as THREE from "three";
import { RIPPLE_COUNT, vertexShader, fragmentShader } from "./liquidShaders";
import { cappedDpr } from "@/lib/perf";

/** Renderer + shader plumbing for one LiquidImage host element. */
export function createLiquidScene(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(cappedDpr(1.5));
  renderer.domElement.style.display = "block";
  renderer.domElement.style.opacity = "0";
  renderer.domElement.style.transition = "opacity 500ms ease-out";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const ripples = Array.from({ length: RIPPLE_COUNT }, () => new THREE.Vector3(0, 0, -1000));
  const uniforms = {
    uTexture: { value: null as THREE.Texture | null },
    uImageSize: { value: new THREE.Vector2(1, 1) },
    uPlaneSize: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uRipples: { value: ripples },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uPointerActive: { value: 0 },
  };

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const setSize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    uniforms.uPlaneSize.value.set(w, h);
  };

  const load = (src: string, onReady: () => void) => {
    new THREE.TextureLoader().load(
      src,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        uniforms.uTexture.value = texture;
        uniforms.uImageSize.value.set(texture.image.width, texture.image.height);
        setSize();
        onReady();
      },
      undefined,
      () => {},
    );
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
    uniforms.uTexture.value?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { renderer, scene, camera, uniforms, ripples, setSize, load, dispose };
}
