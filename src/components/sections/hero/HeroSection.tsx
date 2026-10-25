"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import HeroTitle from "./HeroTitle";
import { hero } from "@/data/hero";
import HeroPortrait from "./HeroPortrait";

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  // Reveal the image across the FIRST ~60% of the sticky track.
  // After 60% it stays fully visible for the rest of the sticky ride.
  const revealProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <>
      {/* Title + CTA — unchanged */}
      <div id="home" className="w-full bg-white">
        <div className="flex flex-col items-center px-5 pt-[60px] sm:px-10">
          <HeroTitle />
          <div className="mt-12 gap-y-[48px]">
            <Button href={hero.cta.href}>{hero.cta.label}</Button>
          </div>
        </div>
      </div>

      {/* Sticky scroll — portrait reveal */}
      <div
        ref={trackRef}
        style={{
          position: "relative",
          height: "300vh",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <HeroPortrait scrollProgress={revealProgress} />
        </div>
      </div>
    </>
  );
}