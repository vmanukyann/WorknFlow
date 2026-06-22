import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";
import { updateRequestStatusAction } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminRequests } from "@/lib/admin/queries";
import { requestStatusOptions } from "@/lib/admin/types";

type AdminRequestsPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
    updated?: string | string[];
  }>;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US");
}

export default async function AdminRequestsPage({
  searchParams,
}: AdminRequestsPageProps) {
  const admin = await requireAdmin();
  const requests = await getAdminRequests();
  const resolvedSearchParams = await searchParams;
  const error = Array.isArray(resolvedSearchParams?.error)
    ? resolvedSearchParams.error[0]
    : resolvedSearchParams?.error;
  const success = resolvedSearchParams?.updated ? "Request status updated." : undefined;

  return (
    <AdminShell
      admin={admin}
      description="Workflow requests submitted from the request form and failed searches."
      title="Workflow requests"
    >
      <div className="mb-4">
        <AdminNotice error={error} success={success} />
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Query</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-3 font-medium text-zinc-950">
                    {request.query}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{request.source}</td>
                  <td className="px-4 py-3 text-zinc-600">{request.status}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {formatDate(request.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateRequestStatusAction} className="flex gap-2">
                      <input name="id" type="hidden" value={request.id} />
                      <select
                        className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm"
                        defaultValue={request.status}
                        name="status"
                      >
                        {requestStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm font-semibold text-teal-800 hover:border-teal-700/40"
                        type="submit"
                      >
                        Save
                      </button>
                    </form>
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
