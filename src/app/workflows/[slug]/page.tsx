import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { PromptStepCard } from "@/components/workflow/PromptStepCard";
import { QualityChecklist } from "@/components/workflow/QualityChecklist";
import { WorkflowDetailHeader } from "@/components/workflow/WorkflowDetailHeader";
import { WorkflowFeedback } from "@/components/workflow/WorkflowFeedback";
import { WorkflowMetaPanel } from "@/components/workflow/WorkflowMetaPanel";
import { sampleWorkflows } from "@/data/sampleWorkflows";
import type { Workflow } from "@/types/workflow";

type WorkflowPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function findWorkflow(slug: string) {
  return sampleWorkflows.find((workflow) => workflow.slug === slug);
}

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

export function generateStaticParams() {
  return sampleWorkflows.map((workflow) => ({
    slug: workflow.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = findWorkflow(slug);

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
  const workflow = findWorkflow(slug);

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
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                Use case
              </p>
              <h2 className="mt-2 text-xl font-semibold text-zinc-950" id="use-case">
                What this workflow helps with
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.problemSolved}
              </p>
            </Card>
          </section>

          <section aria-labelledby="before-start">
            <Card className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                Before you start
              </p>
              <h2 className="mt-2 text-xl font-semibold text-zinc-950" id="before-start">
                Context setup
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.contextSetup}
              </p>
            </Card>
          </section>

          <section className="space-y-4" aria-labelledby="prompt-steps">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                Run the workflow
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950" id="prompt-steps">
                Prompt steps in order
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Run these in order. Each step has a job, a prompt, and an output
                signal to check.
              </p>
            </div>
            {workflow.steps.map((step) => (
              <PromptStepCard key={step.id} step={step} />
            ))}
          </section>

          <section className="space-y-4" aria-labelledby="good-output">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                What good output looks like
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950" id="good-output">
                Example input and output
              </h2>
            </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-zinc-950">Example input</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.exampleInput}
              </p>
            </Card>
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-zinc-950">Example output</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.exampleOutput}
              </p>
            </Card>
          </div>
          </section>

          <QualityChecklist items={workflow.qualityChecklist} />
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
              When to use / when not to use
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">
                  Use this when
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  You want a structured way to use AI for {workflow.category.toLowerCase()} while keeping the output inspectable.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">
                  Do not use this to
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Skip your own judgment, invent facts, or submit AI output
                  without checking it against the quality checklist.
                </p>
              </div>
            </div>
          </Card>
          <WorkflowFeedback />
        </div>

        <WorkflowMetaPanel
          copyText={formatWorkflowForCopy(workflow)}
          workflow={workflow}
        />
      </div>
    </PageShell>
  );
}
