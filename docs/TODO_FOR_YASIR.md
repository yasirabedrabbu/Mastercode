# TODO for Yasir

## SEO — placeholders to replace before launch

- [ ] **`public/og.png`** — 1200×630 placeholder generated locally (flat charcoal card, gold
      rule, burgundy hairline). Replace it with your final designed share card. Keep the
      filename and size so `openGraph.images` / `twitter.images` in
      [layout.tsx](../src/app/layout.tsx) keep working — or update the width/height there.
- [ ] **`public/favicon.svg`, `public/favicon.png` (32×32), `public/apple-touch-icon.png` (180×180)** —
      simple monogram placeholder. Swap for the final mark at the same paths and sizes.
- [ ] **`siteUrl` in [site.ts](../src/data/site.ts)** — currently the neutral fallback
      `https://example.com`. Set `NEXT_PUBLIC_SITE_URL` (or edit the fallback) to the real
      domain. Nothing else needs touching: the canonical URL, OG/Twitter image URLs,
      `sitemap.xml` and `robots.txt` all read from this one value.
- [ ] **Verify the social URLs in [site.ts](../src/data/site.ts)** are still current — the
      `sameAs` list in the Person JSON-LD is derived from them.
- [ ] After deploying, re-check the structured data with the
      [Rich Results Test](https://search.google.com/test/rich-results) and confirm
      `/sitemap.xml` and `/robots.txt` resolve on the live domain.
