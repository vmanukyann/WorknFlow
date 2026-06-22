import { requireAdmin } from "@/lib/admin/auth";
import type {
  AdminFeedback,
  AdminRequest,
  AdminWorkflow,
  WorkflowChildren,
} from "@/lib/admin/types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin-server";

async function getAdminClient() {
  await requireAdmin();
  const supabase = await createAdminSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  return supabase;
}

async function getCount(table: string, filters: Record<string, string> = {}) {
  const supabase = await getAdminClient();
  let query = supabase.from(table).select("*", {
    count: "exact",
    head: true,
  });

  Object.entries(filters).forEach(([column, value]) => {
    query = query.eq(column, value);
  });

  const { count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function getAdminDashboardCounts() {
  const [
    totalWorkflows,
    approvedWorkflows,
    draftWorkflows,
    newRequests,
    feedbackCount,
  ] = await Promise.all([
    getCount("workflows"),
    getCount("workflows", { status: "approved" }),
    getCount("workflows", { status: "draft" }),
    getCount("workflow_requests", { status: "new" }),
    getCount("workflow_feedback"),
  ]);

  return {
    approvedWorkflows,
    draftWorkflows,
    feedbackCount,
    newRequests,
    totalWorkflows,
  };
}

export async function getAdminWorkflows() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from("workflows")
    .select(
      "id, title, slug, description, problem_solved, category, audience, platform_tested_on, difficulty, category_risk, context_setup, example_input, example_output, learning_safe_mode, freshness_status, last_verified_at, is_verified, status, created_at, updated_at",
    )
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminWorkflow[];
}

export async function getAdminWorkflow(id: string) {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from("workflows")
    .select(
      "id, title, slug, description, problem_solved, category, audience, platform_tested_on, difficulty, category_risk, context_setup, example_input, example_output, learning_safe_mode, freshness_status, last_verified_at, is_verified, status, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as AdminWorkflow | null) ?? null;
}

export async function getWorkflowChildren(id: string): Promise<WorkflowChildren> {
  const supabase = await getAdminClient();
  const [stepsResult, checksResult] = await Promise.all([
    supabase
      .from("workflow_steps")
      .select("id, step_number, title")
      .eq("workflow_id", id)
      .order("step_number", { ascending: true }),
    supabase
      .from("workflow_quality_checks")
      .select("id, position, label")
      .eq("workflow_id", id)
      .order("position", { ascending: true }),
  ]);

  if (stepsResult.error) {
    throw new Error(stepsResult.error.message);
  }

  if (checksResult.error) {
    throw new Error(checksResult.error.message);
  }

  return {
    checks: checksResult.data ?? [],
    steps: stepsResult.data ?? [],
  };
}

export async function getAdminRequests() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from("workflow_requests")
    .select("id, query, source, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminRequest[];
}

export async function getAdminFeedback() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from("workflow_feedback")
    .select("id, workflow_id, rating, comment, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminFeedback[];
}
