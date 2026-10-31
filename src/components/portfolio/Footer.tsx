import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { focusOnDark } from "@/lib/ui";
import { profile } from "@/data/cv";
import { socialLinks } from "@/data/site";
import ArrowUpRight from "./ArrowUpRight";

const CV_HREF = "/Yasir-Abed-Rabbu-CV.pdf";

const nav = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

const heading = "font-display text-xs font-bold uppercase tracking-[0.25em] text-on-brand/50";

export default function Footer() {
  return (
    <footer className="bg-ink px-4 pb-10 text-on-brand md:px-8">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-12">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/favicon.svg" alt="" aria-hidden width={44} height={44} className="h-11 w-11 rounded-2xl" />
              <span className="font-display text-2xl font-bold leading-none tracking-[-0.03em]">
                Yasir<span className="text-accent">.</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-brand/70">
              {profile.role} in {profile.location}. Designing simple, trusted experiences for SaaS, healthcare and fintech teams.
            </p>
            <a href={CV_HREF} download className={`mt-6 inline-flex items-center gap-2.5 rounded-full border-2 border-on-brand/25 px-6 py-3 text-sm font-semibold transition-colors hover:border-on-brand hover:bg-on-brand hover:text-ink ${focusOnDark}`}>
              Download CV
              <HugeiconsIcon icon={Download01Icon} size={18} aria-hidden />
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className={heading}>Explore</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {nav.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className={`text-on-brand/75 transition-colors hover:text-on-brand ${focusOnDark}`}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Elsewhere</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={`text-on-brand/75 transition-colors hover:text-on-brand ${focusOnDark}`}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${profile.email}`} className={`mt-5 inline-block text-sm font-semibold text-accent transition-colors hover:text-on-brand ${focusOnDark}`}>
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-on-brand/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name} · {profile.role}</p>
          <a href="#top" className={`inline-flex items-center gap-1.5 transition-colors hover:text-on-brand ${focusOnDark}`}>Back to top <ArrowUpRight size={16} className="-rotate-45" /></a>
        </div>
      </div>
    </footer>
  );
}
