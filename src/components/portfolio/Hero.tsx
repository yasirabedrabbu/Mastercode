"use client";

import dynamic from "next/dynamic";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { gsap } from "@/lib/gsap";
import { focus, prefersReducedMotion } from "@/lib/ui";
import { profile } from "@/data/cv";
import HeroPortrait from "./HeroPortrait";

/* The WebGL scene is decoration — load it after hydration so `three` stays out
   of the initial bundle. */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/* TODO(yasir): drop the real PDF at public/Yasir-Abed-Rabbu-CV.pdf — the button 404s until then. */
const CV_HREF = "/Yasir-Abed-Rabbu-CV.pdf";

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
          {/* Lines are `nowrap` so the mask reveal stays a single row. Measured in
              Cabinet Grotesk Bold at 700 with -0.045em tracking, "simple, trusted"
              is 5.85em wide, so the mobile clamp stays inside 288px (320px viewport)
              and the md clamp picks up where the base one caps out. */}
          <h1
            id="hero-title"
            aria-label={`${profile.name}, ${profile.role}: designing simple, trusted experiences.`}
            className="font-display text-[clamp(2.75rem,12.5vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.045em] md:text-[clamp(3.5rem,6.4vw,6.5rem)]"
          >
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
            <a href={CV_HREF} download className={`inline-flex items-center gap-3 rounded-full border-2 border-ink px-7 py-[0.875rem] font-semibold transition hover:bg-ink hover:text-on-brand ${focus}`}>
              Download CV
              <HugeiconsIcon icon={Download01Icon} size={18} aria-hidden />
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
