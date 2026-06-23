import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { WorkflowLibrary } from "@/components/search/WorkflowLibrary";
import { getApprovedWorkflows } from "@/lib/workflows/queries";

export const metadata: Metadata = {
  title: "AI Workflow Library — WorknFlow",
  description:
    "Search tested AI workflows for planning, coding, debugging, reviewing, and shipping with AI tools.",
  alternates: {
    canonical: "/workflows",
  },
  openGraph: {
    description:
      "Search tested AI workflows for planning, coding, debugging, and shipping.",
    title: "AI Workflow Library — WorknFlow",
    url: "/workflows",
  },
  twitter: {
    card: "summary",
    description:
      "Search tested AI workflows for planning, coding, debugging, and shipping.",
    title: "AI Workflow Library — WorknFlow",
  },
};

type WorkflowsPageProps = {
  searchParams?: Promise<{
    audience?: string | string[];
    category?: string | string[];
    difficulty?: string | string[];
    freshness?: string | string[];
    platform?: string | string[];
    safety?: string | string[];
    search?: string | string[];
  }>;
};

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function WorkflowsPage({
  searchParams,
}: WorkflowsPageProps) {
  const resolvedSearchParams = await searchParams;
  const workflows = await getApprovedWorkflows();

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeader
            as="h1"
            description="Search tested builder workflows by task. Each result includes prompts, examples, freshness, and a checklist so you can judge the output before using it."
            eyebrow="Workflow library"
            title="Find a tested workflow for building with AI"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <WorkflowLibrary
          initialFilters={{
            audience: readParam(resolvedSearchParams?.audience) ?? "",
            category: readParam(resolvedSearchParams?.category) ?? "",
            difficulty: readParam(resolvedSearchParams?.difficulty) ?? "",
            freshness: readParam(resolvedSearchParams?.freshness) ?? "",
            platform: readParam(resolvedSearchParams?.platform) ?? "",
            safety: readParam(resolvedSearchParams?.safety) ?? "",
            search: readParam(resolvedSearchParams?.search) ?? "",
          }}
          key={JSON.stringify(resolvedSearchParams ?? {})}
          workflows={workflows}
        />
      </section>
    </PageShell>
  );
}
