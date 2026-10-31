import Image from "next/image";
import { profile, impact, principles } from "@/data/cv";
import Eyebrow from "./Eyebrow";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr]">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>About me</Eyebrow>
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] bg-surface">
              <Image src="/images/about-wireframes.jpg" alt="Hands sketching wireframes on paper" fill sizes="(min-width:1024px) 25vw, 80vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-bg/90 p-4 backdrop-blur">
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-600" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Open to remote roles worldwide</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 id="about-title" className="sr-only">About {profile.name}</h2>
            <p className="about-words font-display text-3xl font-semibold leading-[1.25] tracking-tight md:text-4xl">
              {profile.summary.split(" ").map((w, i) => (
                <span key={i} className="about-word">{w} </span>
              ))}
            </p>
            <ul className="mt-14 grid gap-4 sm:grid-cols-3">
              {principles.map((p, i) => (
                <li key={p.title} data-reveal className="rounded-3xl border border-line bg-bg-white p-6">
                  <span className="font-display text-sm font-bold text-brand">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-2xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
  );
}
