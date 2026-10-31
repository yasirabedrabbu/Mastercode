import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { gridFragment, gridVertex } from "./preloaderShaders";
import { createDust } from "./preloaderParticles";
import { cappedDpr } from "@/lib/perf";

const INK = 0x1f1f24;

/** Water horizon, gold dust and bloom — rendered behind the preloader HUD. */
export function createPreloaderScene(host: HTMLElement) {
  const pixelRatio = cappedDpr(1.5);
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(INK, 1);
  renderer.domElement.style.display = "block";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 140);
  const base = new THREE.Vector3(0, 3.4, 9.5);
  const anchor = new THREE.Vector3(0, 0.4, -7);
  camera.position.copy(base);
  camera.lookAt(anchor);

  const uniforms = {
    uTime: { value: 0 },
    uCalm: { value: 0 },
    uSweep: { value: 0 },
    uProgress: { value: 0 },
    uGold: { value: new THREE.Color(0xc9a24b) },
    uCream: { value: new THREE.Color(0xf6efe6) },
  };

  const geometry = new THREE.PlaneGeometry(64, 64, 150, 150);
  const material = new THREE.ShaderMaterial({
    vertexShader: gridVertex,
    fragmentShader: gridFragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  const dust = createDust(pixelRatio);
  scene.add(dust.points);

  /* Bloom renders to an offscreen target, so MSAA has to live on that target. */
  const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.95, 0.75, 0.18));
  composer.addPass(new OutputPass());

  const pointer = new THREE.Vector2(0, 0);
  const onMove = (e: PointerEvent) => pointer.set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);

  const setSize = () => {
    const w = host.clientWidth || window.innerWidth;
    const h = host.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(setSize);
  observer.observe(host);
  setSize();
  window.addEventListener("pointermove", onMove);

  const timer = new THREE.Timer();
  // Page Visibility API: no giant delta when the tab comes back.
  timer.connect(document);
  let raf = 0;
  const tick = (now?: number) => {
    timer.update(now);
    const dt = Math.min(timer.getDelta(), 0.05);
    const elapsed = timer.getElapsed();
    uniforms.uTime.value = elapsed;
    dust.uniforms.uTime.value = elapsed;
    dust.drift(dt);
    /* Pointer parallax plus a slow push-in as the counter climbs. */
    camera.position.x += (base.x + pointer.x * 2.6 - camera.position.x) * 0.035;
    camera.position.y += (base.y + pointer.y * 1.3 - camera.position.y) * 0.035;
    camera.position.z += (base.z - uniforms.uProgress.value * 2.6 - camera.position.z) * 0.03;
    camera.lookAt(anchor);
    composer.render();
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  const dispose = () => {
    cancelAnimationFrame(raf);
    timer.dispose();
    observer.disconnect();
    window.removeEventListener("pointermove", onMove);
    geometry.dispose();
    material.dispose();
    dust.dispose();
    composer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { uniforms, dispose };
}
