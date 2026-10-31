import type { Work } from "@/data/work";
import WorkNav from "./WorkNav";
import WorkFooter from "./WorkFooter";
import WorkHero from "./WorkHero";
import { WorkProse, WorkProcess, WorkDecisions, WorkGallery } from "./WorkSections";
import { WorkCta, WorkPager } from "./WorkOutro";

/** Full case-study layout for one anonymized project. */
export default function WorkDetail({ item, prev, next }: { item: Work; prev?: Work; next?: Work }) {
  return (
    <div className="min-h-dvh bg-bg text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-on-brand">Skip to content</a>
      <WorkNav />
      <main id="main">
        <WorkHero item={item} />
        <WorkProse id="problem" title="The problem" text={item.problem} />
        <WorkProcess steps={item.approach} />
        <WorkDecisions decisions={item.decisions} />
        <WorkGallery solution={item.solution} images={item.images} />
        <WorkProse id="impact" title="Impact" text={item.outcome} />
        <WorkProse id="reflection" title="Reflection" text={item.reflection} />
        <WorkCta item={item} />
        <WorkPager prev={prev} next={next} />
      </main>
      <WorkFooter />
    </div>
  );
}
