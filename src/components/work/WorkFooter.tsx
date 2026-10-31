import Link from "next/link";
import { focusOnDark } from "@/lib/ui";
import { profile } from "@/data/cv";
import ArrowUpRight from "@/components/ui/ArrowUpRight";

/** Minimal footer for the standalone case-study pages. */
export default function WorkFooter() {
  return (
    <footer className="mt-8 bg-ink px-4 py-10 text-on-brand md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-on-brand/70 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.role}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/#work" className={`transition-colors hover:text-on-brand ${focusOnDark}`}>
            All work
          </Link>
          <a href={`mailto:${profile.email}`} className={`transition-colors hover:text-on-brand ${focusOnDark}`}>
            {profile.email}
          </a>
          <a href="#top" className={`inline-flex items-center gap-1.5 transition-colors hover:text-on-brand ${focusOnDark}`}>
            Back to top <ArrowUpRight size={16} className="-rotate-45" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
