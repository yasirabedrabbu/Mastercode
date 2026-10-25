"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { playClick, playScrollTick, setSoundEnabled, soundEnabled, unlockAudio } from "@/lib/clickSound";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Call02Icon, WhatsappIcon, ArrowUpRight01Icon, Linkedin01Icon, DribbbleIcon, BehanceIcon, NewTwitterIcon, Location01Icon, Clock01Icon, PenTool03Icon, UserSearch01Icon, UniversalAccessIcon, AiMagicIcon, CheckmarkBadge01Icon, Mortarboard01Icon, Certificate01Icon, Award01Icon, Target02Icon, Idea01Icon, ChartIncreaseIcon, Briefcase01Icon, HelpCircleIcon, UserIcon, Image01Icon, Layers01Icon, Route01Icon, StarIcon, SparklesIcon, Search01Icon, DashboardSquare01Icon, PaintBoardIcon, CodeIcon, VolumeHighIcon, VolumeMute02Icon } from "@hugeicons/core-free-icons";

const processIcons = [Search01Icon, DashboardSquare01Icon, PaintBoardIcon, CodeIcon];

const skillIcons = [PenTool03Icon, UserSearch01Icon, UniversalAccessIcon, AiMagicIcon];
import { projects, projectsCta } from "@/data/projects";
import { processSteps } from "@/data/process";
import { faqs } from "@/data/faq";
import { socialLinks } from "@/data/site";
import { profile, impact, experience, caseStudies, skills, education, certifications } from "@/data/cv";

import NameParticles from "./NameParticles";
import HeroScene from "./HeroScene";

const clean = (s: string) => s.replace(/\p{Extended_Pictographic}|\uFE0F/gu, "").trim();

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

function Eyebrow({ children, light = false, className = "" }: { children: string; light?: boolean; className?: string }) {
  const icon = eyebrowIcons[children] ?? StarIcon;
  return (
    <p
      className={`mb-7 inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-xs font-semibold uppercase tracking-[0.2em] ${className} ${
        light ? "border-on-brand/30 text-on-brand" : "border-line-strong bg-bg-white text-brand"
      }`}
    >
      <span aria-hidden className={`flex h-7 w-7 items-center justify-center rounded-full ${light ? "bg-on-brand text-brand" : "bg-brand text-on-brand"}`}>
        <HugeiconsIcon icon={icon} size={15} strokeWidth={2} />
      </span>
      {children}
    </p>
  );
}

