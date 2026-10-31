"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ui";
import { createPreloaderScene } from "./preloaderScene";
import PreloaderHud, { SEGMENTS } from "./PreloaderHud";

/** Hard cap on the whole intro, so the curtain can never trap the page. */
const FAILSAFE_MS = 1600;

/** Loading curtain: a glowing water horizon builds behind the HUD, then wipes away.
    It renders `hidden`, so with JS off (or storage blocked) the page reads normally;
    the gate in <head> is what un-hides it, for the first visit of a session only. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const host = stage.current;
      if (!el || !host) return;
      // Decided in <head>: first visit of the session only.
      if (document.documentElement.dataset.preload !== "on") return;
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }

      const unlock = () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      };
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const failsafe = window.setTimeout(() => {
        gsap.set(el, { autoAlpha: 0 });
        unlock();
      }, FAILSAFE_MS);

      const scene = createPreloaderScene(host);
      const counter = { v: 0 };
      const count = el.querySelector<HTMLElement>(".pre-count");
      const words = el.querySelector<HTMLElement>(".pre-words");
      let step = 0;

      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(failsafe);
          gsap.set(el, { autoAlpha: 0 });
          unlock();
        },
      });

      /* The whole sequence is ~1s, so the curtain never holds the page hostage. */
      tl.from(".pre-enter", { yPercent: 55, autoAlpha: 0, duration: 0.28, ease: "power3.out", stagger: 0.03 })
        .from(".pre-bracket", { scale: 0.55, autoAlpha: 0, duration: 0.22, ease: "power3.out", stagger: 0.02 }, 0.05)
        .to(".pre-seg", { scaleX: 1, duration: 0.08, ease: "power2.out", stagger: 0.62 / SEGMENTS }, 0.08)
        .to(
          counter,
          {
            v: 100,
            duration: 0.62,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count) count.textContent = String(Math.round(counter.v)).padStart(3, "0");
              scene.uniforms.uProgress.value = counter.v / 100;
              scene.uniforms.uCalm.value = counter.v / 100;
              /* Advance the status word every quarter of the load. */
              const next = Math.min(words ? words.childElementCount - 1 : 0, Math.floor(counter.v / 25));
              if (next !== step && words) {
                step = next;
                gsap.to(words, { yPercent: -(100 / words.childElementCount) * next, duration: 0.14, ease: "power3.out" });
              }
            },
          },
          0.08,
        )
        .to(scene.uniforms.uSweep, { value: 74, duration: 0.3, ease: "power2.in" }, 0.54)
        .to(".pre-enter", { autoAlpha: 0, yPercent: -26, duration: 0.22, ease: "power2.in" }, 0.56)
        .to(el, { yPercent: -100, duration: 0.28, ease: "expo.inOut" }, 0.72);

      return () => {
        window.clearTimeout(failsafe);
        tl.kill();
        scene.dispose();
        unlock();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="preloader hidden fixed inset-0 z-[200] overflow-hidden bg-ink text-on-brand">
      <div ref={stage} className="absolute inset-0" />
      <PreloaderHud />
    </div>
  );
}
