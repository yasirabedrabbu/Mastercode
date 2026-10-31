import type { ComponentProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { tapAnim } from "@/lib/ui";

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

/** One category tab — a compact swipeable chip up to `lg`, then the full card.
 *  Roving tabindex: only the tab holding focus stays in the tab order. */
export default function SkillTab({ group, count, index, icon, selected, roving, onSelect }: Props) {
  return (
    <button
      id={`skill-tab-${index}`}
      role="tab"
      type="button"
      aria-selected={selected}
      aria-controls={`skill-panel-${index}`}
      tabIndex={roving ? 0 : -1}
      onClick={(e) => { tapAnim(e.currentTarget); onSelect(); }}
      className={`group flex min-h-11 shrink-0 snap-start items-center gap-3 rounded-full border px-3 py-2 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand lg:min-h-0 lg:gap-5 lg:rounded-3xl lg:p-5 ${
        selected ? "border-on-brand bg-on-brand text-ink" : "border-hair-light hover:border-on-brand/50"
      }`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:h-12 lg:w-12 lg:rounded-2xl ${selected ? "bg-brand text-on-brand" : "bg-white/10"}`}>
        <HugeiconsIcon icon={icon} size={22} strokeWidth={1.8} aria-hidden />
      </span>
      <span className="lg:flex-1">
        <span className="block whitespace-nowrap font-display text-base font-bold lg:text-xl">{group}</span>
        <span className={`whitespace-nowrap text-xs lg:text-sm ${selected ? "text-ink-soft" : "text-on-brand/75"}`}>{count} skills</span>
      </span>
      <span aria-hidden className={`hidden font-display text-sm font-bold lg:block ${selected ? "text-brand" : "text-on-brand/50"}`}>0{index + 1}</span>
    </button>
  );
}
