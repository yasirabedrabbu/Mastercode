"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ui";
import { profile } from "@/data/cv";

/** Full-screen loading curtain: counts up, then wipes away to reveal the site. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
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

      const counter = { v: 0 };
      const count = el.querySelector<HTMLElement>(".pre-count");
      gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
            unlock();
          },
        })
        .to(counter, {
          v: 100,
          duration: 1.3,
          onUpdate: () => {
            if (count) count.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(".pre-bar", { scaleX: 1, duration: 1.3 }, 0)
        .to(".pre-mark", { yPercent: -120, autoAlpha: 0, duration: 0.5, ease: "power3.inOut" }, "-=0.15")
        .to(el, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "-=0.3");

      return () => unlock();
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink text-on-brand">
      <div className="pre-mark flex flex-col items-center gap-7">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand font-display text-2xl font-bold tracking-tight">YR</span>
        <p className="font-display text-xl font-semibold tracking-tight">{profile.name}</p>
      </div>
      <div className="absolute inset-x-0 bottom-14 mx-auto w-[min(22rem,72vw)]">
        <div className="flex items-baseline justify-between font-display text-xs font-bold uppercase tracking-[0.3em] text-on-brand/60">
          <span>Loading</span>
          <span className="pre-count tabular-nums text-on-brand">000</span>
        </div>
        <div className="mt-4 h-px w-full bg-on-brand/20">
          <span className="pre-bar block h-px w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
