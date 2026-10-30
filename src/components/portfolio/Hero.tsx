"use client";

import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { focus, prefersReducedMotion } from "@/lib/ui";
import { profile } from "@/data/cv";
import HeroPortrait from "./HeroPortrait";

/* The WebGL scene is decoration — load it after hydration so `three` stays out
   of the initial bundle. */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-10 pt-32 md:px-8 md:pt-36"
      onPointerMove={(e) => {
        if (prefersReducedMotion()) return;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".hero-photo-wrap", { x: x * 24, y: y * 24, rotate: x * 2, duration: 1.2, ease: "power3.out" });
      }}
    >
      <HeroScene />
      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 lg:grid-cols-[1.45fr_1fr]">
        <div>
          <p className="hero-fade mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-bg/70 px-4 py-2 text-sm font-medium text-ink-soft backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-600 opacity-60 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-700" />
            </span>
            {profile.role} · Open to remote roles worldwide
          </p>
          {/* Lines are `nowrap` so the mask reveal stays a single row; the size is tuned
              per range so the longest line still fits a 320px screen. */}
          <h1 id="hero-title" className="font-display text-[clamp(1.95rem,8.4vw,3.35rem)] font-bold leading-[0.95] tracking-[-0.045em] md:text-[clamp(2.5rem,6.4vw,6.5rem)]">
            <span className="sr-only">{profile.name}, {profile.role}: designing simple, trusted experiences.</span>
            {["Designing", "simple, trusted", "experiences."].map((line, i) => (
              <span key={line} aria-hidden className="hero-line block overflow-hidden whitespace-nowrap pb-[0.08em]">
                <span className={`block ${i === 1 ? "italic text-brand" : ""}`}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            I&apos;m <strong className="font-semibold text-ink">{profile.name}</strong>, a UI/UX designer at Softvence Delta turning complex SaaS, healthcare and fintech workflows into products people trust.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <a href="#work" className={`group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-semibold text-on-brand transition hover:bg-brand ${focus}`}>
              View case studies <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className={`inline-flex items-center gap-3 rounded-full border-2 border-ink px-7 py-[0.875rem] font-semibold transition hover:bg-ink hover:text-on-brand ${focus}`}>
              Let&apos;s talk
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
