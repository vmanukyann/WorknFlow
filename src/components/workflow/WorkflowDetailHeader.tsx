import { DifficultyBadge } from "@/components/badges/DifficultyBadge";
import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { LearningSafeBadge } from "@/components/badges/LearningSafeBadge";
import { PlatformBadge } from "@/components/badges/PlatformBadge";
import { RiskBadge } from "@/components/badges/RiskBadge";
import type { Workflow } from "@/types/workflow";

type WorkflowDetailHeaderProps = {
  workflow: Workflow;
};

export function WorkflowDetailHeader({ workflow }: WorkflowDetailHeaderProps) {
  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
          {workflow.category}
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          {workflow.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
          {workflow.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <FreshnessBadge status={workflow.freshnessStatus} />
          <LearningSafeBadge mode={workflow.learningSafeMode} />
          <DifficultyBadge difficulty={workflow.difficulty} />
          <RiskBadge risk={workflow.categoryRisk} />
          <PlatformBadge platform={workflow.platformTestedOn} />
        </div>
      </div>
    </div>
  );
}
