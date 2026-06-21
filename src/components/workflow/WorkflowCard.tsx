import Link from "next/link";

import { DifficultyBadge } from "@/components/badges/DifficultyBadge";
import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { LearningSafeBadge } from "@/components/badges/LearningSafeBadge";
import { PlatformBadge } from "@/components/badges/PlatformBadge";
import { RiskBadge } from "@/components/badges/RiskBadge";
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
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
            {workflow.category}
          </p>
          <FreshnessBadge status={workflow.freshnessStatus} />
        </div>
        <div className="mt-4 flex-1">
          <h3 className="text-lg font-semibold leading-7 text-zinc-950">
            {workflow.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">
            {workflow.description}
          </p>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 text-xs">
          <div>
            <dt className="font-medium text-zinc-500">Steps</dt>
            <dd className="mt-1 font-semibold text-zinc-950">
              {workflow.steps.length} prompts
            </dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500">Verified</dt>
            <dd className="mt-1 font-semibold text-zinc-950">
              {workflow.lastVerifiedAt}
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          <LearningSafeBadge mode={workflow.learningSafeMode} />
          <DifficultyBadge difficulty={workflow.difficulty} />
          <RiskBadge risk={workflow.categoryRisk} />
          <PlatformBadge platform={workflow.platformTestedOn} />
        </div>
      </Card>
    </Link>
  );
}
