import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SideNav from "@/components/layout/SideNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { fontVariables } from "@/lib/fonts";

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
    <html lang="en">
      <body suppressHydrationWarning>
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
        <Preloader />
        <SideNav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
