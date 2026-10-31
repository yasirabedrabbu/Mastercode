import { projects, projectsCta } from "@/data/projects";
import ArrowUpRight from "./ArrowUpRight";
import Eyebrow from "./Eyebrow";
import LiquidImageLazy from "./LiquidImageLazy";

const clean = (s: string) => s.replace(/\p{Extended_Pictographic}|\uFE0F/gu, "").trim();

export default function Shots() {
  return (
    <section aria-labelledby="shots-title" className="relative bg-bg-deep px-4 py-28 text-on-brand md:px-8 md:py-36">
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
              All shots on Dribbble <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <ol className="flex flex-col gap-6 md:gap-[12vh]">
          {projects.map((p, i) => (
            <li key={p.slug} className="shot-card md:sticky" style={{ top: `${6 + i * 2}rem` }}>
              <article className="shot-inner relative origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-surface-dark transition-colors duration-500 will-change-transform hover:border-white/30 active:border-white/45">
                <a href={p.href} target="_blank" rel="noreferrer" aria-label={`${clean(p.title)} on Dribbble (opens in new tab)`} className="group grid md:grid-cols-[1fr_1.6fr] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-on-brand">
                  <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                    <div className="flex items-center justify-between text-sm font-semibold text-on-brand/75">
                      <span>
                        <span className="text-on-brand">{String(i + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1">Concept</span>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">{clean(p.title)}</h3>
                      <p className="mt-5 line-clamp-4 leading-relaxed text-on-brand/80">{clean(p.description)}</p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-3 font-semibold text-white">
                      View shot
                      <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={20} /></span>
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[32rem]">
                    <LiquidImageLazy src={p.image} />
                  </div>
                </a>
                <span aria-hidden className="shot-dim pointer-events-none absolute inset-0 bg-black opacity-0" />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
