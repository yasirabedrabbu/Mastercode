import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { work } from "@/data/work";

// Required by `output: "export"` — the sitemap is emitted as a static file at build time.
export const dynamic = "force-static";

/** The homepage plus one anonymized page per case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...work.map((item) => ({
      url: `${siteUrl}/work/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
