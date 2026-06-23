import Link from "next/link";
import type { Metadata } from "next";

import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { PageShell } from "@/components/layout/PageShell";
import { HomeSearch } from "@/components/search/HomeSearch";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { sampleWorkflows } from "@/data/sampleWorkflows";

export const metadata: Metadata = {
  title: "WorknFlow — Tested AI Workflows",
  description:
    "WorknFlow is a library of tested AI workflows for builders who use AI tools to plan, code, debug, and ship projects without losing control.",
  alternates: {
    canonical: "/",
  },
};

const suggestedSearches = [
  "Plan a small app idea",
  "Debug an error with context",
  "Review AI-generated code",
  "Create a safe refactor plan",
];

const howItWorks = [
  {
    title: "Search for the job",
    description:
      "Start with the builder task: planning, coding, debugging, reviewing, or shipping.",
  },
  {
    title: "Run tested prompts",
    description:
      "Each workflow gives you ordered prompts, repo context, and example output signals.",
  },
  {
    title: "Check before trusting",
    description:
      "Use the checklist and freshness notes to catch weak, incomplete, or made-up answers.",
  },
];

const trustItems = [
  {
    title: "Tested on a real tool",
    description:
      "Each workflow says which AI platform it was tested on before publishing.",
  },
  {
    title: "Examples included",
    description:
      "See the kind of input and output the workflow is meant to produce.",
  },
  {
    title: "Checks before trust",
    description:
      "Freshness and quality checks help you decide whether the result is usable.",
  },
];

function searchHref(search: string) {
  return `/workflows?search=${encodeURIComponent(search)}`;
}

export default function HomePage() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold text-teal-800">
                Tested AI workflows for planning, coding, debugging, and shipping.
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Build with AI tools without losing control.
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-600">
                Search by what you&apos;re trying to build or fix. Each workflow
                gives you copyable prompts, example output, and a checklist so
                you can guide the AI instead of trusting it blindly.
              </p>
              <HomeSearch />
              <div
                aria-label="Suggested searches"
                className="mt-5 flex flex-wrap gap-2"
              >
                {suggestedSearches.map((search) => (
                  <Link
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                    href={searchHref(search)}
                    key={search}
                  >
                    {search}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link className={buttonClassName("primary")} href="/workflows">
                  Browse workflows
                </Link>
                <Link className={buttonClassName("secondary")} href="/request">
                  Request a missing workflow
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              <p className="text-sm font-semibold text-zinc-950">
                Example workflows in the library
              </p>
              {sampleWorkflows.map((workflow) => (
                <Card className="p-4" key={workflow.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-teal-800">
                          {workflow.category}
                        </p>
                        <FreshnessBadge status={workflow.freshnessStatus} />
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-zinc-950">
                        {workflow.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {workflow.problemSolved}
                      </p>
                      <p className="mt-3 text-sm text-zinc-700">
                        Tested on {workflow.platformTestedOn} ·{" "}
                        {workflow.steps.length} steps · Checklist included
                      </p>
                    </div>
                    <Link
                      className={buttonClassName("secondary", "shrink-0")}
                      href={`/workflows/${workflow.slug}`}
                    >
                      View guide
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
          Plan the work. Copy the prompts. Review the result.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          WorknFlow is built for AI-assisted builders: find a tested workflow,
          run it in order, then decide whether the output is good enough to use.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {howItWorks.map((step) => (
            <Card className="p-5" key={step.title}>
              <h3 className="text-lg font-semibold text-zinc-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {trustItems.map((item) => (
            <div key={item.title}>
              <h2 className="text-lg font-semibold text-zinc-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-5">
          <p className="text-base leading-7 text-zinc-700">
            WorknFlow is built for builders using AI coding assistants. Use it
            to plan, inspect, and review more clearly, not to outsource your
            judgment.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
