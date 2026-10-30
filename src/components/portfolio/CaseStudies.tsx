"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Target02Icon, Idea01Icon, ChartIncreaseIcon } from "@hugeicons/core-free-icons";
import { caseStudies } from "@/data/cv";
import { focus } from "@/lib/ui";
import Eyebrow from "./Eyebrow";

const steps = [
  ["challenge", "Challenge", Target02Icon],
  ["approach", "Approach", Idea01Icon],
  ["outcome", "Outcome", ChartIncreaseIcon],
] as const;

/** Expandable ledger of case studies — flat, borderless-adjacent, motion-driven. */
export default function CaseStudies() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" aria-labelledby="work-title" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-16 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Eyebrow>Case studies</Eyebrow>
            <h2 id="work-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Problems I&apos;ve <span className="italic text-brand">solved</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft md:justify-self-end">Each project starts with a business goal and ends with a journey developers can build with confidence.</p>
        </div>

        <ol className="border-t border-line">
          {caseStudies.map((c, i) => {
            const index = String(i + 1).padStart(2, "0");
            const isOpen = open === i;
            return (
              <li key={c.title} className="case-row border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`case-panel-${i}`}
                    className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-8 text-left md:gap-8 md:py-10 ${focus}`}
                  >
                    <span className="font-display text-sm font-bold tabular-nums text-ink-faint transition-colors duration-300 group-hover:text-brand">{index}</span>
                    <span className="min-w-0">
                      <span className={`block font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 md:text-4xl ${isOpen ? "text-brand" : "group-hover:text-brand"}`}>
                        {c.title}
                      </span>
                      <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">{c.tag}</span>
                    </span>
                    <span
                      aria-hidden
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-[135deg] border-brand text-brand" : "border-line-strong text-ink group-hover:border-brand group-hover:text-brand"
                      }`}
                    >
                      <span className="absolute h-4 w-px bg-current" />
                      <span className="absolute h-px w-4 bg-current" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`case-panel-${i}`}
                  inert={!isOpen}
                  className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <dl className="grid gap-8 overflow-hidden pb-10 md:grid-cols-3 md:gap-10">
                    {steps.map(([k, label, icon]) => (
                      <div key={k} className="case-step border-l border-line-strong/50 pl-6">
                        <dt className="flex items-center gap-3 font-display text-lg font-bold">
                          <HugeiconsIcon icon={icon} size={20} strokeWidth={1.8} aria-hidden className="text-brand" />
                          {label}
                        </dt>
                        <dd className="mt-3 text-sm leading-relaxed text-ink-soft">{c[k]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
