import { DifficultyBadge } from "@/components/badges/DifficultyBadge";
import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { LearningSafeBadge } from "@/components/badges/LearningSafeBadge";
import { PlatformBadge } from "@/components/badges/PlatformBadge";
import type { Workflow } from "@/types/workflow";

type WorkflowDetailHeaderProps = {
  workflow: Workflow;
};

export function WorkflowDetailHeader({ workflow }: WorkflowDetailHeaderProps) {
  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-teal-800">
          Tested workflow · {workflow.category}
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          {workflow.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
          {workflow.description}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-700">
          Use this as an operating manual: set the context, copy each prompt in
          order, compare the example output, then check the result before using
          it.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <PlatformBadge platform={workflow.platformTestedOn} />
          <FreshnessBadge status={workflow.freshnessStatus} />
          <DifficultyBadge difficulty={workflow.difficulty} />
          <LearningSafeBadge mode={workflow.learningSafeMode} />
        </div>
      </div>
    </div>
  );
}
