import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { PromptStepCard } from "@/components/workflow/PromptStepCard";
import { QualityChecklist } from "@/components/workflow/QualityChecklist";
import { WorkflowDetailHeader } from "@/components/workflow/WorkflowDetailHeader";
import { WorkflowFeedback } from "@/components/workflow/WorkflowFeedback";
import { WorkflowMetaPanel } from "@/components/workflow/WorkflowMetaPanel";
import { getApprovedWorkflowBySlug } from "@/lib/workflows/queries";
import type { Workflow } from "@/types/workflow";

export const dynamic = "force-dynamic";

type WorkflowPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatWorkflowForCopy(workflow: Workflow) {
  const steps = workflow.steps
    .map(
      (step) =>
        `Step ${step.stepNumber}: ${step.title}\nGoal: ${step.goal}\nPrompt:\n${step.promptText}`,
    )
    .join("\n\n");

  return `${workflow.title}\n\n${workflow.description}\n\nContext setup:\n${workflow.contextSetup}\n\nExample input:\n${workflow.exampleInput}\n\n${steps}\n\nExample output:\n${workflow.exampleOutput}\n\nQuality checklist:\n${workflow.qualityChecklist
    .map((item) => `- ${item}`)
    .join("\n")}`;
}

export async function generateMetadata({
  params,
}: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = await getApprovedWorkflowBySlug(slug);

  if (!workflow) {
    return {
      title: "Workflow not found | WorknFlow",
    };
  }

  return {
    title: `${workflow.title} | WorknFlow`,
    description: workflow.description,
  };
}

export default async function WorkflowDetailPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = await getApprovedWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  return (
    <PageShell>
      <WorkflowDetailHeader workflow={workflow} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-8">
          <section aria-labelledby="use-case">
            <Card className="p-5">
              <h2 className="text-xl font-semibold text-zinc-950" id="use-case">
                What this helps with
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.problemSolved}
              </p>
            </Card>
          </section>

          <section aria-labelledby="before-start">
            <Card className="p-5">
              <h2 className="text-xl font-semibold text-zinc-950" id="before-start">
                Before you start
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.contextSetup}
              </p>
            </Card>
          </section>

          <section className="space-y-4" aria-labelledby="prompt-steps">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950" id="prompt-steps">
                Copy the steps
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Copy each prompt in order. Adjust the bracketed parts for your
                own notes, draft, or idea.
              </p>
            </div>
            {workflow.steps.map((step) => (
              <PromptStepCard key={step.id} step={step} />
            ))}
          </section>

          <section className="space-y-4" aria-labelledby="good-output">
            <div>
              <h2
                className="text-2xl font-semibold tracking-tight text-zinc-950"
                id="good-output"
              >
                What good output looks like
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-5">
                <h3 className="text-lg font-semibold text-zinc-950">
                  Example input
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {workflow.exampleInput}
                </p>
              </Card>
              <Card className="p-5">
                <h3 className="text-lg font-semibold text-zinc-950">
                  Example output
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {workflow.exampleOutput}
                </p>
              </Card>
            </div>
          </section>

          <QualityChecklist items={workflow.qualityChecklist} />
          <Card className="p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">
                  Use this when
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  You want help with {workflow.category.toLowerCase()} and will
                  check the result before using it.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">
                  Don&apos;t use this when
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  You need the AI to do the whole assignment for you, invent
                  facts, or replace your own work.
                </p>
              </div>
            </div>
          </Card>
          <WorkflowFeedback workflowId={workflow.id} />
        </div>

        <WorkflowMetaPanel
          copyText={formatWorkflowForCopy(workflow)}
          workflow={workflow}
        />
      </div>
    </PageShell>
  );
}
