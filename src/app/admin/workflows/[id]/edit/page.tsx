import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { WorkflowForm } from "@/components/admin/WorkflowForm";
import { Card } from "@/components/ui/Card";
import { updateWorkflowAction } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminWorkflow, getWorkflowChildren } from "@/lib/admin/queries";

type EditWorkflowPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    error?: string | string[];
    updated?: string | string[];
  }>;
};

export default async function EditWorkflowPage({
  params,
  searchParams,
}: EditWorkflowPageProps) {
  const admin = await requireAdmin();
  const { id } = await params;
  const workflow = await getAdminWorkflow(id);

  if (!workflow) {
    notFound();
  }

  const children = await getWorkflowChildren(id);
  const resolvedSearchParams = await searchParams;
  const error = Array.isArray(resolvedSearchParams?.error)
    ? resolvedSearchParams.error[0]
    : resolvedSearchParams?.error;
  const updated = resolvedSearchParams?.updated ? "Workflow saved." : undefined;

  return (
    <AdminShell
      admin={admin}
      description="Edit the main workflow fields and publishing status."
      title="Edit workflow"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-6">
          <WorkflowForm
            action={updateWorkflowAction}
            error={error}
            mode="edit"
            success={updated}
            workflow={workflow}
          />
        </Card>
        <aside className="space-y-4">
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-zinc-950">
              Prompt steps
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Step editing comes in Phase 6B.
            </p>
            <ol className="mt-4 space-y-2 text-sm text-zinc-700">
              {children.steps.map((step) => (
                <li key={step.id}>
                  {step.step_number}. {step.title}
                </li>
              ))}
              {children.steps.length === 0 ? <li>No steps yet.</li> : null}
            </ol>
          </Card>
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-zinc-950">
              Quality checklist
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Checklist editing comes in Phase 6B.
            </p>
            <ol className="mt-4 space-y-2 text-sm text-zinc-700">
              {children.checks.map((check) => (
                <li key={check.id}>
                  {check.position}. {check.label}
                </li>
              ))}
              {children.checks.length === 0 ? <li>No checklist items yet.</li> : null}
            </ol>
          </Card>
        </aside>
      </div>
    </AdminShell>
  );
}
