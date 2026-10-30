import { profile } from "@/data/cv";

/** Segments in the progress readout; the timeline staggers them at the same rate. */
export const SEGMENTS = 24;

const steps = ["Designing", "Prototyping", "Building", "Polishing"];

/** Presentational HUD layered over the Three.js horizon. */
export default function PreloaderHud() {
  return (
    <div className="relative z-10 h-full">
      <div className="absolute inset-0 bg-ink/25" />

      <span aria-hidden className="pre-bracket absolute left-5 top-5 h-10 w-10 border-l border-t border-on-brand/20 md:left-8 md:top-8" />
      <span aria-hidden className="pre-bracket absolute right-5 top-5 h-10 w-10 border-r border-t border-on-brand/20 md:right-8 md:top-8" />
      <span aria-hidden className="pre-bracket absolute bottom-5 left-5 h-10 w-10 border-b border-l border-on-brand/20 md:bottom-8 md:left-8" />
      <span aria-hidden className="pre-bracket absolute right-5 bottom-5 h-10 w-10 border-r border-b border-on-brand/20 md:right-8 md:bottom-8" />

      <div className="relative flex h-full flex-col justify-between px-7 py-9 md:px-16 md:py-12">
        <div className="pre-enter flex items-center justify-between font-display text-[0.65rem] font-bold uppercase tracking-[0.3em] text-on-brand/45">
          <span>{profile.name}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Portfolio 2026
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="pre-enter flex h-14 w-14 items-center justify-center rounded-2xl bg-brand font-display text-xl font-bold">YR</span>
          <p className="pre-enter mt-8 flex items-start font-display font-bold leading-[0.78] tracking-[-0.06em]">
            <span className="pre-count tabular-nums text-[24vw] md:text-[13rem]">000</span>
            <span className="mt-2 text-2xl text-accent md:text-3xl">%</span>
          </p>
          <span className="pre-enter mt-2 block h-[1.1em] overflow-hidden font-display text-[0.65rem] font-bold uppercase tracking-[0.4em] text-on-brand/50">
            <span className="pre-words block">
              {steps.map((s) => (
                <span key={s} className="block h-[1.1em] leading-[1.1em]">{s}</span>
              ))}
            </span>
          </span>
        </div>

        <div className="pre-enter">
          <div className="flex gap-1">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[rgba(246,239,230,0.14)]">
                <span className="pre-seg block h-full w-full origin-left scale-x-0 bg-accent" />
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between font-display text-[0.6rem] font-bold uppercase tracking-[0.3em] text-on-brand/35">
            <span>{profile.location}</span>
            <span>Please wait</span>
          </div>
        </div>
      </div>
    </div>
  );
}
