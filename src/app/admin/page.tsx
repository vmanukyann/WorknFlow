import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminDashboardCounts } from "@/lib/admin/queries";

const quickLinks = [
  { href: "/admin/workflows", label: "Manage workflows" },
  { href: "/admin/workflows/new", label: "New workflow" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/feedback", label: "Feedback" },
];

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const counts = await getAdminDashboardCounts();

  return (
    <AdminShell
      admin={admin}
      description="Review public data, requests, feedback, and workflow publishing status."
      title="Admin overview"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Total workflows", counts.totalWorkflows],
          ["Approved", counts.approvedWorkflows],
          ["Drafts", counts.draftWorkflows],
          ["New requests", counts.newRequests],
          ["Feedback", counts.feedbackCount],
        ].map(([label, value]) => (
          <Card className="p-5" key={label}>
            <p className="text-sm font-medium text-zinc-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-950">{value}</p>
          </Card>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-950">Quick links</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              className="rounded-lg border border-zinc-200 bg-white p-4 text-sm font-semibold text-teal-800 shadow-[0_1px_2px_rgba(24,24,27,0.04)] hover:border-teal-700/40"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