const nav = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["FAQ", "#faq"],
];

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSkill, setActiveSkill] = useState(0);
  const navList = useRef<HTMLUListElement>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [sound, setSound] = useState(true);
  useEffect(() => setSound(soundEnabled()), []);

  // Trackpad-style scroll ticks: one soft tick every ~90px, throttled.
  useEffect(() => {
    let last = window.scrollY, acc = 0, lastTick = 0;
    const unlock = () => unlockAudio();
    const onScroll = () => {
      const y = window.scrollY;
      acc += Math.abs(y - last);
      last = y;
      const now = performance.now();
      if (acc >= 90 && now - lastTick > 55) {
        acc = 0;
        lastTick = now;
        playScrollTick();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    ["pointerdown", "keydown", "touchstart"].forEach((ev) => window.addEventListener(ev, unlock, { once: true, passive: true }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      ["pointerdown", "keydown", "touchstart"].forEach((ev) => window.removeEventListener(ev, unlock));
    };
  }, []);

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tapAnim = (el: HTMLElement) => {
    if (reduceMotion()) return;
    gsap.timeline()
      .to(el, { scale: 0.9, duration: 0.08, ease: "power2.out" })
      .to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1.2,0.4)" });
  };
  const navTap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick();
    tapAnim(e.currentTarget);
  };

  // Track the section in view and glide the pill highlight to its nav link.
  useGSAP(
    () => {
      nav.forEach(([, h]) => {
        const el = document.querySelector(h);
        if (el) ScrollTrigger.create({ trigger: el, start: "top 45%", end: "bottom 45%", onToggle: (s) => s.isActive && setActiveNav(h) });
      });
      ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom 45%", onEnter: () => setActiveNav(null), onEnterBack: () => setActiveNav(null) });
    },
    { scope: root },
  );
  useGSAP(
    () => {
      const list = navList.current;
      const pill = list?.querySelector<HTMLElement>(".nav-pill");
      const link = activeNav ? list?.querySelector<HTMLElement>(`a[href="${activeNav}"]`) : null;
      if (!pill) return;
      const d = reduceMotion() ? 0 : 0.55;
      if (!link) return void gsap.to(pill, { opacity: 0, duration: d * 0.5 });
      gsap.to(pill, { x: link.parentElement!.offsetLeft, width: link.offsetWidth, opacity: 1, duration: d, ease: "expo.out" });
    },
    { dependencies: [activeNav] },
  );
  const [activeStep, setActiveStep] = useState(0);

  // Activate the process step nearest the viewport centre.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".proc-step").forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActiveStep(i) });
      });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".proc-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".proc-list", start: "top 55%", end: "bottom 55%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".proc-step article").forEach((card) => {
        gsap.from(card, { autoAlpha: 0, x: 60, rotate: 1.5, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", once: true } });
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".proc-num", { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "expo.out" });
      gsap.fromTo(".proc-title", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
    },
    { scope: root, dependencies: [activeStep] },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".skill-item", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.05, ease: "power3.out" });
    },
    { scope: root, dependencies: [activeSkill] },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-line > span", { yPercent: 110, duration: 1.3, stagger: 0.12 })
          .from(".hero-fade", { autoAlpha: 0, y: 30, duration: 1, stagger: 0.1 }, "-=0.9")
          .from(".hero-photo", { clipPath: "inset(100% 0 0 0)", scale: 1.15, duration: 1.4 }, "-=1.2");


        gsap.to(".hero-photo img", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }),
        });

        gsap.fromTo(".about-word", { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".about-words", start: "top 80%", end: "bottom 45%", scrub: true } });
        gsap.fromTo(".contact-img", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".contact-img", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".cert-row", { autoAlpha: 0, x: 30, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".cert-row", start: "top 85%", once: true } });
        gsap.utils.toArray<HTMLElement>(".case-row").forEach((row) => {
          gsap.from(row.querySelectorAll(".case-step"), { autoAlpha: 0, y: 30, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 80%", once: true } });
        });
        gsap.from(".contact-giant", { yPercent: 60, ease: "none", scrollTrigger: { trigger: ".contact-giant", start: "top bottom", end: "bottom bottom", scrub: true } });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: Number(el.dataset.count),
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
          });
        });


        gsap.fromTo(".timeline-progress", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#experience", start: "top 60%", end: "bottom 70%", scrub: true } });

        const cards = gsap.utils.toArray<HTMLElement>(".shot-card");
        cards.forEach((card, i) => {
          gsap.from(card.querySelector(".shot-img"), { scale: 1.25, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: true } });
          if (i === cards.length - 1) return;
          gsap.to(card.querySelector(".shot-inner"), {
            scale: 0.9,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 15%", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-bg text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-on-brand">Skip to content</a>

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
            <button type="button" onClick={(e) => { const next = !sound; setSound(next); setSoundEnabled(next); if (next) playClick(); tapAnim(e.currentTarget); }} aria-pressed={sound} aria-label={sound ? "Mute interface sounds" : "Enable interface sounds"} className={`nav-tap flex h-10 w-10 items-center justify-center rounded-full border border-hair text-ink transition hover:border-brand hover:text-brand ${focus}`}>
              <HugeiconsIcon icon={sound ? VolumeHighIcon : VolumeMute02Icon} size={18} aria-hidden />
            </button>
            <a href={`mailto:${profile.email}`} onClick={navTap} className={`nav-tap rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover ${focus}`}>Hire me</a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Hero */}
        <section
          id="top"
          aria-labelledby="hero-title"
          className="hero relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-10 pt-32 md:px-8 md:pt-36"
          onPointerMove={(e) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
              <h1 id="hero-title" className="font-display text-[clamp(2.5rem,6.4vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
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
              <div className="hero-photo relative aspect-[568/696] overflow-hidden rounded-[2.5rem] shadow-[0_50px_100px_-40px_rgb(107_26_43/0.65)]">
                <Image src="/images/profile.png" alt={`Portrait of ${profile.name}`} fill priority sizes="(min-width:1024px) 38vw, 100vw" className="scale-110 object-cover object-top" />
              </div>
            </div>
          </div>
        </section>

        {/* About + impact */}
        <section id="about" aria-labelledby="about-title" className="relative px-4 py-28 md:px-8 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr]">
              <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>About me</Eyebrow>
                <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] bg-surface">
                  <Image src="/images/about-wireframes.jpg" alt="Hands sketching wireframes on paper" fill sizes="(min-width:1024px) 25vw, 80vw" className="object-cover" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-bg/90 p-4 backdrop-blur">
                    <span className="relative flex h-2.5 w-2.5" aria-hidden>
                      <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-600 opacity-60 motion-reduce:animate-none" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-700" />
                    </span>
                    <p className="text-sm font-medium text-ink">Available for new projects</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 id="about-title" className="sr-only">About {profile.name}</h2>
                <p className="about-words font-display text-3xl font-semibold leading-[1.25] tracking-tight md:text-5xl">
                  {profile.summary.split(" ").map((w, i) => (
                    <span key={i} className="about-word">{w} </span>
                  ))}
                </p>
                <ul className="mt-14 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Clarity", "Complex workflows made simple and obvious."],
                    ["Trust", "Interfaces that feel safe, accessible and consistent."],
                    ["Growth", "Every decision tied to a business outcome."],
                  ].map(([t, d], i) => (
                    <li key={t} data-reveal className="rounded-3xl border border-line bg-bg-white p-6">
                      <span className="font-display text-sm font-bold text-brand">0{i + 1}</span>
                      <h3 className="mt-6 font-display text-2xl font-bold">{t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {impact.map((s) => (
                    <div key={s.label} data-reveal className="rounded-3xl bg-brand p-6 text-on-brand">
                      <dd className="font-display text-5xl font-bold tracking-tight">
                        <span data-count={s.value}>{s.value}</span>{s.suffix}
                      </dd>
                      <dt className="mt-3 text-sm leading-snug text-on-brand/90">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="bg-bg-deep px-4 py-28 text-on-brand md:px-8 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.6fr]">
            <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow light>Experience</Eyebrow>
              <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Where I&apos;ve grown</h2>
              <p className="mt-6 max-w-sm text-on-brand/85">Leading UI design delivery across product, development and QA teams in Agile sprints.</p>
            </div>
            <ol className="relative border-l border-hair-light pl-10">
              <span aria-hidden className="timeline-progress absolute -left-px top-0 h-full w-0.5 origin-top bg-accent" />
              {experience.map((job) => (
                <li key={job.role} data-reveal className="relative pb-16 last:pb-0">
                  <span aria-hidden className="absolute -left-[2.85rem] top-2 h-3 w-3 rounded-full bg-on-brand ring-8 ring-bg-deep" />
                  <p className="text-sm font-semibold uppercase tracking-widest text-on-brand/80">{job.period}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold">{job.role}</h3>
                  <p className="mt-1 text-on-brand/85">{job.company}, Dhaka</p>
                  <ul className="mt-6 space-y-3">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed text-on-brand/90"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-on-brand/70" />{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Case studies */}
        <section id="work" aria-labelledby="work-title" className="px-4 py-28 md:px-8 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-16 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
              <div>
                <Eyebrow>Case studies</Eyebrow>
                <h2 id="work-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                  Problems I&apos;ve <span className="italic text-brand">solved</span>
                </h2>
              </div>
              <p className="max-w-sm text-ink-soft md:justify-self-end">Each project starts with a business goal and ends with a journey developers can build with confidence.</p>
            </div>

            <ol className="flex flex-col gap-6">
              {caseStudies.map((c, i) => (
                <li key={c.title} data-reveal>
                  <article className="case-row group grid overflow-hidden rounded-[2rem] border border-line bg-bg-white transition-colors duration-500 hover:border-brand lg:grid-cols-[0.9fr_1.6fr]">
                    <div className="relative flex flex-col justify-between gap-12 bg-brand p-8 text-on-brand md:p-10">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-on-brand/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]">{c.tag}</span>
                        <span aria-hidden className="font-display text-6xl font-bold leading-none text-on-brand/30 transition-colors duration-500 group-hover:text-on-brand">0{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">{c.title}</h3>
                        <p className="mt-4 text-sm font-medium text-on-brand/85">UX strategy · User flows · UI design</p>
                      </div>
                    </div>
                    <dl className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
                      {([
                        ["challenge", "Challenge", Target02Icon],
                        ["approach", "Approach", Idea01Icon],
                        ["outcome", "Outcome", ChartIncreaseIcon],
                      ] as const).map(([k, label, icon], j) => (
                        <div key={k} className="case-step flex flex-col gap-6 p-8">
                          <div className="flex items-center justify-between">
                            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${j === 2 ? "bg-brand text-on-brand" : "bg-surface text-brand"}`}>
                              <HugeiconsIcon icon={icon} size={22} strokeWidth={1.8} aria-hidden />
                            </span>
                            <span aria-hidden className="text-xs font-bold text-ink-soft">Step {j + 1}</span>
                          </div>
                          <div>
                            <dt className="font-display text-xl font-bold">{label}</dt>
                            <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{c[k]}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Visual explorations: sticky stacked cards with GSAP scale/parallax */}
        <section aria-labelledby="shots-title" className="relative bg-bg-slate px-4 py-28 text-on-brand md:px-8 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-20 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <Eyebrow light>Visual explorations</Eyebrow>
                <h2 id="shots-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                  Craft, <span className="italic text-accent">explored</span> in detail
                </h2>
              </div>
              <div className="flex flex-col gap-6 md:items-end md:text-right">
                <p className="max-w-sm text-on-brand/85">Concept shots where I push typography, layout and motion beyond client briefs.</p>
                <a href={projectsCta.href} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-3 rounded-full border border-on-brand/40 px-6 py-3 text-sm font-semibold transition hover:bg-on-brand hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-brand">
                  All shots on Dribbble <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </div>
            </div>

            <ol className="flex flex-col gap-[12vh]">
              {projects.map((p, i) => (
                <li key={p.slug} className="shot-card sticky" style={{ top: `${6 + i * 2}rem` }}>
                  <article className="shot-inner origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-[#2a2a30] will-change-transform">
                    <a href={p.href} target="_blank" rel="noreferrer" aria-label={`${clean(p.title)} on Dribbble (opens in new tab)`} className="group grid md:grid-cols-[1fr_1.6fr] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-on-brand">
                      <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                        <div className="flex items-center justify-between text-sm font-semibold text-on-brand/75">
                          <span>
                            <span className="text-on-brand">0{i + 1}</span> / 0{projects.length}
                          </span>
                          <span className="rounded-full border border-white/15 px-3 py-1">Concept</span>
                        </div>
                        <div>
                          <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">{clean(p.title)}</h3>
                          <p className="mt-5 line-clamp-4 leading-relaxed text-on-brand/80">{clean(p.description)}</p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-3 font-semibold text-white">
                          View shot
                          <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">↗</span>
                        </span>
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[32rem]">
                        <Image src={p.image} alt="" fill sizes="(min-width:768px) 60vw, 100vw" className="shot-img object-cover transition-[filter] duration-700 group-hover:saturate-125" />
                      </div>
                    </a>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Process */}
        <section id="process" aria-labelledby="process-title" className="process px-4 py-28 md:px-8 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div data-reveal>
                <Eyebrow>Process</Eyebrow>
                <h2 id="process-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                  Research to handoff, <span className="italic text-brand">without friction</span>
                </h2>
              </div>
              <div aria-hidden className="mt-14 hidden items-end gap-6 lg:flex">
                <span className="relative block h-[9rem] overflow-hidden font-display text-[9rem] font-bold leading-none tracking-[-0.06em] text-brand">
                  <span className="proc-num block">0{activeStep + 1}</span>
                </span>
                <div className="pb-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">of 0{processSteps.length}</p>
                  <p className="proc-title mt-2 font-display text-2xl font-bold">{processSteps[activeStep].title}</p>
                </div>
              </div>
              <div aria-hidden className="mt-8 hidden gap-2 lg:flex">
                {processSteps.map((s, i) => (
                  <span key={s.id} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <span className={`block h-full origin-left rounded-full bg-brand transition-transform duration-700 ease-out ${i <= activeStep ? "scale-x-100" : "scale-x-0"}`} />
                  </span>
                ))}
              </div>
            </div>

            <ol className="proc-list relative">
              <span aria-hidden className="absolute bottom-10 left-7 top-10 w-px bg-line" />
              <span aria-hidden className="proc-line absolute bottom-10 left-7 top-10 w-0.5 origin-top -translate-x-[0.5px] bg-brand" />
              {processSteps.map((s, i) => {
                const on = activeStep === i;
                return (
                  <li key={s.id} className="proc-step relative pb-8 pl-20 last:pb-0">
                    <span
                      aria-hidden
                      className={`absolute left-0 top-8 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 ${
                        on ? "scale-110 border-brand bg-brand text-on-brand" : i < activeStep ? "border-brand bg-bg-white text-brand" : "border-line bg-bg-white text-ink-soft"
                      }`}
                    >
                      <HugeiconsIcon icon={processIcons[i]} size={24} strokeWidth={1.8} className={`transition-transform duration-700 ${on ? "rotate-[360deg]" : ""}`} />
                    </span>
                    <article
                      className={`rounded-[2rem] border p-8 transition-all duration-500 md:p-10 ${
                        on ? "border-brand bg-bg-white shadow-[0_30px_60px_-30px_rgb(107_26_43/0.35)] lg:-translate-y-1" : "border-line bg-bg/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${on ? "text-brand" : "text-ink-soft"}`}>Step 0{i + 1}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-500 ${on ? "bg-brand text-on-brand" : i < activeStep ? "bg-surface text-brand" : "bg-surface text-ink-soft"}`}>
                          {on ? "In progress" : i < activeStep ? "Done" : "Up next"}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-3xl font-bold tracking-tight">{s.title}</h3>
                      <p className="mt-3 leading-relaxed text-ink-soft">{s.description}</p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" aria-labelledby="skills-title" className="skills bg-bg-deep px-4 py-28 text-on-brand md:px-8 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
              <div>
                <Eyebrow light>Skills & tools</Eyebrow>
                <h2 id="skills-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                  What I bring <span className="italic text-accent">to the table</span>
                </h2>
              </div>
              <p className="max-w-sm text-on-brand/85 md:justify-self-end">Four disciplines I combine on every project, from the first research question to the final handoff.</p>
            </div>

            <div data-reveal className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">
              <div role="tablist" aria-label="Skill categories" aria-orientation="vertical" className="flex flex-col gap-2"
                onKeyDown={(e) => {
                  if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
                  e.preventDefault();
                  const next = (activeSkill + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : skills.length - 1)) % skills.length;
                  setActiveSkill(next);
                  document.getElementById(`skill-tab-${next}`)?.focus();
                }}
              >
                {skills.map((g, i) => {
                  const on = activeSkill === i;
                  return (
                    <button
                      key={g.group}
                      id={`skill-tab-${i}`}
                      role="tab"
                      type="button"
                      aria-selected={on}
                      aria-controls="skill-panel"
                      tabIndex={on ? 0 : -1}
                      onClick={() => setActiveSkill(i)}
                      className={`group flex items-center gap-5 rounded-3xl border p-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand ${
                        on ? "border-on-brand bg-on-brand text-ink" : "border-hair-light hover:border-on-brand/50"
                      }`}
                    >
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${on ? "bg-brand text-on-brand" : "bg-white/10"}`}>
                        <HugeiconsIcon icon={skillIcons[i]} size={24} strokeWidth={1.8} aria-hidden />
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-xl font-bold">{g.group}</span>
                        <span className={`text-sm ${on ? "text-ink-soft" : "text-on-brand/75"}`}>{g.items.length} skills</span>
                      </span>
                      <span aria-hidden className={`font-display text-sm font-bold ${on ? "text-brand" : "text-on-brand/50"}`}>0{i + 1}</span>
                    </button>
                  );
                })}
              </div>

              <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${activeSkill}`} tabIndex={0} className="flex flex-col justify-between rounded-[2rem] bg-bg p-8 text-ink md:p-12">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Category 0{activeSkill + 1}</p>
                    <h3 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{skills[activeSkill].group}</h3>
                  </div>
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand text-on-brand">
                    <HugeiconsIcon icon={skillIcons[activeSkill]} size={30} strokeWidth={1.6} aria-hidden />
                  </span>
                </div>
                <ul className="mt-12 grid gap-3 sm:grid-cols-2">
                  {skills[activeSkill].items.map((s) => (
                    <li key={s} className="skill-item flex items-center gap-3 rounded-2xl border border-line bg-bg-white px-5 py-4 font-medium">
                      <HugeiconsIcon icon={CheckmarkBadge01Icon} size={20} aria-hidden className="shrink-0 text-brand" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education & certifications */}
        <section id="learning" aria-labelledby="learning-title" className="px-4 py-28 md:px-8 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div data-reveal>
              <Eyebrow>Education & certifications</Eyebrow>
              <h2 id="learning-title" className="max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">Always learning, <span className="italic text-brand">always shipping</span></h2>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
              <article data-reveal className="flex flex-col justify-between gap-12 rounded-[2rem] bg-brand p-8 text-on-brand md:p-10">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-on-brand text-brand">
                    <HugeiconsIcon icon={Mortarboard01Icon} size={28} strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="rounded-full border border-on-brand/40 px-4 py-1.5 text-sm font-medium">Education</span>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-on-brand/85">{education.period}</p>
                  <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">{education.title}</h3>
                  <p className="mt-4 text-on-brand/90">{education.school}, Narsingdi</p>
                </div>
              </article>

              <div data-reveal className="rounded-[2rem] border border-line bg-bg-white p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold">Certifications & training</h3>
                  <span className="font-display text-sm font-bold text-ink-soft">{certifications.length} completed</span>
                </div>
                <ol className="mt-8 divide-y divide-line">
                  {certifications.map((c, i) => {
                    const [name, issuer] = c.split(" — ");
                    return (
                      <li key={c} className="cert-row group flex items-center gap-5 py-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand">
                          <HugeiconsIcon icon={i % 2 ? Award01Icon : Certificate01Icon} size={22} strokeWidth={1.8} aria-hidden />
                        </span>
                        <div className="flex-1">
                          <p className="font-display text-lg font-bold leading-snug">{name}</p>
                          {issuer && <p className="text-sm text-ink-soft">{issuer}</p>}
                        </div>
                        <span aria-hidden className="font-display text-sm font-bold text-ink-soft">0{i + 1}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title" className="bg-surface px-4 py-28 md:px-8 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.5fr]">
            <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>FAQ</Eyebrow>
              <h2 id="faq-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">Questions, <span className="italic text-brand">answered</span></h2>
              <p className="mt-6 max-w-sm text-ink-soft">Everything worth knowing before we start working together.</p>
              <div className="mt-10 flex items-center gap-4 rounded-3xl bg-bg-white p-5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image src="/images/faq-planning.jpg" alt="" fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold">Still have a question?</p>
                  <a href={`mailto:${profile.email}`} className={`text-sm font-semibold text-brand underline-offset-4 hover:underline ${focus}`}>Ask me directly →</a>
                </div>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <li key={f.question} data-reveal className={`rounded-3xl border transition-colors duration-500 ${open ? "border-brand bg-bg-white" : "border-line bg-bg/60 hover:bg-bg-white"}`}>
                    <h3>
                      <button type="button" aria-expanded={open} aria-controls={`faq-${i}`} id={`faq-btn-${i}`} onClick={() => setOpenFaq(open ? null : i)} className={`flex w-full items-center gap-5 rounded-3xl p-6 text-left md:p-8 ${focus}`}>
                        <span className={`font-display text-sm font-bold ${open ? "text-brand" : "text-ink-soft"}`}>0{i + 1}</span>
                        <span className="flex-1 font-display text-xl font-semibold md:text-2xl">{f.question}</span>
                        <span aria-hidden className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition duration-500 ${open ? "rotate-45 bg-brand text-on-brand" : "bg-surface text-ink"}`}>+</span>
                      </button>
                    </h3>
                    <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden" inert={!open}>
                        <p className="max-w-2xl px-6 pb-8 pl-[3.75rem] leading-relaxed text-ink-soft md:px-8 md:pl-[4.25rem]">{f.answer}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="contact relative overflow-hidden bg-ink px-4 pt-28 text-on-brand md:px-8 md:pt-36">
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
              <div data-reveal className="flex flex-col">
                <Eyebrow light className="w-fit">Contact</Eyebrow>
                <h2 id="contact-title" className="font-display text-[clamp(2.75rem,6.5vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
                  Let&apos;s build something <span className="italic text-accent">people trust.</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-on-brand/85">
                  Have a product, a redesign or a full-time role in mind? Pick the way that suits you best. I usually reply within 24 hours.
                </p>

                <ul className="mt-12 grid gap-3 sm:grid-cols-3" aria-label="Ways to contact me">
                  {[
                    { label: "Send a mail", hint: "Best for project briefs", icon: Mail01Icon, href: `mailto:${profile.email}`, primary: true },
                    { label: "Call me", hint: "Mon–Fri, GMT+6", icon: Call02Icon, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
                    { label: "WhatsApp", hint: "Quick questions", icon: WhatsappIcon, href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`, external: true },
                  ].map((a) => (
                    <li key={a.label}>
                      <a
                        href={a.href}
                        {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        aria-label={a.external ? `${a.label} (opens in new tab)` : a.label}
                        onPointerMove={(e) => {
                          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                          const r = e.currentTarget.getBoundingClientRect();
                          gsap.to(e.currentTarget, { x: (e.clientX - r.left - r.width / 2) * 0.08, y: (e.clientY - r.top - r.height / 2) * 0.12, duration: 0.4 });
                        }}
                        onPointerLeave={(e) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" })}
                        className={`group flex h-full flex-col justify-between gap-10 rounded-3xl border p-6 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-brand ${
                          a.primary ? "border-brand bg-brand hover:bg-cta" : "border-white/15 hover:border-on-brand hover:bg-on-brand hover:text-ink"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${a.primary ? "bg-on-brand text-brand" : "bg-white/10 group-hover:bg-ink group-hover:text-on-brand"}`}>
                            <HugeiconsIcon icon={a.icon} size={24} strokeWidth={1.8} aria-hidden />
                          </span>
                          <HugeiconsIcon icon={ArrowUpRight01Icon} size={22} aria-hidden className="transition-transform duration-300 group-hover:rotate-45" />
                        </span>
                        <span>
                          <span className="block font-display text-2xl font-bold">{a.label}</span>
                          <span className={`mt-1 block text-sm ${a.primary ? "text-on-brand/90" : "text-on-brand/75 group-hover:text-ink-soft"}`}>{a.hint}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social profiles">
                  {[
                    { name: "LinkedIn", icon: Linkedin01Icon },
                    { name: "Dribbble", icon: DribbbleIcon },
                    { name: "Behance", icon: BehanceIcon },
                    { name: "X", icon: NewTwitterIcon },
                  ].map((s, i) => (
                    <li key={s.name}>
                      <a href={socialLinks[i].href} target="_blank" rel="noreferrer" aria-label={`${s.name} (opens in new tab)`} className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-on-brand hover:bg-on-brand hover:text-ink focus-visible:outline-2 focus-visible:outline-on-brand">
                        <HugeiconsIcon icon={s.icon} size={18} aria-hidden />
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal className="relative min-h-[28rem] overflow-hidden rounded-[2.5rem] bg-bg-deep">
                <Image src="/images/contact-workspace.jpg" alt="A calm workspace with a laptop by the window" fill sizes="(min-width:1024px) 40vw, 100vw" className="contact-img object-cover" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-on-brand">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  Available for new projects
                </div>
                <dl className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line">
                  <div className="flex items-center gap-3 bg-bg p-4 text-ink">
                    <HugeiconsIcon icon={Location01Icon} size={22} aria-hidden className="shrink-0 text-brand" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Based in</dt>
                      <dd className="font-semibold">Dhaka, BD</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-bg p-4 text-ink">
                    <HugeiconsIcon icon={Clock01Icon} size={22} aria-hidden className="shrink-0 text-brand" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Replies</dt>
                      <dd className="font-semibold">Within 24h</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            <div className="contact-giant mt-24 select-none">
              <NameParticles text={profile.name} />
            </div>
            <footer className="flex flex-col justify-between gap-3 border-t border-white/10 py-8 text-sm text-on-brand/75 sm:flex-row">
              <p>© {new Date().getFullYear()} {profile.name} · {profile.role}</p>
              <a href="#top" className="hover:text-on-brand focus-visible:outline-2 focus-visible:outline-on-brand">Back to top ↑</a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
