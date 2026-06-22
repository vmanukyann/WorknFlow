import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Card } from "@/components/ui/Card";
import { getCurrentAdmin } from "@/lib/admin/auth";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin");
  }

  const resolvedSearchParams = await searchParams;
  const error = Array.isArray(resolvedSearchParams?.error)
    ? resolvedSearchParams.error[0]
    : resolvedSearchParams?.error;

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-16 text-zinc-950">
      <section className="mx-auto max-w-md">
        <div className="mb-6">
          <p className="text-sm font-semibold text-teal-800">Admin access only</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Sign in to WorknFlow admin
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Existing manually-created admin users only. There is no public signup.
          </p>
        </div>
        <Card className="p-6">
          <AdminLoginForm error={error} />
        </Card>
      </section>
    </main>
  );
}
