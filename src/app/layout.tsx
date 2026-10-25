import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/layout/SideNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";

const title = "Yasir Abed Rabbu — User-centric Product Designer";
const description =
  "Product designer based in Dhaka, Bangladesh. Clear, friction-free products across SaaS, healthcare and fintech, built around real user needs.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  other: {
    "p:domain_verify": "c9cdc70ae2430835bf5e8a7d19174ed9",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
  <html>
    <body suppressHydrationWarning>
      <Preloader />
      <SideNav />
      <SmoothScroll>{children}</SmoothScroll>
    </body>
  </html>
);
}
