"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Call02Icon, WhatsappIcon, Linkedin01Icon, DribbbleIcon, BehanceIcon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ui";
import { profile } from "@/data/cv";
import { socialLinks } from "@/data/site";
import ArrowUpRight from "@/components/ui/ArrowUpRight";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactAside from "@/components/ui/ContactAside";
import NameParticles from "@/components/three/NameParticles";

const ways = [
  { label: "Send a mail", hint: "Best for project briefs", icon: Mail01Icon, href: `mailto:${profile.email}`, primary: true },
  { label: "Call me", hint: "Mon–Fri, GMT+6", icon: Call02Icon, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
  { label: "WhatsApp", hint: "Quick questions", icon: WhatsappIcon, href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`, external: true },
];

const socials = [
  { name: "LinkedIn", icon: Linkedin01Icon },
  { name: "Dribbble", icon: DribbbleIcon },
  { name: "Behance", icon: BehanceIcon },
  { name: "X", icon: NewTwitterIcon },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="contact relative overflow-hidden bg-ink px-4 pb-10 pt-28 text-on-brand md:px-8 md:pb-12 md:pt-36">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
          <div data-reveal className="flex flex-col">
            <Eyebrow light className="w-fit">Contact</Eyebrow>
            <h2 id="contact-title" className="font-display text-[clamp(2.75rem,6.5vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
              Let&apos;s build something <span className="italic text-accent">people trust.</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-on-brand/85">
              I&apos;m looking for a full-time remote role first, and I take on a small number of freelance projects alongside it. Pick the way that suits you best — I usually reply within 24 hours.
            </p>

            <ul className="mt-12 grid gap-3 sm:grid-cols-3" aria-label="Ways to contact me">
              {ways.map((a) => (
                <li key={a.label}>
                  <a
                    href={a.href}
                    {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    aria-label={a.external ? `${a.label} (opens in new tab)` : a.label}
                    onPointerMove={(e) => {
                      if (prefersReducedMotion()) return;
                      const r = e.currentTarget.getBoundingClientRect();
                      gsap.to(e.currentTarget, { x: (e.clientX - r.left - r.width / 2) * 0.08, y: (e.clientY - r.top - r.height / 2) * 0.12, duration: 0.4 });
                    }}
                    onPointerLeave={(e) => {
                      if (prefersReducedMotion()) return;
                      gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
                    }}
                    className={`group flex h-full flex-col justify-between gap-10 rounded-3xl border p-6 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-brand ${
                      a.primary ? "border-brand bg-brand hover:bg-cta" : "border-white/15 hover:border-on-brand hover:bg-on-brand hover:text-ink"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${a.primary ? "bg-on-brand text-brand" : "bg-white/10 group-hover:bg-ink group-hover:text-on-brand"}`}>
                        <HugeiconsIcon icon={a.icon} size={24} strokeWidth={1.8} aria-hidden />
                      </span>
                      <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:rotate-45" />
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
              {socials.map((s, i) => (
                <li key={s.name}>
                  <a href={socialLinks[i].href} target="_blank" rel="noreferrer" aria-label={`${s.name} (opens in new tab)`} className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-on-brand hover:bg-on-brand hover:text-ink focus-visible:outline-2 focus-visible:outline-on-brand">
                    <HugeiconsIcon icon={s.icon} size={18} aria-hidden />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ContactAside />
        </div>

        <div className="contact-giant mt-24 select-none">
          <NameParticles text={profile.name} />
        </div>
      </div>
    </section>
  );
}
