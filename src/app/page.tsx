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
    "WorknFlow is a library of tested AI workflows with prompts, examples, and checklists for school, coding, research, writing, and productivity.",
  alternates: {
    canonical: "/",
  },
};

const suggestedSearches = [
  "Make flashcards from messy notes",
  "Improve an essay argument",
  "Plan a small app idea",
  "Explain a wrong math solution",
];

const howItWorks = [
  {
    title: "Search your task",
    description:
      "Type what you need help with, like studying, writing, coding, or planning.",
  },
  {
    title: "Copy the steps",
    description: "Each guide gives you prompts to paste into ChatGPT or Claude.",
  },
  {
    title: "Check the result",
    description:
      "Use the example and checklist to catch weak or made-up answers.",
  },
];

const trustItems = [
  {
    title: "Tested",
    description: "Each workflow says which AI tool it was tested on.",
  },
  {
    title: "Example output",
    description: "See what a good result can look like before you try it.",
  },
  {
    title: "Checklist",
    description: "Check the answer before using it for school or a project.",
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
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Find tested AI workflows you can actually use.
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-600">
                Search what you&apos;re trying to do. Get copyable steps, an
                example result, and a checklist so you can judge the answer
                before trusting it.
              </p>
              <HomeSearch />
              <div className="mt-5 flex flex-wrap gap-2">
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
            </div>

            <div className="grid gap-3">
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
                        {workflow.steps.length} steps · Example output included
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
          Start with the problem. Copy the steps. Check the result.
        </h2>
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
            WorknFlow is built for learning, planning, and revision. It should
            help you think better, not replace your thinking.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
