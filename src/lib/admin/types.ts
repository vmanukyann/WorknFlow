export const difficultyOptions = ["beginner", "intermediate", "advanced"] as const;
export const categoryRiskOptions = ["low", "medium", "high"] as const;
export const learningSafeModeOptions = [
  "learning-safe",
  "needs-caution",
  "not-allowed",
] as const;
export const freshnessStatusOptions = [
  "current",
  "needs-review",
  "stale",
  "broken",
] as const;
export const workflowStatusOptions = [
  "draft",
  "approved",
  "hidden",
  "archived",
] as const;
export const requestStatusOptions = [
  "new",
  "reviewed",
  "planned",
  "created",
  "rejected",
] as const;

export type DifficultyOption = (typeof difficultyOptions)[number];
export type CategoryRiskOption = (typeof categoryRiskOptions)[number];
export type LearningSafeModeOption = (typeof learningSafeModeOptions)[number];
export type FreshnessStatusOption = (typeof freshnessStatusOptions)[number];
export type WorkflowStatusOption = (typeof workflowStatusOptions)[number];
export type RequestStatusOption = (typeof requestStatusOptions)[number];

export type AdminUser = {
  id: string;
  email?: string;
};

export type AdminWorkflow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  problem_solved: string;
  category: string;
  audience: string;
  platform_tested_on: string;
  difficulty: DifficultyOption;
  category_risk: CategoryRiskOption;
  context_setup: string;
  example_input: string;
  example_output: string;
  learning_safe_mode: LearningSafeModeOption;
  freshness_status: FreshnessStatusOption;
  last_verified_at: string | null;
  is_verified: boolean;
  status: WorkflowStatusOption;
  created_at: string;
  updated_at: string;
};

export type AdminRequest = {
  id: string;
  query: string;
  source: "request_form" | "failed_search";
  status: RequestStatusOption;
  created_at: string;
};

export type AdminFeedback = {
  id: string;
  workflow_id: string;
  rating: "worked" | "did-not-work";
  comment: string | null;
  created_at: string;
};

export type WorkflowChildren = {
  steps: {
    id: string;
    step_number: number;
    title: string;
  }[];
  checks: {
    id: string;
    position: number;
    label: string;
  }[];
};
