import type { MetadataRoute } from "next";
import { flagships } from "@/content/projects";
import { profile } from "@/content/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...flagships.map((s) => ({ url: `${profile.siteUrl}/work/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
