import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { WorkflowChildEditors } from "@/components/admin/WorkflowChildEditors";
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
    checksUpdated?: string | string[];
    error?: string | string[];
    stepsUpdated?: string | string[];
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
  const stepsUpdated = resolvedSearchParams?.stepsUpdated
    ? "Prompt steps saved."
    : undefined;
  const checksUpdated = resolvedSearchParams?.checksUpdated
    ? "Quality checklist saved."
    : undefined;

  return (
    <AdminShell
      admin={admin}
      description="Edit the workflow, prompt steps, and quality checklist."
      title="Edit workflow"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <WorkflowForm
            action={updateWorkflowAction}
            error={error}
            mode="edit"
            success={updated}
            workflow={workflow}
          />
        </Card>
        <WorkflowChildEditors
          checksSuccess={checksUpdated}
          childrenRecords={children}
          stepsSuccess={stepsUpdated}
          workflow={workflow}
        />
      </div>
    </AdminShell>
  );
}
