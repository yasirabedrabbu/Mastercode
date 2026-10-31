"use client";

import { useRef } from "react";
import { useScrollTicks } from "@/hooks/useScrollTicks";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import CaseStudies from "./CaseStudies";
import Shots from "./Shots";
import Process from "./Process";
import Skills from "./Skills";
import Learning from "./Learning";
import Faq from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";
import Preloader from "./Preloader";
import { usePortfolioFx } from "@/hooks/usePortfolioFx";

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  useScrollTicks();
  usePortfolioFx(root);

  return (
    <div ref={root} className="bg-bg text-ink">
      <Preloader />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-on-brand">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <CaseStudies />
        <Shots />
        <Process />
        <Skills />
        <Learning />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
