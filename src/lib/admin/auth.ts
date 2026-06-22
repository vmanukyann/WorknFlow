import { redirect } from "next/navigation";

import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";
import type { AdminUser } from "@/lib/admin/types";

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const supabase = await createAdminSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, is_admin")
    .eq("id", user.id)
    .eq("is_admin", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    email: user.email,
    id: user.id,
  };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login?error=Admin%20access%20required");
  }

  return admin;
}
