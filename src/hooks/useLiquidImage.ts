"use client";

import { useEffect, useRef } from "react";
import { isLowPower, observeOnScreen } from "@/lib/perf";
import { createLiquidScene } from "./liquidScene";
import { createPointerTrail } from "./liquidPointer";

/** Frame-rate independent ease: fraction of the remaining gap to close this frame. */
const ease = (dt: number, rate: number) => 1 - Math.exp(-dt * rate);

/** Drives one liquid surface: pointer trail, render loop, observers and disposal. */
export function useLiquidImage(src: string) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    // Reduced motion, phones and low-core machines get one static frame instead of a loop.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLowPower();
    const { renderer, scene, camera, uniforms, ripples, setSize, load, dispose } = createLiquidScene(el);
    const trail = createPointerTrail(el, ripples);

    let raf = 0,
      disposed = false,
      visible = false,
      ready = false,
      prev = performance.now() / 1000;

    const render = () => {
      const t = performance.now() / 1000;
      // Clamp so a long frame or a stalled tab can't jump the whole surface.
      const dt = Math.min(Math.max(t - prev, 0), 0.05);
      prev = t;
      uniforms.uTime.value = t;
      // Slow the ease so the surface keeps gliding after the cursor stops.
      uniforms.uPointer.value.lerp(trail.target, ease(dt, 5.2));
      uniforms.uHover.value += (trail.hover() - uniforms.uHover.value) * ease(dt, 4.5);
      const active = trail.movedAgo(t) < 1.2 ? 1 : 0;
      uniforms.uPointerActive.value += (active - uniforms.uPointerActive.value) * ease(dt, 2.8);
      renderer.render(scene, camera);
    };

    const start = () => {
      if (raf || still || disposed || !visible || !ready) return;
      prev = performance.now() / 1000;
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
      if (still) render();
    });
    ro.observe(el);

    // Pause the render loop whenever the card scrolls away or the tab is hidden.
    const release = observeOnScreen(el, (on) => {
      visible = on;
      if (on) start();
      else stop();
    });

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
      release();
      trail.detach();
      dispose();
    };
  }, [src]);

  return host;
}
