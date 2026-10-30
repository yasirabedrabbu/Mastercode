"use client";

import { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Call02Icon, Location01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { focus } from "@/lib/ui";
import { profile } from "@/data/cv";

const details = [
  { icon: Mail01Icon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Call02Icon, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
  { icon: Location01Icon, label: "Based in", value: profile.location, href: null },
];

/** Hero portrait that flips on click to reveal direct contact details. */
export default function HeroPortrait() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="hero-photo relative aspect-[568/696] w-full">
      <div className="absolute inset-0 [perspective:1600px]">
        <div
          className={`relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div aria-hidden={flipped} className="absolute inset-0 overflow-hidden rounded-[2.5rem] [backface-visibility:hidden]">
            <Image src="/images/profile.png" alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width:1024px) 38vw, 100vw" className="scale-110 object-cover object-top" />
          </div>

          <div
            aria-hidden={!flipped}
            inert={!flipped}
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-brand p-7 text-on-brand [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-accent">Get in touch</p>
              <ul className="mt-7 flex flex-col gap-5">
                {details.map((d) => {
                  const body = (
                    <>
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-on-brand/10">
                        <HugeiconsIcon icon={d.icon} size={18} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-on-brand/60">{d.label}</span>
                        <span className="mt-0.5 block break-words text-sm font-semibold">{d.value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={d.label}>
                      {d.href ? (
                        <a href={d.href} className={`flex items-start gap-3.5 ${focus}`}>{body}</a>
                      ) : (
                        <span className="flex items-start gap-3.5">{body}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <button type="button" onClick={() => setFlipped(false)} className={`inline-flex w-fit items-center gap-3 rounded-full bg-on-brand px-5 py-3 text-sm font-bold text-brand ${focus}`}>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} aria-hidden className="rotate-[225deg]" />
              Back to portrait
            </button>
          </div>

          <button
            type="button"
            onClick={() => setFlipped(true)}
            inert={flipped}
            aria-label={`Show contact details for ${profile.name}`}
            className={`absolute inset-0 rounded-[2.5rem] [backface-visibility:hidden] ${focus}`}
          >
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/85 px-4 py-2 text-xs font-semibold text-on-brand">Tap to flip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
