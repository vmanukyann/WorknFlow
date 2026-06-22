import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { HomeSearch } from "@/components/search/HomeSearch";
import { Card } from "@/components/ui/Card";
import { sampleWorkflows } from "@/data/sampleWorkflows";

const suggestedSearches = [
  "Make flashcards from messy notes",
  "Improve an essay argument",
  "Plan a small app idea",
  "Explain a wrong math solution",
];

function searchHref(search: string) {
  return `/workflows?search=${encodeURIComponent(search)}`;
}

export default function HomeExperimentA() {
  const exampleWorkflow = sampleWorkflows[0];

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              What are you trying to do with AI?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Search for a task. WorknFlow shows a tested workflow, the steps to
              copy, an example result, and what to check.
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
          <Card className="self-center p-5">
            <h2 className="text-lg font-semibold text-zinc-950">
              After you search
            </h2>
            <ol className="mt-4 space-y-4 text-sm leading-6 text-zinc-700">
              <li>
                <span className="font-semibold text-zinc-950">1. Pick a workflow.</span>{" "}
                Start with the guide that best matches your task.
              </li>
              <li>
                <span className="font-semibold text-zinc-950">2. Copy the steps.</span>{" "}
                Paste each prompt into your AI tool.
              </li>
              <li>
                <span className="font-semibold text-zinc-950">3. Check the result.</span>{" "}
                Compare the output with the example and checklist.
              </li>
            </ol>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-5">
          <p className="text-sm font-medium text-teal-800">Example workflow</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            {exampleWorkflow.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            {exampleWorkflow.problemSolved}
          </p>
          <p className="mt-4 text-sm text-zinc-700">
            {exampleWorkflow.steps.length} steps · Tested on{" "}
            {exampleWorkflow.platformTestedOn}
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
