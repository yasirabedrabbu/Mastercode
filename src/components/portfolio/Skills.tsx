"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PenTool03Icon, UserSearch01Icon, UniversalAccessIcon, AiMagicIcon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ui";
import { skills } from "@/data/cv";
import Eyebrow from "./Eyebrow";

const skillIcons = [PenTool03Icon, UserSearch01Icon, UniversalAccessIcon, AiMagicIcon];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".skill-item", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.05, ease: "power3.out" });
    },
    { dependencies: [activeSkill] },
  );

  return (
    <section id="skills" aria-labelledby="skills-title" className="skills bg-bg-deep px-4 py-28 text-on-brand md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Eyebrow light>Skills &amp; tools</Eyebrow>
            <h2 id="skills-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              What I bring <span className="italic text-accent">to the table</span>
            </h2>
          </div>
          <p className="max-w-sm text-on-brand/85 md:justify-self-end">Four disciplines I combine on every project, from the first research question to the final handoff.</p>
        </div>

        <div data-reveal className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">
          <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="flex flex-col gap-2"
            onKeyDown={(e) => {
              if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
              e.preventDefault();
              const next = (activeSkill + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : skills.length - 1)) % skills.length;
              setActiveSkill(next);
              document.getElementById(`skill-tab-${next}`)?.focus();
            }}
          >
            {skills.map((g, i) => {
              const on = activeSkill === i;
              return (
                <button
                  key={g.group}
                  id={`skill-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="skill-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActiveSkill(i)}
                  className={`group flex items-center gap-5 rounded-3xl border p-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand ${
                    on ? "border-on-brand bg-on-brand text-ink" : "border-hair-light hover:border-on-brand/50"
                  }`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${on ? "bg-brand text-on-brand" : "bg-white/10"}`}>
                    <HugeiconsIcon icon={skillIcons[i]} size={24} strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-bold">{g.group}</span>
                    <span className={`text-sm ${on ? "text-ink-soft" : "text-on-brand/75"}`}>{g.items.length} skills</span>
                  </span>
                  <span aria-hidden className={`font-display text-sm font-bold ${on ? "text-brand" : "text-on-brand/50"}`}>0{i + 1}</span>
                </button>
              );
            })}
          </div>

          <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${activeSkill}`} tabIndex={0} className="flex flex-col justify-between rounded-[2rem] bg-bg p-8 text-ink md:p-12">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Category 0{activeSkill + 1}</p>
                <h3 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{skills[activeSkill].group}</h3>
              </div>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-on-brand">
                <HugeiconsIcon icon={skillIcons[activeSkill]} size={30} strokeWidth={1.6} aria-hidden />
              </span>
            </div>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {skills[activeSkill].items.map((s) => (
                <li key={s} className="skill-item flex items-center gap-3 rounded-2xl border border-line bg-bg-white px-5 py-4 font-medium">
                  <HugeiconsIcon icon={CheckmarkBadge01Icon} size={20} aria-hidden className="shrink-0 text-brand" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
