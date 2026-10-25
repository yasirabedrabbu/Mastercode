import Image from "next/image";

import type { SocialLink } from "@/data/site";

/** Figma component: cream + maroon mark by default, solid #8C1C2A + white name on hover. */
export default function SocialCell({ link }: { link: SocialLink }) {
  return (
    <div className="relative h-[200px] w-full border border-hair-logo sm:h-[260px] md:h-[300px] lg:h-[330px]">
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full w-full items-center justify-center bg-surface transition-colors duration-300 hover:bg-cta"
      >
        <Image
          src={link.icon}
          alt=""
          width={64}
          height={64}
          aria-hidden="true"
          className="size-10 transition-opacity duration-300 group-hover:opacity-0 sm:size-12 lg:size-16"
        />
        <span className="absolute inset-0 flex items-center justify-center font-display text-[20px] font-medium text-on-cta opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-[24px] md:text-[28px] lg:text-h2">
          {link.name}
        </span>
        <span className="sr-only">{link.name}</span>
      </a>
    </div>
  );
}
