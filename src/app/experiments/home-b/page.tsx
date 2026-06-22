import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/workflow/CopyButton";
import { sampleWorkflows } from "@/data/sampleWorkflows";

export default function HomeExperimentB() {
  const workflow = sampleWorkflows[0];

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Start with the problem. Copy the steps. Check the result.
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Here is what one WorknFlow guide looks like for a real task.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="p-5">
              <p className="text-sm font-medium text-zinc-500">User problem</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                Make flashcards from messy notes
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                Instead of asking AI to guess what matters, start by giving it
                your notes and asking it to keep uncertain parts separate.
              </p>
              <div className="mt-6">
                <Link className={buttonClassName("primary")} href="/workflows">
                  Browse workflows
                </Link>
              </div>
            </Card>

            <div className="space-y-3">
              {workflow.steps.map((step) => (
                <Card className="p-4" key={step.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-teal-800">
                        Step {step.stepNumber}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-zinc-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {step.goal}
                      </p>
                    </div>
                    <CopyButton label="Copy step" text={step.promptText} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-5">
          <h2 className="text-xl font-semibold text-zinc-950">
            Check the result
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-700 md:grid-cols-2">
            {workflow.qualityChecklist.map((item) => (
              <li className="flex gap-3" key={item}>
                <span
                  aria-hidden="true"
                  className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-700"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </PageShell>
  );
}
