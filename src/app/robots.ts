import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

// Required by `output: "export"` — robots.txt is emitted as a static file at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
