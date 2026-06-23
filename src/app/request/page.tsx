import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { WorkflowRequestForm } from "@/components/request/WorkflowRequestForm";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Request a Workflow — WorknFlow",
  description:
    "Request a missing builder workflow for planning, coding, debugging, reviewing, or shipping with AI tools.",
  alternates: {
    canonical: "/request",
  },
  openGraph: {
    description:
      "Request a missing builder workflow for the WorknFlow library.",
    title: "Request a Workflow — WorknFlow",
    url: "/request",
  },
  twitter: {
    card: "summary",
    description:
      "Request a missing builder workflow for the WorknFlow library.",
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
            as="h1"
            description="Tell us what builder workflow is missing. Requests help decide what should be manually written, tested, and added next."
            eyebrow="Request a workflow"
            title="Request a missing workflow"
          />
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-zinc-950">
            Good requests are specific
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-zinc-600">
            <p>
              Ask for a workflow when you searched and could not find a tested
              prompt sequence for your builder task.
            </p>
            <p>
              WorknFlow stores the request text only. No account, personal
              profile, or background search logging is added here.
            </p>
            <p>
              Helpful details include the task, platform, and what a trustworthy
              result should avoid.
            </p>
          </div>
        </Card>
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
