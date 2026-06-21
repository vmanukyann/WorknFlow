import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WorkflowGrid } from "@/components/workflow/WorkflowGrid";
import { sampleWorkflows } from "@/data/sampleWorkflows";

const valueCards = [
  {
    title: "Context before prompts",
    description:
      "Each workflow starts with what to gather, what to disclose, and what the AI should avoid guessing.",
  },
  {
    title: "Real example outputs",
    description:
      "You can see the expected shape of the result before trusting a workflow with your own task.",
  },
  {
    title: "Freshness and quality checks",
    description:
      "Workflows include verification status, risk level, and a checklist for judging the answer.",
  },
];

const categories = [
  "Studying",
  "Writing",
  "STEM",
  "Coding",
  "Project planning",
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
              Verified AI workflows
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
              Find tested AI workflows that actually show the result.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              WorknFlow pairs context setup, prompt steps, example outputs,
              freshness status, and quality checklists so you can use AI with
              more trust and better judgment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonClassName("primary")} href="/workflows">
                Browse workflows
              </Link>
              <Link className={buttonClassName("secondary")} href="/request">
                Request a workflow
              </Link>
            </div>
          </div>
          <Card className="self-center p-5">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-medium text-zinc-500">Search workflows</p>
              <p className="mt-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-500">
                study guide for messy notes
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {sampleWorkflows.map((workflow) => (
                <div
                  className="rounded-lg border border-zinc-200 bg-white p-4"
                  key={workflow.id}
                >
                  <p className="text-sm font-semibold text-zinc-950">
                    {workflow.title}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {workflow.steps.length} prompt steps · {workflow.freshnessStatus}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          description="A workflow should make the process inspectable, not hide the important parts in a single magic prompt."
          title="Built for judgment, not blind copy-paste"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {valueCards.map((card) => (
            <Card className="p-5" key={card.title}>
              <h3 className="text-lg font-semibold text-zinc-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {card.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              description="Start with three manually written, manually verified workflows from the hardcoded sample data."
              title="Featured workflows"
            />
            <Link className={buttonClassName("secondary")} href="/workflows">
              View all
            </Link>
          </div>
          <div className="mt-8">
            <WorkflowGrid workflows={sampleWorkflows} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          description="The library is small in this phase, but the structure supports practical school and builder tasks."
          title="Browse by category"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Card
              className="p-4 text-sm font-semibold text-zinc-800"
              key={category}
            >
              {category}
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
              Academic integrity
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
              Learn faster and think clearer without replacing your thinking.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600">
              WorknFlow is for study guides, feedback, practice, explanations,
              and planning. It is not for writing essays for you, doing homework,
              inventing citations, or bypassing academic rules.
            </p>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
