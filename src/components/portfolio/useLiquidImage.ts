"use client";

import { useEffect, useRef } from "react";
import { createLiquidScene } from "./liquidScene";
import { createPointerTrail } from "./liquidPointer";

/** Drives one liquid surface: pointer trail, render loop, observers and disposal. */
export function useLiquidImage(src: string) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { renderer, scene, camera, uniforms, ripples, setSize, load, dispose } = createLiquidScene(el);
    const trail = createPointerTrail(el, ripples);

    let raf = 0,
      disposed = false,
      visible = false,
      ready = false;

    const render = () => {
      const t = performance.now() / 1000;
      uniforms.uTime.value = t;
      // Slow the ease so the surface keeps gliding after the cursor stops.
      uniforms.uPointer.value.lerp(trail.target, 0.085);
      uniforms.uHover.value += (trail.hover() - uniforms.uHover.value) * 0.07;
      const active = trail.movedAgo(t) < 1.2 ? 1 : 0;
      uniforms.uPointerActive.value += (active - uniforms.uPointerActive.value) * 0.045;
      renderer.render(scene, camera);
    };

    const start = () => {
      if (raf || reduce || disposed || !visible || !ready) return;
      const loop = () => {
        render();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(() => {
      setSize();
      if (reduce) render();
    });
    ro.observe(el);

    // Pause the render loop whenever the card is off-screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);

    setSize();

    load(src, () => {
      if (disposed) return;
      ready = true;
      renderer.domElement.style.opacity = "1";
      render();
      start();
    });

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      trail.detach();
      dispose();
    };
  }, [src]);

  return host;
}
