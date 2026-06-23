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
        <h2 className="text-lg font-semibold text-zinc-950">
          Trust signals
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Use these before relying on the result.
        </p>
        <dl className="mt-4 divide-y divide-zinc-100 text-sm">
          <div>
            <dt className="font-medium text-zinc-950">Tested platform</dt>
            <dd className="mt-1 pb-3 text-zinc-600">
              {workflow.platformTestedOn}
            </dd>
          </div>
          <div className="py-3">
            <dt className="font-medium text-zinc-950">Freshness</dt>
            <dd className="mt-1 text-zinc-600">
              {workflow.freshnessStatus.replace("-", " ")}
            </dd>
          </div>
          <div className="py-3">
            <dt className="font-medium text-zinc-950">Last checked</dt>
            <dd className="mt-1 text-zinc-600">{workflow.lastVerifiedAt}</dd>
          </div>
        </dl>
        {copyText ? (
          <div className="mt-5">
            <CopyButton label="Copy full workflow" text={copyText} />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Copies setup, prompts, example output, and checklist.
            </p>
          </div>
        ) : null}
      </Card>
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-zinc-950">
          Learning-safe note
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {learningSafeCopy[workflow.learningSafeMode]}
        </p>
      </Card>
    </aside>
  );
}
