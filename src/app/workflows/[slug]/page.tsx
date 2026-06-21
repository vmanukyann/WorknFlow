import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/workflow/CopyButton";
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
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-950">
                  Problem solved
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {workflow.problemSolved}
                </p>
              </div>
              <CopyButton
                label="Copy full workflow"
                text={formatWorkflowForCopy(workflow)}
              />
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-semibold text-zinc-950">Context setup</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {workflow.contextSetup}
            </p>
          </Card>

          <section className="space-y-4" aria-labelledby="prompt-steps">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950" id="prompt-steps">
                Prompt steps
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Run these in order. Each step keeps the work inspectable.
              </p>
            </div>
            {workflow.steps.map((step) => (
              <PromptStepCard key={step.id} step={step} />
            ))}
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <h2 className="text-xl font-semibold text-zinc-950">Example input</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.exampleInput}
              </p>
            </Card>
            <Card className="p-5">
              <h2 className="text-xl font-semibold text-zinc-950">Example output</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {workflow.exampleOutput}
              </p>
            </Card>
          </div>

          <QualityChecklist items={workflow.qualityChecklist} />
          <WorkflowFeedback />
        </div>

        <WorkflowMetaPanel workflow={workflow} />
      </div>
    </PageShell>
  );
}
