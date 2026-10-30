import { gsap } from "./gsap";

/** Shared focus-visible ring for interactive elements on the cream surfaces. */
export const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

/* Burgundy is ~1.4:1 on charcoal and 1:1 on burgundy, so the same ring is
   invisible on the dark surfaces; cream clears 3:1 against both. */
export const focusOnDark = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-brand";

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
