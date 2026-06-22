import { AdminShell } from "@/components/admin/AdminShell";
import { WorkflowForm } from "@/components/admin/WorkflowForm";
import { Card } from "@/components/ui/Card";
import { createWorkflowAction } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";

type NewWorkflowPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

export default async function NewWorkflowPage({
  searchParams,
}: NewWorkflowPageProps) {
  const admin = await requireAdmin();
  const resolvedSearchParams = await searchParams;
  const error = Array.isArray(resolvedSearchParams?.error)
    ? resolvedSearchParams.error[0]
    : resolvedSearchParams?.error;

  return (
    <AdminShell
      admin={admin}
      description="Create the main workflow record as a draft. Steps and checklist editing come next."
      title="New workflow"
    >
      <Card className="p-6">
        <WorkflowForm action={createWorkflowAction} error={error} mode="create" />
      </Card>
    </AdminShell>
  );
}
