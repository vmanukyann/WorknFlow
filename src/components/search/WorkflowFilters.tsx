"use client";

import type { Difficulty, FreshnessStatus } from "@/types/workflow";

type WorkflowFiltersProps = {
  categories: string[];
  category: string;
  difficulty: "all" | Difficulty;
  freshness: "all" | FreshnessStatus;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: "all" | Difficulty) => void;
  onFreshnessChange: (value: "all" | FreshnessStatus) => void;
};

const difficulties: Array<"all" | Difficulty> = [
  "all",
  "beginner",
  "intermediate",
  "advanced",
];

const freshnessOptions: Array<"all" | FreshnessStatus> = [
  "all",
  "current",
  "needs-review",
  "stale",
  "broken",
];

function label(value: string) {
  return value
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function WorkflowFilters({
  categories,
  category,
  difficulty,
  freshness,
  onCategoryChange,
  onDifficultyChange,
  onFreshnessChange,
}: WorkflowFiltersProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Category</span>
        <select
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={category}
        >
          <option value="all">All categories</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Difficulty</span>
        <select
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
          onChange={(event) =>
            onDifficultyChange(event.target.value as "all" | Difficulty)
          }
          value={difficulty}
        >
          {difficulties.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All difficulties" : label(option)}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Freshness</span>
        <select
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
          onChange={(event) =>
            onFreshnessChange(event.target.value as "all" | FreshnessStatus)
          }
          value={freshness}
        >
          {freshnessOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All freshness" : label(option)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
