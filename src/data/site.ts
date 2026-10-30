export type SocialLink = { name: string; href: string; icon: string };

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

