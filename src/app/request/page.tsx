import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { WorkflowRequestForm } from "@/components/request/WorkflowRequestForm";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Request a Workflow — WorknFlow",
  description:
    "Request a missing AI workflow so WorknFlow can consider adding tested prompts, examples, and checklists for it.",
  alternates: {
    canonical: "/request",
  },
  openGraph: {
    description:
      "Request a missing AI workflow for the WorknFlow library.",
    title: "Request a Workflow — WorknFlow",
    url: "/request",
  },
  twitter: {
    card: "summary",
    description:
      "Request a missing AI workflow for the WorknFlow library.",
    title: "Request a Workflow — WorknFlow",
  },
};

type RequestPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
    source?: string | string[];
  }>;
};

type RequestSource = "request_form" | "failed_search";

function normalizeSource(source: string | string[] | undefined): RequestSource {
  const value = Array.isArray(source) ? source[0] : source;
  return value === "failed_search" ? "failed_search" : "request_form";
}

export default async function RequestPage({ searchParams }: RequestPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialQuery = Array.isArray(resolvedSearchParams?.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams?.q;
  const initialSource = normalizeSource(resolvedSearchParams?.source);

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            description="Describe the workflow you wish existed. Requests help decide what should be manually written and verified next."
            eyebrow="Request a workflow"
            title="What do you wish WorknFlow had?"
          />
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="p-6">
          <WorkflowRequestForm
            initialQuery={initialQuery ?? ""}
            initialSource={initialSource}
          />
        </Card>
      </section>
    </PageShell>
  );
}
