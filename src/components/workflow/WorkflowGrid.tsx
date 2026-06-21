import { WorkflowCard } from "@/components/workflow/WorkflowCard";
import type { Workflow } from "@/types/workflow";

type WorkflowGridProps = {
  workflows: Workflow[];
};

export function WorkflowGrid({ workflows }: WorkflowGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
