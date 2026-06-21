export type LearningSafeMode =
  | "learning-safe"
  | "needs-caution"
  | "not-allowed";

export type FreshnessStatus = "current" | "needs-review" | "stale" | "broken";

export type CategoryRisk = "low" | "medium" | "high";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type WorkflowStatus = "draft" | "approved" | "hidden" | "archived";

export type Audience = "student" | "tutor" | "builder" | "general";

export type WorkflowStep = {
  id: string;
  stepNumber: number;
  title: string;
  goal: string;
  promptText: string;
  exampleOutput?: string;
};

export type Workflow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  problemSolved: string;
  category: string;
  audience: Audience;
  platformTestedOn: string;
  difficulty: Difficulty;
  categoryRisk: CategoryRisk;
  contextSetup: string;
  exampleInput: string;
  exampleOutput: string;
  learningSafeMode: LearningSafeMode;
  freshnessStatus: FreshnessStatus;
  lastVerifiedAt: string;
  isVerified: boolean;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  qualityChecklist: string[];
};
