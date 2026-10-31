import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  Briefcase01Icon,
  Layers01Icon,
  Image01Icon,
  Route01Icon,
  SparklesIcon,
  Mortarboard01Icon,
  HelpCircleIcon,
  Mail01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

const eyebrowIcons: Record<string, typeof UserIcon> = {
  "About me": UserIcon,
  Experience: Briefcase01Icon,
  "Case studies": Layers01Icon,
  "Visual explorations": Image01Icon,
  Process: Route01Icon,
  "Skills & tools": SparklesIcon,
  "Education & certifications": Mortarboard01Icon,
  FAQ: HelpCircleIcon,
  Contact: Mail01Icon,
};

export default function Eyebrow({ children, light = false, className = "" }: { children: string; light?: boolean; className?: string }) {
  const icon = eyebrowIcons[children] ?? StarIcon;
  return (
    <p
      className={`mb-7 inline-flex items-center gap-2.5 rounded-[16px] border py-1.5 pl-1.5 pr-4 text-sm font-bold capitalize  ${className} ${
        light ? "border-on-brand/30 text-on-brand" : "border-line-strong bg-bg-white text-brand"
      }`}
    >
      <span aria-hidden className={`flex h-7 w-7 items-center justify-center rounded-[12px] ${light ? "bg-on-brand text-brand" : "bg-brand text-on-brand"}`}>
        <HugeiconsIcon icon={icon} size={15} strokeWidth={2} />
      </span>
      {children}
    </p>
  );
}
