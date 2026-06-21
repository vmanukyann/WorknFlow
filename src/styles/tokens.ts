import type {
  CategoryRisk,
  Difficulty,
  FreshnessStatus,
  LearningSafeMode,
} from "@/types/workflow";

export type StatusToken = {
  label: string;
  className: string;
};

export const freshnessTokens: Record<FreshnessStatus, StatusToken> = {
  current: {
    label: "Current",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  "needs-review": {
    label: "Needs review",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  stale: {
    label: "Stale",
    className: "border-orange-200 bg-orange-50 text-orange-800",
  },
  broken: {
    label: "Broken",
    className: "border-red-200 bg-red-50 text-red-800",
  },
};

export const learningSafeTokens: Record<LearningSafeMode, StatusToken> = {
  "learning-safe": {
    label: "Learning-safe",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  "needs-caution": {
    label: "Needs caution",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  "not-allowed": {
    label: "Not allowed",
    className: "border-red-200 bg-red-50 text-red-800",
  },
};

export const difficultyTokens: Record<Difficulty, StatusToken> = {
  beginner: {
    label: "Beginner",
    className: "border-sky-200 bg-sky-50 text-sky-800",
  },
  intermediate: {
    label: "Intermediate",
    className: "border-violet-200 bg-violet-50 text-violet-800",
  },
  advanced: {
    label: "Advanced",
    className: "border-zinc-300 bg-zinc-100 text-zinc-800",
  },
};

export const categoryRiskTokens: Record<CategoryRisk, StatusToken> = {
  low: {
    label: "Low risk",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  medium: {
    label: "Medium risk",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  high: {
    label: "High risk",
    className: "border-red-200 bg-red-50 text-red-800",
  },
};
