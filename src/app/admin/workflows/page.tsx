import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminWorkflows } from "@/lib/admin/queries";

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US") : "Not set";
}

export default async function AdminWorkflowsPage() {
  const admin = await requireAdmin();
  const workflows = await getAdminWorkflows();

  return (
    <AdminShell
      admin={admin}
      description="All workflow records, including draft, approved, hidden, and archived."
      title="Manage workflows"
    >
      <div className="mb-4 flex justify-end">
        <Link
          className="rounded-md border border-teal-800 bg-teal-800 px-3.5 py-2 text-sm font-semibold text-white hover:bg-teal-900"
          href="/admin/workflows/new"
        >
          New workflow
        </Link>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Freshness</th>
                <th className="px-4 py-3 font-medium">Last verified</th>
                <th className="px-4 py-3 font-medium">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {workflows.map((workflow) => (
                <tr key={workflow.id}>
                  <td className="px-4 py-3 font-medium text-zinc-950">
                    {workflow.title}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{workflow.category}</td>
                  <td className="px-4 py-3 text-zinc-600">{workflow.status}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {workflow.freshness_status}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    {formatDate(workflow.last_verified_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      className="font-semibold text-teal-800 hover:text-teal-900"
                      href={`/admin/workflows/${workflow.id}/edit`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminShell>
  );
}
