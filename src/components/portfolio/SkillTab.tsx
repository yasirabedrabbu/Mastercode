import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";

type SkillIcon = ComponentProps<typeof HugeiconsIcon>["icon"];

type Props = {
  group: string;
  count: number;
  index: number;
  icon: SkillIcon;
  selected: boolean;
  roving: boolean;
  onSelect: () => void;
};

/** One category tab. Roving tabindex: only the tab holding focus stays in the tab order. */
export default function SkillTab({ group, count, index, icon, selected, roving, onSelect }: Props) {
  return (
    <button
      id={`skill-tab-${index}`}
      role="tab"
      type="button"
      aria-selected={selected}
      aria-controls={`skill-panel-${index}`}
      tabIndex={roving ? 0 : -1}
      onClick={onSelect}
      className={`group flex items-center gap-5 rounded-3xl border p-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand ${
        selected ? "border-on-brand bg-on-brand text-ink" : "border-hair-light hover:border-on-brand/50"
      }`}
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${selected ? "bg-brand text-on-brand" : "bg-white/10"}`}>
        <HugeiconsIcon icon={icon} size={24} strokeWidth={1.8} aria-hidden />
      </span>
      <span className="flex-1">
        <span className="block font-display text-xl font-bold">{group}</span>
        <span className={`text-sm ${selected ? "text-ink-soft" : "text-on-brand/75"}`}>{count} skills</span>
      </span>
      <span aria-hidden className={`font-display text-sm font-bold ${selected ? "text-brand" : "text-on-brand/50"}`}>0{index + 1}</span>
    </button>
  );
}
