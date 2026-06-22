import Link from "next/link";

import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { PageShell } from "@/components/layout/PageShell";
import { HomeSearch } from "@/components/search/HomeSearch";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WorkflowGrid } from "@/components/workflow/WorkflowGrid";
import { sampleWorkflows } from "@/data/sampleWorkflows";

const suggestedSearches = [
  "Make flashcards from messy notes",
  "Improve an essay argument",
  "Plan a small app idea",
  "Explain a wrong math solution",
];

export default function HomePage() {
  const featuredWorkflow = sampleWorkflows[0];

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-14">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Find the right AI workflow for what you&apos;re trying to do.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Search tested workflows with example outputs, copy the steps, and
              check the result before trusting it.
            </p>
            <HomeSearch />
            <div className="mt-5 flex flex-wrap gap-2">
              {suggestedSearches.map((search) => (
                <Link
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  href={`/workflows?search=${encodeURIComponent(search)}`}
                  key={search}
                >
                  {search}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonClassName("secondary")} href="/request">
                Request a workflow
              </Link>
            </div>
          </div>
          <Card className="self-center overflow-hidden">
            <div className="p-5">
              <FreshnessBadge status={featuredWorkflow.freshnessStatus} />
              <h2 className="mt-4 text-xl font-semibold leading-7 text-zinc-950">
                {featuredWorkflow.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {featuredWorkflow.problemSolved}
              </p>
              <p className="mt-4 text-sm font-medium text-zinc-700">
                {featuredWorkflow.steps.length} steps · Tested on{" "}
                {featuredWorkflow.platformTestedOn}
              </p>
              <p className="mt-4 border-t border-zinc-100 pt-4 text-sm leading-6 text-zinc-600">
                Check: {featuredWorkflow.qualityChecklist[0]}
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                Start with a tested workflow
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                Each guide includes what to prepare, what to copy, and how to
                check the result.
              </p>
            </div>
            <Link className={buttonClassName("secondary")} href="/workflows">
              View all
            </Link>
          </div>
          <div className="mt-8">
            <WorkflowGrid workflows={sampleWorkflows} />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Use AI to learn, not to skip the work.
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
