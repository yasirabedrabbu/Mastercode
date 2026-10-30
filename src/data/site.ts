export type SocialLink = { name: string; href: string; icon: string };

/**
 * Single source of truth for the deployed origin. `metadataBase`, the canonical URL,
 * OG/Twitter images, `sitemap.xml` and `robots.txt` all read from here — change this
 * one value (or set NEXT_PUBLIC_SITE_URL) when the custom domain is live.
 */
// TODO(yasir): replace the fallback with the real domain — [X].
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/** Section links, shared by the desktop nav and the mobile menu. */
export const nav: [string, string][] = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["FAQ", "#faq"],
];

/** Figma order + Figma's own spelling of the hover labels. */
export const socialLinks: SocialLink[] = [
  { name: "Linkedin", href: "https://www.linkedin.com/in/yasirabedrabbu/", icon: "/icons/social-linkedin.svg" },
  { name: "Dribbble", href: "https://dribbble.com/yasirabedrabbu", icon: "/icons/social-dribbble.svg" },
  { name: "Behance", href: "https://www.behance.net/yasirabedrabbu", icon: "/icons/social-behance.svg" },
  { name: "X", href: "https://x.com/Ya_Rabbu", icon: "/icons/social-x.svg" },
];

