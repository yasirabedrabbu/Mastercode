export type SocialLink = { name: string; href: string; icon: string };

/**
 * Single source of truth for the deployed origin. `metadataBase`, the canonical URL,
 * OG/Twitter images, `sitemap.xml` and `robots.txt` all read from here — change this
 * one value (or set NEXT_PUBLIC_SITE_URL) when the custom domain is live.
 */
// TODO(yasir): replace the fallback with the real domain — [X].
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yasirabedrabbu.vercel.app";

export type NavItem = { label: string; href: string; primary?: boolean };

/**
 * Every page section, grouped by category. Drives the full-screen mobile menu so it
 * can reach all sections; items flagged `primary` also appear in the desktop nav.
 */
export const navGroups: { category: string; links: NavItem[] }[] = [
  {
    category: "Profile",
    links: [
      { label: "About", href: "#about", primary: true },
      { label: "Experience", href: "#experience", primary: true },
    ],
  },
  {
    category: "Selected work",
    links: [
      { label: "Work", href: "#work", primary: true },
      { label: "Process", href: "#process" },
    ],
  },
  {
    category: "Craft",
    links: [
      { label: "Skills", href: "#skills", primary: true },
      { label: "Education", href: "#learning" },
    ],
  },
  {
    category: "Get in touch",
    links: [
      { label: "FAQ", href: "#faq", primary: true },
      { label: "Contact", href: "#contact" },
    ],
  },
];

/** Primary section links for the desktop nav — derived from `navGroups`. */
export const nav: [string, string][] = navGroups.flatMap((g) =>
  g.links.filter((l) => l.primary).map((l) => [l.label, l.href] as [string, string]),
);

/** Figma order + Figma's own spelling of the hover labels. */
export const socialLinks: SocialLink[] = [
  { name: "Linkedin", href: "https://www.linkedin.com/in/yasirabedrabbu/", icon: "/icons/social-linkedin.svg" },
  { name: "Dribbble", href: "https://dribbble.com/yasirabedrabbu", icon: "/icons/social-dribbble.svg" },
  { name: "Behance", href: "https://www.behance.net/yasirabedrabbu", icon: "/icons/social-behance.svg" },
  { name: "X", href: "https://x.com/Ya_Rabbu", icon: "/icons/social-x.svg" },
];

