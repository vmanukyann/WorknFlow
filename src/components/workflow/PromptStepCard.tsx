import { CopyButton } from "@/components/workflow/CopyButton";
import type { WorkflowStep } from "@/types/workflow";

type PromptStepCardProps = {
  step: WorkflowStep;
};

export function PromptStepCard({ step }: PromptStepCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-800">Step {step.stepNumber}</p>
          <h3 className="mt-1 text-xl font-semibold text-zinc-950">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{step.goal}</p>
        </div>
        <CopyButton text={step.promptText} />
      </div>
      <pre className="mt-5 whitespace-pre-wrap rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-800">
        {step.promptText}
      </pre>
      {step.exampleOutput ? (
        <div className="mt-5 rounded-lg border border-zinc-200 bg-white p-4">
          <h4 className="text-sm font-semibold text-zinc-950">Example output</h4>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{step.exampleOutput}</p>
        </div>
      ) : null}
    </article>
  );
}
