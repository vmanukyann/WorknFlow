import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { LearningSafeBadge } from "@/components/badges/LearningSafeBadge";
import { PlatformBadge } from "@/components/badges/PlatformBadge";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WorkflowGrid } from "@/components/workflow/WorkflowGrid";
import { sampleWorkflows } from "@/data/sampleWorkflows";

const valueCards = [
  {
    title: "Start with context",
    description:
      "Each workflow says what to gather first, what the AI should know, and what it should not guess.",
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
  const featuredWorkflow = sampleWorkflows[0];

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
              Verified workflow runbooks
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Find tested AI workflows that actually show the result.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Find the exact AI workflow you need, see proof it works, and judge
              the result before trusting it. Each runbook includes setup,
              prompt steps, example output, freshness, and checks.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonClassName("primary")} href="/workflows">
                Browse workflows
              </Link>
              <Link className={buttonClassName("secondary")} href="/request">
                Request a workflow
              </Link>
            </div>
          </div>
          <Card className="self-center overflow-hidden">
            <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Workflow record preview
              </p>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                <FreshnessBadge status={featuredWorkflow.freshnessStatus} />
                <LearningSafeBadge mode={featuredWorkflow.learningSafeMode} />
                <PlatformBadge platform={featuredWorkflow.platformTestedOn} />
              </div>
              <h2 className="mt-4 text-xl font-semibold leading-7 text-zinc-950">
                {featuredWorkflow.title}
              </h2>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                  <dt className="font-medium text-zinc-500">Prompt steps</dt>
                  <dd className="mt-1 font-semibold text-zinc-950">
                    {featuredWorkflow.steps.length}
                  </dd>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                  <dt className="font-medium text-zinc-500">Verified</dt>
                  <dd className="mt-1 font-semibold text-zinc-950">
                    {featuredWorkflow.lastVerifiedAt}
                  </dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-zinc-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Context setup
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">
                  {featuredWorkflow.contextSetup}
                </p>
              </div>
              <div className="mt-5 border-t border-zinc-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Quality check
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  {featuredWorkflow.qualityChecklist[0]}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          description="The library is small in this phase, but the structure supports practical school and builder tasks."
          title="Browse by category"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Card
              className="border-dashed p-4 text-sm font-semibold text-zinc-800"
              key={category}
            >
              {category}
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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
