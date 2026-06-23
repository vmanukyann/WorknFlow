import Link from "next/link";

import { DifficultyBadge } from "@/components/badges/DifficultyBadge";
import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { LearningSafeBadge } from "@/components/badges/LearningSafeBadge";
import { PlatformBadge } from "@/components/badges/PlatformBadge";
import { Card } from "@/components/ui/Card";
import type { Workflow } from "@/types/workflow";

type WorkflowCardProps = {
  workflow: Workflow;
};

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
      href={`/workflows/${workflow.slug}`}
    >
      <Card className="flex h-full flex-col p-4 transition-colors group-hover:border-teal-700/40 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-teal-800">
            {workflow.category}
          </span>
          <FreshnessBadge status={workflow.freshnessStatus} />
          <LearningSafeBadge mode={workflow.learningSafeMode} />
        </div>
        <div className="mt-4 flex-1">
          <h3 className="text-lg font-semibold leading-7 text-zinc-950">
            {workflow.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-zinc-700">
            What it helps with
          </p>
          <p className="mt-1 line-clamp-3 text-sm leading-6 text-zinc-600">
            {workflow.problemSolved}
          </p>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 text-sm">
          <div>
            <dt className="text-zinc-500">Steps</dt>
            <dd className="mt-1 font-medium text-zinc-950">
              {workflow.steps.length}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Difficulty</dt>
            <dd className="mt-1">
              <DifficultyBadge difficulty={workflow.difficulty} />
            </dd>
          </div>
        </dl>
        <div className="mt-4">
          <PlatformBadge platform={workflow.platformTestedOn} />
        </div>
        <div className="mt-4 border-t border-zinc-100 pt-4">
          <p className="text-sm font-medium text-zinc-950">First prompts</p>
          <ol className="mt-2 space-y-1 text-sm leading-6 text-zinc-600">
            {workflow.steps.slice(0, 2).map((step) => (
              <li key={step.id}>
                {step.stepNumber}. {step.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-5">
          <span className="text-sm font-semibold text-teal-800 group-hover:text-teal-900">
            Open workflow
          </span>
        </div>
      </Card>
    </Link>
  );
}
