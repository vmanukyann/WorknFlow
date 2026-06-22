import { loginAdminAction } from "@/lib/admin/actions";

import { AdminNotice } from "./AdminNotice";

type AdminLoginFormProps = {
  error?: string;
};

export function AdminLoginForm({ error }: AdminLoginFormProps) {
  return (
    <form action={loginAdminAction} className="space-y-5">
      <AdminNotice error={error} />
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Email</span>
        <input
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
          name="email"
          required
          type="email"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Password</span>
        <input
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
          name="password"
          required
          type="password"
        />
      </label>
      <button
        className="inline-flex items-center justify-center rounded-md border border-teal-800 bg-teal-800 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}
