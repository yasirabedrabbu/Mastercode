import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

// Required by `output: "export"` — the sitemap is emitted as a static file at build time.
export const dynamic = "force-static";

/** One page, hash-anchored sections — so a single URL is the whole sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
