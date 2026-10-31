import Image from "next/image";
import Link from "next/link";
import { focus } from "@/lib/ui";
import type { Work } from "@/data/work";
import ArrowUpRight from "./ArrowUpRight";

/** One case-study card. The whole card is a single link to the detail page. */
export default function WorkCard({ item }: { item: Work }) {
  const cover = item.images[0];
  return (
    <li data-reveal className="case-card flex">
      <Link
        href={`/work/${item.slug}`}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-line bg-bg-white transition-colors duration-300 hover:border-brand ${focus}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-7">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">{item.industry}</span>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-brand">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">{item.result}</p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              {item.role} · {item.duration}
            </span>
            <span aria-hidden className="text-ink-muted transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <span className="inline-flex w-fit rounded-full border border-line-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
            Under NDA: details anonymized
          </span>
        </div>
      </Link>
    </li>
  );
}
