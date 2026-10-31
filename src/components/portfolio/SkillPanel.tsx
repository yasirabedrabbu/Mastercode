import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";

type SkillIcon = ComponentProps<typeof HugeiconsIcon>["icon"];

type Props = {
  group: string;
  items: string[];
  index: number;
  icon: SkillIcon;
  active: boolean;
};

/**
 * One category panel. Every panel stays in the DOM — inactive ones use the
 * `hidden` attribute, so crawlers still read all four categories.
 */
export default function SkillPanel({ group, items, index, icon, active }: Props) {
  return (
    <div
      id={`skill-panel-${index}`}
      role="tabpanel"
      aria-labelledby={`skill-tab-${index}`}
      tabIndex={0}
      hidden={!active}
      className="flex flex-col justify-between rounded-[2rem] bg-bg p-8 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:p-12"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Category 0{index + 1}</p>
          <h3 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{group}</h3>
        </div>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-on-brand">
          <HugeiconsIcon icon={icon} size={30} strokeWidth={1.6} aria-hidden />
        </span>
      </div>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2">
        {items.map((s) => (
          <li key={s} className="skill-item flex items-center gap-3 rounded-2xl border border-line bg-bg-white px-5 py-4 font-medium">
            <HugeiconsIcon icon={CheckmarkBadge01Icon} size={20} aria-hidden className="shrink-0 text-brand" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
