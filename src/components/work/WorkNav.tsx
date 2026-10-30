import Image from "next/image";
import Link from "next/link";
import { focus } from "@/lib/ui";
import { profile } from "@/data/cv";

/** Lightweight header for the standalone case-study pages. */
export default function WorkNav() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-line bg-bg/80 px-4 backdrop-blur-xl md:px-8">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between py-3">
        <Link href="/" aria-label={`${profile.name}, home`} className={`flex items-center gap-3 rounded-full ${focus}`}>
          <Image src="/favicon.svg" alt="" aria-hidden width={40} height={40} className="h-10 w-10 rounded-2xl" />
          <span className="font-display text-xl font-bold leading-none tracking-[-0.03em]">
            Yasir<span className="text-accent">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Link href="/#work" className={`rounded-full border border-line px-4 py-2 text-ink-soft transition-colors hover:border-brand hover:text-brand ${focus}`}>
            All work
          </Link>
          <Link href="/#contact" className={`hidden rounded-full bg-ink px-4 py-2 text-on-brand transition-colors hover:bg-brand sm:inline-block ${focus}`}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
