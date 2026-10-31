/* Case studies for projects under client NDA: titles are role-based descriptions,
   and no client name, logo, domain or real figure appears anywhere — including alt
   text and filenames. Outcomes stay qualitative, because no numbers are cleared. */

export type WorkDecision = { title: string; why: string };
export type WorkImage = { src: string; alt: string };

export type Work = {
  slug: string;
  title: string;
  industry: string;
  role: string;
  duration: string;
  tools: string[];
  problem: string;
  approach: string[];
  decisions: WorkDecision[];
  solution: string;
  outcome: string;
  /** One-line result, used on the card and in the page metadata. */
  result: string;
  images: WorkImage[];
  reflection: string;
};

// TODO(yasir): replace the tool lists with the real values, and add approved
// outcome figures (e.g. "[X]% fewer drop-offs") once the client clears them.
export const work: Work[] = [
  {
    slug: "car-care-booking", title: "Car Care Booking Platform", industry: "Service · Booking",
    role: "UI/UX Designer", duration: "6 weeks", tools: ["Figma"],
    problem: "Visitors couldn't compare packages or see a price without committing, so most left to \"think about it\" and never came back.",
    approach: [
      "Mapped the real decision path, from \"what will this cost?\" to \"when can I come in?\".",
      "Brought prices and package differences forward with progressive disclosure.",
      "Split booking into four short steps, each with a persistent progress cue.",
      "Answered the common doubts inline instead of burying them on a separate page.",
    ],
    decisions: [
      { title: "Lead with price", why: "Price was the unspoken first question; surfacing the entry package and its inclusions removed the doubt that drove people away." },
      { title: "Four steps, one idea each", why: "Vehicle → package → slot → confirm keeps every screen answerable on its own, so nobody has to hold three choices at once." },
      { title: "Progressive disclosure for extras", why: "Add-ons and terms expand on demand, keeping the default view scannable while the depth stays one tap away." },
    ],
    solution: "One booking surface where comparable packages sit side by side with price, duration and inclusions, followed by a four-step flow that carries the chosen package straight through to confirmation.",
    outcome: "A transparent, comparable path from first click to a confirmed booking — reviewed and ready for development.",
    result: "Comparable packages, upfront pricing and a four-step booking flow made the choice obvious.",
    images: [
      { src: "/images/Work/car-care-01.png", alt: "Anonymized booking screen comparing service packages and their prices" },
      { src: "/images/Work/car-care-02.png", alt: "Anonymized four-step booking flow with a persistent progress indicator" },
    ],
    reflection: "The hard part wasn't the flow, it was earning trust before the first tap. Leading with price and being plain about inclusions did more for confidence than any trust badge.",
  },
  {
    slug: "short-drama-streaming", title: "Short-Form Drama Streaming App", industry: "Media · Creator economy",
    role: "UI/UX Designer", duration: "8 weeks", tools: ["Figma"],
    problem: "Guests, viewers and professional creators each needed something different, yet the product treated all three the same.",
    approach: [
      "Separated the experience into three role-based journeys.",
      "Introduced onboarding progress so new users always knew the next step.",
      "Designed live streams, clubs, wallet and subscriptions as one connected system.",
      "Gave creators a single dashboard for publishing and monetization.",
    ],
    decisions: [
      { title: "Role-first navigation", why: "A guest and a creator want opposite things from the first screen, so the journey branches on role before anything else." },
      { title: "Onboarding as a progress path", why: "New users abandon empty states; a visible progress cue turns setup into something with an end in sight." },
      { title: "One wallet for every spend", why: "Subscriptions, clubs and in-stream purchases all draw on the same balance, so money lives in one predictable place." },
    ],
    solution: "Three connected journeys — a browse-and-watch path for guests and viewers, and a publish-and-earn path for creators — sharing one wallet, one subscription model and one visual language.",
    outcome: "A complete blueprint covering every role, from a first launch all the way through to creator monetization.",
    result: "Three role-based journeys that share one system for watching, publishing and earning.",
    images: [
      { src: "/images/Work/short-drama-01.png", alt: "Anonymized home screen with role-based entry points for viewers and creators" },
      { src: "/images/Work/short-drama-02.png", alt: "Anonymized creator dashboard bringing publishing and earnings into one view" },
    ],
    reflection: "Designing three roles over one product taught me to reuse structure, not just components: the same shell, three different priorities.",
  },
  {
    slug: "mutual-interest-casting", title: "Mutual-Interest Casting Platform", industry: "Marketplace · Matching",
    role: "UI/UX Designer", duration: "4 weeks", tools: ["Figma"],
    problem: "A private \"Green Light\" signal was new to everyone and easy to misread as a public like, so its value and its rules weren't obvious.",
    approach: [
      "Explained the mutual-interest signal in plain steps before asking anyone to use it.",
      "Split the join path into two separate routes for dancers and for companies.",
      "Tied pricing to role so each side only ever sees its own plans.",
      "Built trust cues into the sign-in journey for both audiences.",
    ],
    decisions: [
      { title: "Explain before you ask", why: "The Green Light is unfamiliar; a short plain-language walkthrough up front prevents the misread that it's a public like." },
      { title: "Two doors, one platform", why: "Dancers and companies have different goals and privacy needs, so each joins through a path written for them." },
      { title: "Pricing that matches role", why: "Showing each side only its own plan removes the confusion of comparing pricing built for the other audience." },
    ],
    solution: "A single platform with two clear entrances: each audience gets a sign-in journey, a pricing page and privacy language written for its own side, all built on one shared design system.",
    outcome: "A consistent, trustworthy journey for both user types, from first visit through to sign-in.",
    result: "A private mutual-interest signal explained in plain steps for both sides of the platform.",
    images: [
      { src: "/images/Work/mutual-interest-01.png", alt: "Anonymized screen explaining a private mutual-interest signal in plain steps" },
      { src: "/images/Work/mutual-interest-02.png", alt: "Anonymized role-based pricing view shown separately to each audience" },
    ],
    reflection: "When a concept is genuinely new, the interface has to teach before it sells. Writing the explanation first made every later screen simpler.",
  },
];

/** Look up one case study by its URL slug. */
export const getWork = (slug: string) => work.find((w) => w.slug === slug);

/** Previous / next case study for the pager at the foot of a detail page. */
export const adjacentWork = (slug: string) => {
  const i = work.findIndex((w) => w.slug === slug);
  if (i < 0) return {};
  return { prev: work[(i - 1 + work.length) % work.length], next: work[(i + 1) % work.length] };
};
