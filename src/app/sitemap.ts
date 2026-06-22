import type { MetadataRoute } from "next";

import { getApprovedWorkflowSitemapEntries } from "@/lib/workflows/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://worknflow.com";

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const workflows = await getApprovedWorkflowSitemapEntries();

  return [
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 1,
      url: absoluteUrl("/"),
    },
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 0.9,
      url: absoluteUrl("/workflows"),
    },
    {
      changeFrequency: "monthly",
      lastModified: now,
      priority: 0.6,
      url: absoluteUrl("/request"),
    },
    ...workflows.map((workflow) => ({
      changeFrequency: "monthly" as const,
      lastModified: workflow.lastModified
        ? new Date(workflow.lastModified)
        : now,
      priority: 0.8,
      url: absoluteUrl(`/workflows/${workflow.slug}`),
    })),
  ];
}
