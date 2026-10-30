"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeHighIcon, VolumeMute02Icon } from "@hugeicons/core-free-icons";
import { playClick, setSoundEnabled, soundEnabled, subscribeSound } from "@/lib/clickSound";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { focus, prefersReducedMotion, tapAnim } from "@/lib/ui";
import { profile } from "@/data/cv";

const nav = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["FAQ", "#faq"],
];

export default function Header() {
  const navList = useRef<HTMLUListElement>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const sound = useSyncExternalStore(subscribeSound, soundEnabled, () => true);

  const navTap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick();
    tapAnim(e.currentTarget);
  };

  // Track the section in view and glide the pill highlight to its nav link.
  useGSAP(() => {
    nav.forEach(([, h]) => {
      const el = document.querySelector(h);
      if (el) ScrollTrigger.create({ trigger: el, start: "top 45%", end: "bottom 45%", onToggle: (s) => s.isActive && setActiveNav(h) });
    });
    ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom 45%", onEnter: () => setActiveNav(null), onEnterBack: () => setActiveNav(null) });
  });

  useGSAP(
    () => {
      const list = navList.current;
      const pill = list?.querySelector<HTMLElement>(".nav-pill");
      const link = activeNav ? list?.querySelector<HTMLElement>(`a[href="${activeNav}"]`) : null;
      if (!pill) return;
      const d = prefersReducedMotion() ? 0 : 0.55;
      if (!link) return void gsap.to(pill, { opacity: 0, duration: d * 0.5 });
      gsap.to(pill, { x: link.parentElement!.offsetLeft, width: link.offsetWidth, opacity: 1, duration: d, ease: "expo.out" });
    },
    { dependencies: [activeNav] },
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-hair bg-bg/80 px-3 py-2.5 backdrop-blur-xl md:px-4">
        <a href="#top" onClick={navTap} aria-label={`${profile.name}, home`} className={`nav-tap group flex items-center gap-3 rounded-full pl-1 ${focus}`}>
          <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand font-display text-lg font-bold tracking-tight text-on-brand transition-transform duration-500 group-hover:rotate-[-8deg]">YR</span>
          <span className="font-display text-2xl font-bold leading-none tracking-[-0.03em]">Yasir<span className="text-accent">.</span></span>
        </a>
        <ul ref={navList} className="relative hidden items-center gap-1 text-sm font-medium text-ink-soft md:flex">
          <li aria-hidden className="nav-pill pointer-events-none absolute left-0 top-0 h-full rounded-full bg-ink opacity-0" />
          {nav.map(([l, h]) => (
            <li key={h} className="relative">
              <a href={h} onClick={navTap} aria-current={activeNav === h ? "location" : undefined} className={`nav-tap block rounded-full px-4 py-2 transition-colors duration-300 ${activeNav === h ? "text-on-brand" : "hover:text-brand"} ${focus}`}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button type="button" onClick={(e) => { const next = !sound; setSoundEnabled(next); if (next) playClick(); tapAnim(e.currentTarget); }} aria-pressed={sound} aria-label={sound ? "Mute interface sounds" : "Enable interface sounds"} className={`nav-tap flex h-10 w-10 items-center justify-center rounded-full border border-hair text-ink transition hover:border-brand hover:text-brand ${focus}`}>
            <HugeiconsIcon icon={sound ? VolumeHighIcon : VolumeMute02Icon} size={18} aria-hidden />
          </button>
          <a href={`mailto:${profile.email}`} onClick={navTap} className={`nav-tap rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover ${focus}`}>Hire me</a>
        </div>
      </nav>
    </header>
  );
}
