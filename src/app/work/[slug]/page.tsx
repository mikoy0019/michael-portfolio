import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/content/profile";
import { flagships } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return flagships.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = flagships.find((s) => s.slug === slug);
  if (!study) return {};
  const images = study.shots[0] ? [{ url: study.shots[0].src }] : undefined;
  return {
    title: study.title,
    description: study.tagline,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.title, description: study.tagline, type: "article", url: `/work/${study.slug}`, images },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = flagships.findIndex((s) => s.slug === slug);
  if (i === -1) notFound();
  const study = flagships[i];
  const url = `${profile.siteUrl}/work/${study.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          description: study.tagline,
          url,
          image: study.shots[0] ? `${profile.siteUrl}${study.shots[0].src}` : undefined,
          keywords: study.stack,
          author: { "@type": "Person", name: profile.name, url: profile.siteUrl },
        }}
      />
      <CaseStudyLayout study={study} next={flagships[(i + 1) % flagships.length]} />
    </>
  );
}
