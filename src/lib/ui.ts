import { gsap } from "./gsap";

/** Shared focus-visible ring for interactive elements. */
export const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

/** True when the visitor asked the OS to reduce motion. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Quick press feedback used by nav + control buttons. */
export const tapAnim = (el: HTMLElement) => {
  if (prefersReducedMotion()) return;
  gsap
    .timeline()
    .to(el, { scale: 0.9, duration: 0.08, ease: "power2.out" })
    .to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1.2,0.4)" });
};
