import { FreshnessBadge } from "@/components/badges/FreshnessBadge";
import { LearningSafeBadge } from "@/components/badges/LearningSafeBadge";
import { RiskBadge } from "@/components/badges/RiskBadge";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/workflow/CopyButton";
import type { Workflow } from "@/types/workflow";

type WorkflowMetaPanelProps = {
  workflow: Workflow;
  copyText?: string;
};

const learningSafeCopy = {
  "learning-safe": "Designed to support learning, planning, or understanding.",
  "needs-caution": "Use as feedback or guidance. Do the final thinking yourself.",
  "not-allowed": "This workflow should not be used for the requested task.",
};

export function WorkflowMetaPanel({ workflow, copyText }: WorkflowMetaPanelProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <Card className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Trust metadata
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <FreshnessBadge status={workflow.freshnessStatus} />
          <LearningSafeBadge mode={workflow.learningSafeMode} />
          <RiskBadge risk={workflow.categoryRisk} />
        </div>
        <dl className="mt-5 divide-y divide-zinc-100 text-sm">
          <div>
            <dt className="font-medium text-zinc-950">Verification</dt>
            <dd className="mt-1 pb-3 text-zinc-600">
              {workflow.isVerified ? "Manually verified" : "Not verified"}
            </dd>
          </div>
          <div className="py-3">
            <dt className="font-medium text-zinc-950">Last checked</dt>
            <dd className="mt-1 text-zinc-600">{workflow.lastVerifiedAt}</dd>
          </div>
          <div className="py-3">
            <dt className="font-medium text-zinc-950">Audience</dt>
            <dd className="mt-1 capitalize text-zinc-600">{workflow.audience}</dd>
          </div>
          <div className="pt-3">
            <dt className="font-medium text-zinc-950">Platform tested</dt>
            <dd className="mt-1 text-zinc-600">{workflow.platformTestedOn}</dd>
          </div>
        </dl>
        {copyText ? (
          <div className="mt-5">
            <CopyButton label="Copy full workflow" text={copyText} />
          </div>
        ) : null}
      </Card>
      <Card className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Learning-safe policy
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {learningSafeCopy[workflow.learningSafeMode]}
        </p>
      </Card>
      <Card className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Use with care
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Check the example output and quality list before using the result in
          class, writing, or a build plan.
        </p>
      </Card>
    </aside>
  );
}
