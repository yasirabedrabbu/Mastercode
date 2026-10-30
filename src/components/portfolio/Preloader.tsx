"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ui";
import { createPreloaderScene } from "./preloaderScene";
import PreloaderHud, { SEGMENTS } from "./PreloaderHud";

/** Loading curtain: a glowing water horizon builds behind the HUD, then wipes away. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const host = stage.current;
      if (!el || !host) return;

      const unlock = () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      };
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 0 });
        unlock();
        return () => unlock();
      }

      const scene = createPreloaderScene(host);
      const counter = { v: 0 };
      const count = el.querySelector<HTMLElement>(".pre-count");
      const words = el.querySelector<HTMLElement>(".pre-words");
      let step = 0;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { autoAlpha: 0 });
          unlock();
        },
      });

      tl.from(".pre-enter", { yPercent: 55, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 })
        .from(".pre-bracket", { scale: 0.55, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, 0.15)
        .to(".pre-seg", { scaleX: 1, duration: 0.18, ease: "power2.out", stagger: 1.6 / SEGMENTS }, 0.2)
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count) count.textContent = String(Math.round(counter.v)).padStart(3, "0");
              scene.uniforms.uProgress.value = counter.v / 100;
              scene.uniforms.uCalm.value = counter.v / 100;
              /* Advance the status word every quarter of the load. */
              const next = Math.min(words ? words.childElementCount - 1 : 0, Math.floor(counter.v / 25));
              if (next !== step && words) {
                step = next;
                gsap.to(words, { yPercent: -(100 / words.childElementCount) * next, duration: 0.45, ease: "power3.out" });
              }
            },
          },
          0.2,
        )
        .to(scene.uniforms.uSweep, { value: 74, duration: 0.9, ease: "power2.in" }, 1.65)
        .to(".pre-enter", { autoAlpha: 0, yPercent: -26, duration: 0.4, ease: "power2.in" }, 1.7)
        .to(el, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 2.3);

      return () => {
        tl.kill();
        scene.dispose();
        unlock();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[200] overflow-hidden bg-ink text-on-brand">
      <div ref={stage} className="absolute inset-0" />
      <PreloaderHud />
    </div>
  );
}
