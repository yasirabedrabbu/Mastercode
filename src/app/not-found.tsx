import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Yasir Abed Rabbu",
  description: "That page doesn't exist. Head back to the homepage.",
};

const cta =
  "rounded-full px-7 py-4 font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col justify-center bg-bg px-6 py-24 text-ink md:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
          <span aria-hidden className="h-px w-10 bg-brand" />
          Error 404
        </p>
        <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
          This page <span className="italic text-brand">isn&apos;t here</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">
          The link may be broken, or the page may have moved. Everything else is one click away.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/" className={`${cta} bg-brand text-on-brand hover:bg-brand-hover`}>
            Back to home
          </Link>
          <Link href="/#work" className={`${cta} border border-line text-ink hover:border-brand`}>
            See my work
          </Link>
        </div>
      </div>
    </main>
  );
}
