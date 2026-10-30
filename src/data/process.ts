export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery & Research",
    description:
      "I start by understanding your users, business goals and constraints through stakeholder conversations, competitor review and usability findings, so every decision is based on evidence.",
    icon: "/icons/process-01-discovery.svg",
  },
  {
    id: "wireframing",
    title: "Wireframing",
    description:
      "Structure before style — flows, states and edge cases get resolved in grayscale, long before a single pixel is polished.",
    icon: "/icons/process-02-wireframing.svg",
  },
  {
    id: "visual",
    title: "Final Visual Design",
    description:
      "Type, colour and spacing locked into a system, so every screen feels like it belongs to the same product.",
    icon: "/icons/process-03-visual.svg",
  },
  {
    id: "handoff",
    title: "Developer Handoff",
    description:
      "Annotated specs, named tokens and a walkthrough call — engineers build it once, and it ships looking right.",
    icon: "/icons/process-04-handoff.svg",
  },
];