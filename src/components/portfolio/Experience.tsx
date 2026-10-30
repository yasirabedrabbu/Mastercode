import { experience } from "@/data/cv";
import Eyebrow from "./Eyebrow";

export default function Experience() {
  return (
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
  );
}
