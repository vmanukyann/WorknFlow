"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin/auth";
import {
  categoryRiskOptions,
  difficultyOptions,
  freshnessStatusOptions,
  learningSafeModeOptions,
  requestStatusOptions,
  workflowStatusOptions,
  type AdminUser,
  type CategoryRiskOption,
  type DifficultyOption,
  type FreshnessStatusOption,
  type LearningSafeModeOption,
  type RequestStatusOption,
  type WorkflowStatusOption,
} from "@/lib/admin/types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function requireText(formData: FormData, key: string) {
  const value = readString(formData, key);

  if (!value) {
    throw new Error(`${key.replaceAll("_", " ")} is required.`);
  }

  return value;
}

function readOption<T extends readonly string[]>(
  formData: FormData,
  key: string,
  options: T,
) {
  const value = readString(formData, key);

  if (!options.includes(value)) {
    throw new Error(`Invalid ${key.replaceAll("_", " ")}.`);
  }

  return value as T[number];
}

function redirectWithError(path: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function readWorkflowPayload(formData: FormData) {
  const slug = requireText(formData, "slug");

  if (!slugPattern.test(slug)) {
    throw new Error("Slug must use lowercase letters, numbers, and hyphens.");
  }

  return {
    category: requireText(formData, "category"),
    category_risk: readOption(
      formData,
      "category_risk",
      categoryRiskOptions,
    ) as CategoryRiskOption,
    context_setup: requireText(formData, "context_setup"),
    description: requireText(formData, "description"),
    difficulty: readOption(formData, "difficulty", difficultyOptions) as DifficultyOption,
    example_input: requireText(formData, "example_input"),
    example_output: requireText(formData, "example_output"),
    freshness_status: readOption(
      formData,
      "freshness_status",
      freshnessStatusOptions,
    ) as FreshnessStatusOption,
    is_verified: formData.get("is_verified") === "on",
    learning_safe_mode: readOption(
      formData,
      "learning_safe_mode",
      learningSafeModeOptions,
    ) as LearningSafeModeOption,
    platform_tested_on: requireText(formData, "platform_tested_on"),
    problem_solved: requireText(formData, "problem_solved"),
    slug,
    status: readOption(formData, "status", workflowStatusOptions) as WorkflowStatusOption,
    title: requireText(formData, "title"),
    audience: requireText(formData, "audience"),
  };
}

async function insertAuditLog({
  action,
  admin,
  metadata = {},
  recordId,
  tableName,
}: {
  action: "create" | "update" | "status-change";
  admin: AdminUser;
  metadata?: Record<string, unknown>;
  recordId?: string;
  tableName:
    | "workflows"
    | "workflow_requests"
    | "workflow_feedback"
    | "workflow_steps"
    | "workflow_quality_checks";
}) {
  const supabase = await createAdminSupabaseClient();

  if (!supabase) {
    return;
  }

  await supabase.from("admin_audit_log").insert({
    action,
    admin_user_id: admin.id,
    metadata,
    record_id: recordId,
    table_name: tableName,
  });
}

export async function loginAdminAction(formData: FormData) {
  const supabase = await createAdminSupabaseClient();

  if (!supabase) {
    redirect("/admin/login?error=Supabase%20is%20not%20configured");
  }

  const email = readString(formData, "email");
  const password = readString(formData, "password");

  if (!email || !password) {
    redirect("/admin/login?error=Email%20and%20password%20are%20required");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/login?error=Unable%20to%20sign%20in");
  }

  const user = data.user;

  if (!user) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=Admin%20access%20required");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, is_admin")
    .eq("id", user.id)
    .eq("is_admin", true)
    .maybeSingle();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=Admin%20access%20required");
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  const supabase = await createAdminSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

export async function createWorkflowAction(formData: FormData) {
  let newWorkflowId = "";

  try {
    const admin = await requireAdmin();
    const supabase = await createAdminSupabaseClient();

    if (!supabase) {
      throw new Error("Supabase is not configured.");
    }

    const payload = {
      ...readWorkflowPayload(formData),
      created_by: admin.id,
      status: "draft" as WorkflowStatusOption,
      updated_by: admin.id,
    };

    const { data, error } = await supabase
      .from("workflows")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    newWorkflowId = data.id;
    await insertAuditLog({
      action: "create",
      admin,
      recordId: newWorkflowId,
      tableName: "workflows",
    });
  } catch (error) {
    redirectWithError("/admin/workflows/new", error);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/workflows");
  redirect(`/admin/workflows/${newWorkflowId}/edit`);
}

export async function updateWorkflowAction(formData: FormData) {
  const id = requireText(formData, "id");

  try {
    const admin = await requireAdmin();
    const supabase = await createAdminSupabaseClient();

    if (!supabase) {
      throw new Error("Supabase is not configured.");
    }

    const payload = {
      ...readWorkflowPayload(formData),
      updated_by: admin.id,
    };

    const { error } = await supabase.from("workflows").update(payload).eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    await insertAuditLog({
      action: "update",
      admin,
      recordId: id,
      tableName: "workflows",
    });
  } catch (error) {
    redirectWithError(`/admin/workflows/${id}/edit`, error);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/workflows");
  revalidatePath(`/admin/workflows/${id}/edit`);
  redirect(`/admin/workflows/${id}/edit?updated=1`);
}

export async function updateRequestStatusAction(formData: FormData) {
  const id = requireText(formData, "id");
  const status = readOption(
    formData,
    "status",
    requestStatusOptions,
  ) as RequestStatusOption;

  try {
    const admin = await requireAdmin();
    const supabase = await createAdminSupabaseClient();

    if (!supabase) {
      throw new Error("Supabase is not configured.");
    }

    const { error } = await supabase
      .from("workflow_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    await insertAuditLog({
      action: "status-change",
      admin,
      metadata: { status },
      recordId: id,
      tableName: "workflow_requests",
    });
  } catch (error) {
    redirectWithError("/admin/requests", error);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/requests");
  redirect("/admin/requests?updated=1");
}
