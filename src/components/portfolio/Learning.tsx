import { HugeiconsIcon } from "@hugeicons/react";
import { Mortarboard01Icon, Award01Icon, Certificate01Icon } from "@hugeicons/core-free-icons";
import { education, certifications } from "@/data/cv";
import Eyebrow from "@/components/ui/Eyebrow";

export default function Learning() {
  return (
    <section id="learning" aria-labelledby="learning-title" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div data-reveal>
          <Eyebrow>Education &amp; certifications</Eyebrow>
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
              <h3 className="font-display text-2xl font-bold">Certifications &amp; training</h3>
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
  );
}
