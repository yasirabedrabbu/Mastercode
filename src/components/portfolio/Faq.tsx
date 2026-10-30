"use client";

import Image from "next/image";
import { useState } from "react";
import { focus } from "@/lib/ui";
import { profile } from "@/data/cv";
import { faqs } from "@/data/faq";
import Eyebrow from "./Eyebrow";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.5fr]">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl">Questions, <span className="italic text-brand">answered</span></h2>
          <p className="mt-6 max-w-sm text-ink-soft">Everything worth knowing before you and I start working together.</p>
          <div className="mt-10 flex items-center gap-4 rounded-3xl bg-bg-white p-5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image src="/images/faq-planning.jpg" alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div>
              <p className="font-semibold">Still have a question?</p>
              <a href={`mailto:${profile.email}`} className={`text-sm font-semibold text-brand underline-offset-4 hover:underline ${focus}`}>Ask me directly →</a>
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <li key={f.question} data-reveal className={`rounded-3xl border transition-colors duration-500 ${open ? "border-brand bg-bg-white" : "border-line bg-bg/60 hover:bg-bg-white"}`}>
                <h3>
                  <button type="button" aria-expanded={open} aria-controls={`faq-${i}`} id={`faq-btn-${i}`} onClick={() => setOpenFaq(open ? null : i)} className={`flex w-full items-center gap-5 rounded-3xl p-6 text-left md:p-8 ${focus}`}>
                    <span className={`font-display text-sm font-bold ${open ? "text-brand" : "text-ink-soft"}`}>0{i + 1}</span>
                    <span className="flex-1 font-display text-xl font-semibold md:text-2xl">{f.question}</span>
                    <span aria-hidden className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition duration-500 ${open ? "rotate-45 bg-brand text-on-brand" : "bg-surface text-ink"}`}>+</span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden" inert={!open}>
                    <p className="max-w-2xl px-6 pb-8 pl-[3.75rem] leading-relaxed text-ink-soft md:px-8 md:pl-[4.25rem]">{f.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
