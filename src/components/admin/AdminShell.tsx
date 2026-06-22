import Link from "next/link";
import type { ReactNode } from "react";

import { logoutAdminAction } from "@/lib/admin/actions";
import type { AdminUser } from "@/lib/admin/types";

type AdminShellProps = {
  admin: AdminUser;
  children: ReactNode;
  title: string;
  description?: string;
};

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/workflows", label: "Workflows" },
  { href: "/admin/workflows/new", label: "New workflow" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/feedback", label: "Feedback" },
];

export function AdminShell({
  admin,
  children,
  description,
  title,
}: AdminShellProps) {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-800">WorknFlow admin</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
              {description ? (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                  {description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 sm:items-end">
              <span>{admin.email ?? "Admin user"}</span>
              <form action={logoutAdminAction}>
                <button
                  className="font-semibold text-teal-800 hover:text-teal-900"
                  type="submit"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-teal-700/40 hover:text-teal-800"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
