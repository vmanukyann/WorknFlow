import { CopyButton } from "@/components/workflow/CopyButton";
import type { WorkflowStep } from "@/types/workflow";

type PromptStepCardProps = {
  step: WorkflowStep;
};

export function PromptStepCard({ step }: PromptStepCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(24,24,27,0.04)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4 p-5 pb-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-sm font-semibold text-teal-900">
            {step.stepNumber}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Prompt {step.stepNumber}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-950">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{step.goal}</p>
          </div>
        </div>
        <div className="px-5 sm:pt-5">
          <CopyButton label="Copy prompt" text={step.promptText} />
        </div>
      </div>
      <div className="mt-5 border-y border-zinc-200 bg-zinc-50">
        <div className="border-b border-zinc-200 px-5 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Copyable prompt
          </p>
        </div>
        <pre className="whitespace-pre-wrap px-5 py-4 text-sm leading-6 text-zinc-800">
          {step.promptText}
        </pre>
      </div>
      {step.exampleOutput ? (
        <div className="p-5">
          <h4 className="text-sm font-semibold text-zinc-950">
            What to look for in the output
          </h4>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {step.exampleOutput}
          </p>
        </div>
      ) : null}
    </article>
  );
}
