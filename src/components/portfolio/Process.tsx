"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, DashboardSquare01Icon, PaintBoardIcon, CodeIcon } from "@hugeicons/core-free-icons";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ui";
import { processSteps } from "@/data/process";
import Eyebrow from "@/components/ui/Eyebrow";

const processIcons = [Search01Icon, DashboardSquare01Icon, PaintBoardIcon, CodeIcon];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  // Activate the process step nearest the viewport centre.
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".proc-step").forEach((el, i) => {
      ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActiveStep(i) });
    });
    if (prefersReducedMotion()) return;
    gsap.fromTo(".proc-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".proc-list", start: "top 55%", end: "bottom 55%", scrub: true } });
    // Below md the card fills the whole column, so a lateral slide would drag the
    // page sideways while it plays; mobile rises into place instead.
    const wide = window.matchMedia("(min-width: 768px)").matches;
    gsap.utils.toArray<HTMLElement>(".proc-step article").forEach((card) => {
      const from = wide ? { x: 60, rotate: 1.5 } : { y: 44 };
      gsap.from(card, { autoAlpha: 0, duration: 0.9, ease: "power3.out", ...from, scrollTrigger: { trigger: card, start: "top 85%", once: true } });
    });
  });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(".proc-num", { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "expo.out" });
      gsap.fromTo(".proc-title", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
    },
    { dependencies: [activeStep] },
  );

  return (
    <section id="process" aria-labelledby="process-title" className="process px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div data-reveal>
            <Eyebrow>Process</Eyebrow>
            <h2 id="process-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Research to handoff, <span className="italic text-brand">without friction</span>
            </h2>
          </div>
          <div aria-hidden className="mt-14 hidden items-end gap-6 lg:flex">
            <span className="relative block h-[9rem] overflow-hidden font-display text-[9rem] font-bold leading-none tracking-[-0.06em] text-brand">
              <span className="proc-num block">0{activeStep + 1}</span>
            </span>
            <div className="pb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">of 0{processSteps.length}</p>
              <p className="proc-title mt-2 font-display text-2xl font-bold">{processSteps[activeStep].title}</p>
            </div>
          </div>
          <div aria-hidden className="mt-8 hidden gap-2 lg:flex">
            {processSteps.map((s, i) => (
              <span key={s.id} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                <span className={`block h-full origin-left rounded-full bg-brand transition-transform duration-700 ease-out motion-reduce:transition-none ${i <= activeStep ? "scale-x-100" : "scale-x-0"}`} />
              </span>
            ))}
          </div>
        </div>

        <ol className="proc-list relative">
          <span aria-hidden className="absolute bottom-10 left-7 top-10 w-px bg-line" />
          <span aria-hidden className="proc-line absolute bottom-10 left-7 top-10 w-0.5 origin-top -translate-x-[0.5px] bg-brand" />
          {processSteps.map((s, i) => {
            const on = activeStep === i;
            return (
              <li key={s.id} className="proc-step relative pb-8 pl-20 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute left-0 top-8 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 motion-reduce:transition-none ${
                    on ? "scale-110 border-brand bg-brand text-on-brand" : i < activeStep ? "border-brand bg-bg-white text-brand" : "border-line bg-bg-white text-ink-soft"
                  }`}
                >
                  <HugeiconsIcon icon={processIcons[i]} size={24} strokeWidth={1.8} className={`transition-transform duration-700 motion-reduce:transition-none ${on ? "rotate-[360deg]" : ""}`} />
                </span>
                <article
                  className={`rounded-[2rem] border p-8 transition-all duration-500 motion-reduce:transition-none md:p-10 ${
                    on ? "border-brand bg-bg-white lg:-translate-y-1" : "border-line bg-bg/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${on ? "text-brand" : "text-ink-soft"}`}>Step 0{i + 1}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-500 ${on ? "bg-brand text-on-brand" : i < activeStep ? "bg-surface text-brand" : "bg-surface text-ink-soft"}`}>
                      {on ? "In progress" : i < activeStep ? "Done" : "Up next"}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
