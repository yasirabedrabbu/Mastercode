"use client";

import { useEffect } from "react";
import { playScrollTick, unlockAudio } from "@/lib/clickSound";

/** One soft scroll tick every ~90px (throttled) plus audio unlock on the first input. */
export function useScrollTicks() {
  useEffect(() => {
    let last = window.scrollY,
      acc = 0,
      lastTick = 0;
    const unlock = () => unlockAudio();
    const onScroll = () => {
      const y = window.scrollY;
      acc += Math.abs(y - last);
      last = y;
      const now = performance.now();
      if (acc >= 90 && now - lastTick > 55) {
        acc = 0;
        lastTick = now;
        playScrollTick();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    ["pointerdown", "keydown", "touchstart"].forEach((ev) => window.addEventListener(ev, unlock, { once: true, passive: true }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      ["pointerdown", "keydown", "touchstart"].forEach((ev) => window.removeEventListener(ev, unlock));
    };
  }, []);
}
