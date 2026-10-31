import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import JsonLd from "@/components/layout/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/data/site";

const title = "Yasir Abed Rabbu — UI/UX Designer";
const description =
  "UI/UX designer in Dhaka, Bangladesh, turning complex SaaS, healthcare and fintech workflows into simple, trustworthy experiences.";
const ogAlt = "Yasir Abed Rabbu — UI/UX designer based in Dhaka, Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Yasir Abed Rabbu",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/og.png", alt: ogAlt }],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "p:domain_verify": "c9cdc70ae2430835bf5e8a7d19174ed9",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        {/* Opts the intro curtain in on the first visit of a session. A plain inline
            script (not `next/script`) so it runs while the page is parsing — before
            anything paints — and is skipped entirely for reduced motion or blocked
            storage, so the curtain can never be what hides the content. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("preloader")){document.documentElement.dataset.preload="on";sessionStorage.setItem("preloader","1")}}catch(e){}`,
          }}
        />
        <JsonLd />
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk=function(){
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load','2612696855405');
            pintrk('page');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://ct.pinterest.com/v3/?event=init&tid=2612696855405&noscript=1"
          />
        </noscript>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
