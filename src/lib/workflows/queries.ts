import { sampleWorkflows } from "@/data/sampleWorkflows";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  Audience,
  CategoryRisk,
  Difficulty,
  FreshnessStatus,
  LearningSafeMode,
  Workflow,
  WorkflowStatus,
} from "@/types/workflow";

export type SearchableWorkflow = Workflow & {
  searchText?: string;
};

type WorkflowRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  problem_solved: string;
  category: string;
  audience: string;
  platform_tested_on: string;
  difficulty: string;
  category_risk: string;
  context_setup: string;
  example_input: string;
  example_output: string;
  learning_safe_mode: string;
  freshness_status: string;
  last_verified_at: string | null;
  is_verified: boolean;
  status: string;
};

type WorkflowStepRow = {
  id: string;
  workflow_id: string;
  step_number: number;
  title: string;
  prompt: string;
  guidance: string | null;
  example_output: string | null;
};

type WorkflowQualityCheckRow = {
  id: string;
  workflow_id: string;
  position: number;
  label: string;
  description: string | null;
};

function warnAndFallback(message: string) {
  console.warn(`[workflows] ${message}. Falling back to sample workflows.`);
}

function mapWorkflow(
  workflow: WorkflowRow,
  steps: WorkflowStepRow[],
  checks: WorkflowQualityCheckRow[],
): SearchableWorkflow {
  return {
    id: workflow.id,
    title: workflow.title,
    slug: workflow.slug,
    description: workflow.description,
    problemSolved: workflow.problem_solved,
    category: workflow.category,
    audience: workflow.audience as Audience,
    platformTestedOn: workflow.platform_tested_on,
    difficulty: workflow.difficulty as Difficulty,
    categoryRisk: workflow.category_risk as CategoryRisk,
    contextSetup: workflow.context_setup,
    exampleInput: workflow.example_input,
    exampleOutput: workflow.example_output,
    learningSafeMode: workflow.learning_safe_mode as LearningSafeMode,
    freshnessStatus: workflow.freshness_status as FreshnessStatus,
    lastVerifiedAt: workflow.last_verified_at ?? "",
    isVerified: workflow.is_verified,
    status: workflow.status as WorkflowStatus,
    steps: steps.map((step) => ({
      id: step.id,
      stepNumber: step.step_number,
      title: step.title,
      goal: step.guidance ?? "",
      promptText: step.prompt,
      exampleOutput: step.example_output ?? undefined,
    })),
    qualityChecklist: checks.map((check) => check.label),
    searchText: [
      workflow.title,
      workflow.description,
      workflow.problem_solved,
      workflow.category,
      workflow.audience,
      workflow.platform_tested_on,
      workflow.difficulty,
      workflow.category_risk,
      workflow.context_setup,
      workflow.example_input,
      workflow.example_output,
      workflow.learning_safe_mode,
      workflow.freshness_status,
      ...steps.flatMap((step) => [
        step.title,
        step.guidance ?? "",
        step.prompt,
        step.example_output ?? "",
      ]),
      ...checks.flatMap((check) => [
        check.label,
        check.description ?? "",
      ]),
    ].join(" "),
  };
}

async function getWorkflowChildren(workflowIds: string[]) {
  const supabase = createServerSupabaseClient();

  if (!supabase || workflowIds.length === 0) {
    return { checks: [], steps: [] };
  }

  const [stepsResult, checksResult] = await Promise.all([
    supabase
      .from("workflow_steps")
      .select("id, workflow_id, step_number, title, prompt, guidance, example_output")
      .in("workflow_id", workflowIds)
      .order("step_number", { ascending: true }),
    supabase
      .from("workflow_quality_checks")
      .select("id, workflow_id, position, label, description")
      .in("workflow_id", workflowIds)
      .order("position", { ascending: true }),
  ]);

  if (stepsResult.error) {
    throw new Error("Unable to load workflow steps");
  }

  if (checksResult.error) {
    throw new Error("Unable to load workflow quality checks");
  }

  return {
    checks: (checksResult.data ?? []) as WorkflowQualityCheckRow[],
    steps: (stepsResult.data ?? []) as WorkflowStepRow[],
  };
}

export async function getApprovedWorkflows() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return sampleWorkflows;
  }

  try {
    const { data, error } = await supabase
      .from("workflows")
      .select(
        "id, title, slug, description, problem_solved, category, audience, platform_tested_on, difficulty, category_risk, context_setup, example_input, example_output, learning_safe_mode, freshness_status, last_verified_at, is_verified, status",
      )
      .eq("status", "approved")
      .order("title", { ascending: true });

    if (error) {
      warnAndFallback("Unable to load approved workflows");
      return sampleWorkflows;
    }

    const workflows = (data ?? []) as WorkflowRow[];
    const { checks, steps } = await getWorkflowChildren(
      workflows.map((workflow) => workflow.id),
    );

    return workflows.map((workflow) =>
      mapWorkflow(
        workflow,
        steps.filter((step) => step.workflow_id === workflow.id),
        checks.filter((check) => check.workflow_id === workflow.id),
      ),
    );
  } catch {
    warnAndFallback("Unable to load workflow records");
    return sampleWorkflows;
  }
}

export async function getApprovedWorkflowBySlug(slug: string) {
  const supabase = createServerSupabaseClient();
  const fallbackWorkflow = sampleWorkflows.find(
    (workflow) => workflow.slug === slug,
  );

  if (!supabase) {
    return fallbackWorkflow ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("workflows")
      .select(
        "id, title, slug, description, problem_solved, category, audience, platform_tested_on, difficulty, category_risk, context_setup, example_input, example_output, learning_safe_mode, freshness_status, last_verified_at, is_verified, status",
      )
      .eq("status", "approved")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      warnAndFallback(`Unable to load workflow "${slug}"`);
      return fallbackWorkflow ?? null;
    }

    if (!data) {
      return null;
    }

    const workflow = data as WorkflowRow;
    const { checks, steps } = await getWorkflowChildren([workflow.id]);

    return mapWorkflow(workflow, steps, checks);
  } catch {
    warnAndFallback(`Unable to load workflow "${slug}"`);
    return fallbackWorkflow ?? null;
  }
}
