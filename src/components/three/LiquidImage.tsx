"use client";

import { useLiquidImage } from "./useLiquidImage";

type LiquidImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

/** Renders an image through a Three.js water surface that ripples after the pointer. */
export default function LiquidImage({ src, alt = "", className = "" }: LiquidImageProps) {
  const host = useLiquidImage(src);

  return (
    <div
      ref={host}
      className={`absolute inset-0 ${className}`}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    />
  );
}
