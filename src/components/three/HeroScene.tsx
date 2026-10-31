"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { animateOnScreen, cappedDpr, isLowPower } from "@/lib/perf";

/** Decorative Three.js scene: a glowing wireframe form inside a particle field. */
export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Phones, low-core machines and reduced-motion visitors get one static frame.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLowPower();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(cappedDpr(2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    const group = new THREE.Group();
    scene.add(group);
    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 180, 20);
    const knotMat = new THREE.MeshBasicMaterial({ color: 0xc9a24b, wireframe: true, transparent: true, opacity: 0.35 });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    const count = 1400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3);
    }
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pointsMat = new THREE.PointsMaterial({ color: 0x6b1a2b, size: 0.03, transparent: true, opacity: 0.6 });
    const points = new THREE.Points(ptsGeo, pointsMat);
    group.add(points);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (still) renderer.render(scene, camera);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    const timer = new THREE.Timer();
    // Page Visibility API: no giant delta when the tab comes back.
    timer.connect(document);
    const draw = () => renderer.render(scene, camera);
    const frame = () => {
      timer.update();
      const t = timer.getElapsed();
      knot.rotation.x = t * 0.15;
      knot.rotation.y = t * 0.2;
      points.rotation.y = t * 0.03;
      group.rotation.x += (mouse.y * 0.4 - group.rotation.x) * 0.05;
      group.rotation.y += (mouse.x * 0.6 - group.rotation.y) * 0.05;
      draw();
    };
    // The loop only runs while the hero is on screen and the tab is foregrounded.
    const stop = still ? () => {} : animateOnScreen(el, frame);
    if (still) draw();

    return () => {
      stop();
      timer.dispose();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      knotGeo.dispose();
      knotMat.dispose();
      ptsGeo.dispose();
      pointsMat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0" />;
}
