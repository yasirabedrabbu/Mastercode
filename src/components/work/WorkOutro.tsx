import Link from "next/link";
import type { Work } from "@/data/work";
import { focus, focusOnDark } from "@/lib/ui";
import { profile } from "@/data/cv";
import ArrowUpRight from "@/components/portfolio/ArrowUpRight";

/** Closing NDA call-to-action with a prefilled walkthrough request. */
export function WorkCta({ item }: { item: Work }) {
  const subject = encodeURIComponent(`Case study walkthrough request — ${item.title}`);
  return (
    <section id="walkthrough" aria-labelledby="walkthrough-title" className="px-4 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-ink p-10 text-on-brand md:p-14">
        <h2 id="walkthrough-title" className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Full walkthrough available on request under NDA
        </h2>
        <p className="mt-5 max-w-xl leading-relaxed text-on-brand/75">
          This project sits under a client NDA, so everything here is anonymized. I can walk you through the real screens and decisions in a private session.
        </p>
        <a
          href={`mailto:${profile.email}?subject=${subject}`}
          className={`mt-8 inline-flex items-center gap-3 rounded-full border-2 border-on-brand/25 px-7 py-4 font-semibold transition-colors hover:border-on-brand hover:bg-on-brand hover:text-ink ${focusOnDark}`}
        >
          Request the walkthrough
          <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  );
}

/** Previous / next case study. */
export function WorkPager({ prev, next }: { prev?: Work; next?: Work }) {
  const link = `rounded-3xl border border-line bg-bg-white p-7 transition-colors hover:border-brand ${focus}`;
  return (
    <nav aria-label="More case studies" className="px-4 pb-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 border-t border-line pt-10 sm:grid-cols-2">
        {prev && (
          <Link href={`/work/${prev.slug}`} className={`group ${link}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Previous</span>
            <span className="mt-2 block font-display text-xl font-bold tracking-tight transition-colors group-hover:text-brand">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link href={`/work/${next.slug}`} className={`group ${link} sm:text-right`}>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Next</span>
            <span className="mt-2 block font-display text-xl font-bold tracking-tight transition-colors group-hover:text-brand">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
