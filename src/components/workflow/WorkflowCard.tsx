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
      <Card className="flex h-full flex-col p-5 transition-colors group-hover:border-teal-700/40">
        <div className="flex flex-wrap gap-2">
          <FreshnessBadge status={workflow.freshnessStatus} />
          <LearningSafeBadge mode={workflow.learningSafeMode} />
        </div>
        <div className="mt-5 flex-1">
          <p className="text-sm font-medium text-teal-800">{workflow.category}</p>
          <h3 className="mt-2 text-lg font-semibold leading-7 text-zinc-950">
            {workflow.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {workflow.description}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <DifficultyBadge difficulty={workflow.difficulty} />
          <PlatformBadge platform={workflow.platformTestedOn} />
        </div>
      </Card>
    </Link>
  );
}
