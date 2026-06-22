import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminFeedback } from "@/lib/admin/queries";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US");
}

export default async function AdminFeedbackPage() {
  const admin = await requireAdmin();
  const feedback = await getAdminFeedback();

  return (
    <AdminShell
      admin={admin}
      description="Simple public feedback submitted for approved workflows."
      title="Workflow feedback"
    >
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Workflow ID</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Comment</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {feedback.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-700">
                    {item.workflow_id}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{item.rating}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {item.comment ?? "No comment"}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    {formatDate(item.created_at)}
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
