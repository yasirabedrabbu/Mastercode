"use client";

import dynamic from "next/dynamic";

/* `Shots` is a server component, so the dynamic import needs a client boundary.
   Loading the water surface lazily keeps `three` out of the initial bundle. */
const LiquidImage = dynamic(() => import("./LiquidImage"), { ssr: false });

type Props = { src: string; alt?: string; className?: string };

export default function LiquidImageLazy(props: Props) {
  return <LiquidImage {...props} />;
}
