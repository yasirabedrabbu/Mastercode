export const cta = {
  title: "Have a Project in mind?",
  subtitle:
    "Good products start with a conversation. If you've got one in mind, Yasir's ready to help shape it.",
  action: { label: "Start a Project", href: "mailto:yasirabedrabbu@gmail.com" },
  avatar: { src: "/images/cta-avatar.png", alt: "Yasir Abed Rabbu" },
};

export type SocialLink = { name: string; href: string; icon: string };

/** Figma order + Figma's own spelling of the hover labels. */
export const socialLinks: SocialLink[] = [
  { name: "Linkedin", href: "https://www.linkedin.com/in/yasirabedrabbu/", icon: "/icons/social-linkedin.svg" },
  { name: "Dribbble", href: "https://dribbble.com/yasirabedrabbu", icon: "/icons/social-dribbble.svg" },
  { name: "Behance", href: "https://www.behance.net/yasirabedrabbu", icon: "/icons/social-behance.svg" },
  { name: "X", href: "https://x.com/Ya_Rabbu", icon: "/icons/social-x.svg" },
];

export const footer = {
  copyright: `© ${new Date().getFullYear()} Yasir Abed Rabbu · All rights reserved.`,
  links: [] as { label: string; href: string }[],
};
