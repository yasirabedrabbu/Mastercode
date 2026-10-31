import { work } from "@/data/work";
import Eyebrow from "@/components/ui/Eyebrow";
import WorkCard from "@/components/ui/WorkCard";

/** Case-study grid. Every card links to an anonymized detail page under NDA. */
export default function CaseStudies() {
  return (
    <section id="work" aria-labelledby="work-title" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Eyebrow>Case studies</Eyebrow>
            <h2 id="work-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Problems I&apos;ve <span className="italic text-brand">solved</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft md:justify-self-end">Each project starts with a business goal and ends with a journey developers can build with confidence.</p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.map((item, i) => (
            <WorkCard key={item.slug} item={item} index={i} />
          ))}
        </ul>

        <p className="mt-8 border-t border-line pt-6 text-center text-sm leading-relaxed text-ink-muted">
          Client names and sensitive details are anonymized or omitted under NDA. Full walkthroughs are available on request.
        </p>
      </div>
    </section>
  );
}
