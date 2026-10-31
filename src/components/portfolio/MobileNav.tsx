"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { playClick } from "@/lib/clickSound";
import { focus, focusOnDark } from "@/lib/ui";
import { profile } from "@/data/cv";
import { nav } from "@/data/site";

/** Puts page scrolling back and lets the pending hash jump through. */
const release = () => {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
};

/** Hamburger plus a full-screen section menu for viewports under `md`. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onWiden = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onWiden);
    return () => {
      release();
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWiden);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => {
          playClick();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-hair text-ink transition-colors hover:border-brand hover:text-brand ${focus}`}
      >
        <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={20} aria-hidden />
      </button>

      <div
        id="mobile-nav"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-10 pt-28 text-on-brand transition-all duration-500 ease-out motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {nav.map(([label, href], i) => (
            <li
              key={href}
              style={{ transitionDelay: open ? `${90 + i * 60}ms` : "0ms" }}
              className={`border-b border-white/10 transition-all duration-500 motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <a
                href={href}
                onClick={() => {
                  playClick();
                  release();
                  setOpen(false);
                }}
                className={`flex items-baseline justify-between py-5 font-display text-3xl font-bold tracking-tight ${focusOnDark}`}
              >
                {label}
                <span className="font-display text-xs font-bold tabular-nums text-on-brand/40">{String(i + 1).padStart(2, "0")}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          onClick={() => {
            playClick();
            release();
            setOpen(false);
          }}
          className={`mt-auto flex items-center justify-center rounded-full bg-brand px-6 py-4 text-sm font-semibold ${focusOnDark}`}
        >
          Hire me
        </a>
      </div>
    </div>
  );
}
