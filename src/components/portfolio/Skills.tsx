"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { PenTool03Icon, UserSearch01Icon, UniversalAccessIcon, AiMagicIcon } from "@hugeicons/core-free-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ui";
import { skills } from "@/data/cv";
import Eyebrow from "./Eyebrow";
import SkillTab from "./SkillTab";
import SkillPanel from "./SkillPanel";

const skillIcons = [PenTool03Icon, UserSearch01Icon, UniversalAccessIcon, AiMagicIcon];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const last = skills.length - 1;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Only the visible panel animates — the other three are in the DOM but hidden.
      gsap.from(`#skill-panel-${activeSkill} .skill-item`, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.05, ease: "power3.out" });
    },
    { dependencies: [activeSkill], scope: rootRef },
  );

  const step = (delta: number) => {
    const next = (activeSkill + delta + skills.length) % skills.length;
    setActiveSkill(next);
    document.getElementById(`skill-tab-${next}`)?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        step(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        step(-1);
        break;
      case "Home":
        e.preventDefault();
        step(-activeSkill);
        break;
      case "End":
        e.preventDefault();
        step(last - activeSkill);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        document.getElementById(`skill-tab-${activeSkill}`)?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="skills bg-bg-deep px-4 py-28 text-on-brand md:px-8 md:py-36">
      <div ref={rootRef} className="mx-auto max-w-7xl">
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
          <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="flex flex-col gap-2" onKeyDown={onKeyDown}>
            {skills.map((g, i) => (
              <SkillTab
                key={g.group}
                group={g.group}
                count={g.items.length}
                index={i}
                icon={skillIcons[i]}
                selected={activeSkill === i}
                roving={activeSkill === i}
                onSelect={() => setActiveSkill(i)}
              />
            ))}
          </div>

          <div className="grid">
            {skills.map((g, i) => (
              <SkillPanel key={g.group} group={g.group} items={g.items} index={i} icon={skillIcons[i]} active={activeSkill === i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
