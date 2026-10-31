import Image from "next/image";
import type { Work } from "@/data/work";
import Eyebrow from "@/components/portfolio/Eyebrow";

const metaLabel = "text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted";

/** Case-study opener: anonymous title, NDA note, the meta table and the cover. */
export default function WorkHero({ item }: { item: Work }) {
  const cover = item.images[0];
  const meta: [string, string][] = [
    ["Industry", item.industry],
    ["Role", item.role],
    ["Duration", item.duration],
    ["Tools", item.tools.join(", ")],
  ];

  return (
    <section aria-labelledby="work-hero-title" className="px-4 pt-16 md:px-8 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Case studies</Eyebrow>
        <h1 id="work-hero-title" className="max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
          {item.title}
        </h1>
        <p className="mt-6 inline-flex rounded-full border border-line-strong px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
          Under NDA: details anonymized
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{item.result}</p>

        <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt className={metaLabel}>{label}</dt>
              <dd className="mt-2 text-sm font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-bg-white">
          <Image src={cover.src} alt={cover.alt} width={1200} height={900} sizes="(min-width: 1024px) 1152px, 100vw" className="h-auto w-full" priority />
        </div>
      </div>
    </section>
  );
}
