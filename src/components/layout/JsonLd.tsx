import { siteUrl, socialLinks } from "@/data/site";

/** Person structured data — read by search engines and AI crawlers. */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yasir Abed Rabbu",
  jobTitle: "UI/UX Designer",
  url: siteUrl,
  image: `${siteUrl}/images/profile.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: socialLinks.map((s) => s.href),
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}
