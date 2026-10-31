"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { playClick } from "@/lib/clickSound";
import { focus, focusOnDark } from "@/lib/ui";
import { profile } from "@/data/cv";
import { navGroups } from "@/data/site";

/** Puts page scrolling back and lets the pending hash jump through. */
const release = () => {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
};

/* `createPortal` needs a live document, so the overlay only renders on the client. */
const emptySubscribe = () => () => {};
const onClient = () => true;

/** Hamburger plus a full-screen section menu for viewports under `md`. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, onClient, () => false);

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

  const close = () => {
    playClick();
    release();
    setOpen(false);
  };

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
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-hair text-ink transition-colors hover:border-brand hover:text-brand ${focus}`}
      >
        <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={20} aria-hidden />
      </button>

      {/* Portalled to <body>: the header's `backdrop-blur-xl` becomes the containing
          block for fixed descendants, which would squash this overlay to pill height. */}
      {mounted &&
        createPortal(
          <div
            id="mobile-nav"
            inert={!open}
            className={`fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 pb-10 pt-28 text-on-brand transition-all duration-500 ease-out motion-reduce:transition-none md:hidden ${
              open ? "opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-7">
              {navGroups.map((group, gi) => {
                const offset = navGroups.slice(0, gi).reduce((n, g) => n + g.links.length, 0);
                return (
                  <div key={group.category}>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-on-brand/60">{group.category}</p>
                    <ul className="mt-1 flex flex-col">
                      {group.links.map(({ label, href }, li) => (
                        <li key={href} style={{ transitionDelay: open ? `${90 + (offset + li) * 60}ms` : "0ms" }} className={`border-b border-white/10 transition-all duration-500 motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
                          <a href={href} onClick={close} className={`flex items-baseline justify-between py-4 font-display text-2xl font-bold tracking-tight ${focusOnDark}`}>
                            {label}
                            <span className="font-display text-xs font-bold tabular-nums text-on-brand/60">{String(offset + li + 1).padStart(2, "0")}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <a
              href={`mailto:${profile.email}`}
              onClick={close}
              className={`mt-auto flex items-center justify-center rounded-full bg-brand px-6 py-4 text-sm font-semibold ${focusOnDark}`}
            >
              Hire me
            </a>
          </div>,
          document.body,
        )}
    </div>
  );
}
