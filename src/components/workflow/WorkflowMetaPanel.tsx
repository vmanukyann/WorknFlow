import { Card } from "@/components/ui/Card";
import type { Workflow } from "@/types/workflow";

type WorkflowMetaPanelProps = {
  workflow: Workflow;
};

const learningSafeCopy = {
  "learning-safe": "Designed to support learning, planning, or understanding.",
  "needs-caution": "Use as feedback or guidance. Do the final thinking yourself.",
  "not-allowed": "This workflow should not be used for the requested task.",
};

export function WorkflowMetaPanel({ workflow }: WorkflowMetaPanelProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <Card className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Verification
        </h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-zinc-950">Verified</dt>
            <dd className="mt-1 text-zinc-600">{workflow.isVerified ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-950">Last checked</dt>
            <dd className="mt-1 text-zinc-600">{workflow.lastVerifiedAt}</dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-950">Audience</dt>
            <dd className="mt-1 capitalize text-zinc-600">{workflow.audience}</dd>
          </div>
        </dl>
      </Card>
      <Card className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Learning-safe policy
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {learningSafeCopy[workflow.learningSafeMode]}
        </p>
      </Card>
    </aside>
  );
}
