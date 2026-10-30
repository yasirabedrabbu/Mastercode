import Image from "next/image";
import type { WorkDecision, WorkImage } from "@/data/work";

const section = "px-4 py-14 md:px-8 md:py-16";
const heading = "font-display text-3xl font-bold tracking-tight md:text-5xl";
const body = "mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft";
const card = "rounded-[1.75rem] border border-line bg-bg-white p-7";
const ordinal = "font-display text-sm font-bold tabular-nums text-brand";

/** Single-column prose block — used for the problem, impact and reflection. */
export function WorkProse({ id, title, text }: { id: string; title: string; text: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={section}>
      <div className="mx-auto max-w-6xl">
        <h2 id={`${id}-title`} className={heading}>
          {title}
        </h2>
        <p className={body}>{text}</p>
      </div>
    </section>
  );
}

/** The ordered approach steps. */
export function WorkProcess({ steps }: { steps: string[] }) {
  return (
    <section id="process" aria-labelledby="process-title" className={section}>
      <div className="mx-auto max-w-6xl">
        <h2 id="process-title" className={heading}>
          How I approached it
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step} className={card}>
              <span aria-hidden className={ordinal}>
                0{i + 1}
              </span>
              <p className="mt-3 leading-relaxed text-ink-soft">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Two or three key decisions, each with the reason behind it. */
export function WorkDecisions({ decisions }: { decisions: WorkDecision[] }) {
  return (
    <section id="decisions" aria-labelledby="decisions-title" className={section}>
      <div className="mx-auto max-w-6xl">
        <h2 id="decisions-title" className={heading}>
          Key decisions
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {decisions.map((d, i) => (
            <article key={d.title} className={`flex flex-col ${card}`}>
              <span aria-hidden className={ordinal}>
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{d.why}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Solution summary plus the anonymized image gallery. */
export function WorkGallery({ solution, images }: { solution: string; images: WorkImage[] }) {
  return (
    <section id="solution" aria-labelledby="solution-title" className={section}>
      <div className="mx-auto max-w-6xl">
        <h2 id="solution-title" className={heading}>
          The solution
        </h2>
        <p className={body}>{solution}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {images.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-[1.75rem] border border-line bg-bg-white">
              <Image src={img.src} alt={img.alt} width={1200} height={900} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
