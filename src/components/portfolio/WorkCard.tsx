import Image from "next/image";
import Link from "next/link";
import { focus } from "@/lib/ui";
import type { Work } from "@/data/work";
import ArrowUpRight from "./ArrowUpRight";

/** One case-study card. The whole card is a single link to the detail page. */
export default function WorkCard({ item, index }: { item: Work; index: number }) {
  const cover = item.images[0];
  return (
    <li data-reveal className="case-card flex">
      <Link
        href={`/work/${item.slug}`}
        className={`group flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-line bg-bg-white transition-colors duration-300 hover:border-brand ${focus}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 rounded-[12px] bg-bg/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur">
            Under NDA
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">{item.industry}</span>
            <span aria-hidden className="font-display text-xs font-bold text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-brand">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">{item.result}</p>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              {item.role} · {item.duration}
            </span>
            <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 motion-reduce:transition-none group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
