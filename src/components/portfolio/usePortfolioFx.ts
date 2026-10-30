"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/** Cross-section scroll choreography: hero intro, reveal batch, scrub effects, counters. */
export function usePortfolioFx(root: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-line > span", { yPercent: 110, duration: 1.3, stagger: 0.12 })
          .from(".hero-fade", { autoAlpha: 0, y: 30, duration: 1, stagger: 0.1 }, "-=0.9")
          .from(".hero-photo", { clipPath: "inset(100% 0 0 0)", scale: 1.15, duration: 1.4, clearProps: "clipPath,scale" }, "-=1.2");

        gsap.to(".hero-photo img", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }),
        });

        gsap.fromTo(".about-word", { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".about-words", start: "top 80%", end: "bottom 45%", scrub: true } });
        gsap.fromTo(".contact-img", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".contact-img", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".cert-row", { autoAlpha: 0, x: 30, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".cert-row", start: "top 85%", once: true } });
        gsap.utils.toArray<HTMLElement>(".case-row").forEach((row) => {
          gsap.from(row, { autoAlpha: 0, y: 40, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 85%", once: true } });
        });
        gsap.from(".contact-giant", { yPercent: 60, ease: "none", scrollTrigger: { trigger: ".contact-giant", start: "top bottom", end: "bottom bottom", scrub: true } });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: Number(el.dataset.count),
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
          });
        });

        gsap.fromTo(".timeline-progress", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#experience", start: "top 60%", end: "bottom 70%", scrub: true } });
      });

      // The sticky shot-stack only exists at md+, so gate its scrub effects to the same breakpoint.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".shot-card");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          // Fade a separate veil instead of filtering the whole card, so the hover
          // border / background stay bright even while a card is dimmed behind the next.
          gsap
            .timeline({ scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 15%", scrub: true } })
            .to(card.querySelector(".shot-inner"), { scale: 0.9, ease: "none" }, 0)
            .to(card.querySelector(".shot-dim"), { opacity: 0.55, ease: "none" }, 0);
        });
      });
    },
    { scope: root },
  );
}
