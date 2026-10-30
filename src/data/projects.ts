export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    slug: "alpinevista",
    title: "AlpineVista | Ski Resort & Winter Vacation Website 🏔️",
    description:
      "The goal was to create an immersive digital experience that balances " +
      "modern booking convenience with the resort's rich heritage. The " +
      "interface is designed to get families excited about their trip while " +
      "making the user journey seamless. 👨‍👩‍👧‍👦✨",
    image: "/images/project-alpinevista.jpg",
    href: "https://dribbble.com/shots/26802463-AlpineVista-Ski-Resort-Winter-Vacation-Website",
  },
  {
    slug: "hexon",
    title: "HEXON | Cybersecurity SaaS Landing Page",
    description:
      "Designed a high-conviction landing page for HEXON — an AI-powered " +
      "autonomous threat defence platform built for the modern enterprise. " +
      "The brief: stop looking like every other \"we detect threats\" SaaS " +
      "site. Stop selling fear. Start selling decisive action.",
    image: "/images/project-hexon.png",
    href: "https://dribbble.com/shots/27412079-HEXON-Cybersecurity-SaaS-Landing-Page",
  },
  {
    slug: "void-studio",
    title: "VOID/STUDIO — Dark Agency Landing Page UI",
    description:
      "VOID/STUDIO is a conceptual digital agency landing page built to win " +
      "that judgement in under a second. Did you know? Studies show that " +
      "94% of first impressions on a website are design-related — not " +
      "content, not pricing, not the product. Just design. Pure visual " +
      "judgement.",
    image: "/images/project-void-studio.png",
    href: "https://dribbble.com/shots/27359253-VOID-STUDIO-Dark-Agency-Landing-Page-UI",
  },
];

export const projectsCta = {
  href: "https://dribbble.com/yasirabedrabbu",
};