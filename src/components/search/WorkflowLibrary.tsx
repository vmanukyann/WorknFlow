"use client";

import { useMemo, useState } from "react";

import { FailedSearchPrompt } from "@/components/search/FailedSearchPrompt";
import { SearchBar } from "@/components/search/SearchBar";
import { WorkflowFilters } from "@/components/search/WorkflowFilters";
import { WorkflowGrid } from "@/components/workflow/WorkflowGrid";
import type { Difficulty, FreshnessStatus, Workflow } from "@/types/workflow";

type WorkflowLibraryProps = {
  initialSearch?: string;
  workflows: Workflow[];
};

export function WorkflowLibrary({
  initialSearch = "",
  workflows,
}: WorkflowLibraryProps) {
  const [query, setQuery] = useState(initialSearch);
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");
  const [freshness, setFreshness] = useState<"all" | FreshnessStatus>("all");

  const categories = useMemo(
    () => Array.from(new Set(workflows.map((workflow) => workflow.category))).sort(),
    [workflows],
  );

  const filteredWorkflows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return workflows.filter((workflow) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          workflow.title,
          workflow.description,
          workflow.problemSolved,
          workflow.category,
          workflow.audience,
          workflow.contextSetup,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory =
        category === "all" || workflow.category === category;
      const matchesDifficulty =
        difficulty === "all" || workflow.difficulty === difficulty;
      const matchesFreshness =
        freshness === "all" || workflow.freshnessStatus === freshness;

      return (
        matchesQuery && matchesCategory && matchesDifficulty && matchesFreshness
      );
    });
  }, [category, difficulty, freshness, query, workflows]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(24,24,27,0.04)]">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-zinc-950">Search workflows</p>
            <p className="text-sm text-zinc-500">
              {filteredWorkflows.length} of {workflows.length} workflows shown
            </p>
          </div>
        </div>
        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.15fr_2fr]">
          <SearchBar
            onChange={setQuery}
            placeholder="Try notes, essay, app idea..."
            value={query}
          />
          <WorkflowFilters
            categories={categories}
            category={category}
            difficulty={difficulty}
            freshness={freshness}
            onCategoryChange={setCategory}
            onDifficultyChange={setDifficulty}
            onFreshnessChange={setFreshness}
          />
        </div>
      </div>
      {filteredWorkflows.length > 0 ? (
        <WorkflowGrid workflows={filteredWorkflows} />
      ) : (
        <FailedSearchPrompt query={query} />
      )}
    </div>
  );
}
