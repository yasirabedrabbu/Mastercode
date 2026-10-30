import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { work, getWork, adjacentWork } from "@/data/work";
import { profile } from "@/data/cv";
import WorkDetail from "@/components/work/WorkDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  const cover = item.images[0];
  const title = `${item.title} — ${profile.name}`;
  return {
    title,
    description: item.result,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title,
      description: item.result,
      url: `/work/${item.slug}`,
      type: "article",
      images: [{ url: cover.src, width: 1200, height: 900, alt: cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: item.result,
      images: [{ url: cover.src, alt: cover.alt }],
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();
  const { prev, next } = adjacentWork(slug);

  return <WorkDetail item={item} prev={prev} next={next} />;
}
