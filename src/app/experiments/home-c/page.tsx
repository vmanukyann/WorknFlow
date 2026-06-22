import Link from "next/link";

import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { PageShell } from "@/components/layout/PageShell";
import { HomeSearch } from "@/components/search/HomeSearch";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { sampleWorkflows } from "@/data/sampleWorkflows";

export default function HomeExperimentC() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                A small library of tested AI workflows.
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-600">
                Browse practical guides with copyable steps, example outputs,
                and a checklist for the result.
              </p>
              <HomeSearch />
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
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-zinc-950">Tested</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Each workflow says which AI tool it was tested on.
            </p>
          </Card>
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-zinc-950">
              Example output
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              See what a good result can look like before you try it.
            </p>
          </Card>
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-zinc-950">Checklist</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Check the answer before using it for school or a project.
            </p>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
