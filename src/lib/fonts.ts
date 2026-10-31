import { Manrope } from "next/font/google";
import localFont from "next/font/local";

// Manrope is a variable font — pass subsets only, no weight array.
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const cabinet = localFont({
  src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 800",
  variable: "--font-cabinet-grotesk",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const fontVariables = [
  manrope.variable,
  cabinet.variable,
].join(" ");
