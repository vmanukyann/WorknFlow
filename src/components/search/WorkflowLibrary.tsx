"use client";

import { useMemo, useState } from "react";

import { FailedSearchPrompt } from "@/components/search/FailedSearchPrompt";
import { SearchBar } from "@/components/search/SearchBar";
import { WorkflowFilters } from "@/components/search/WorkflowFilters";
import { WorkflowGrid } from "@/components/workflow/WorkflowGrid";
import type { Difficulty, FreshnessStatus, Workflow } from "@/types/workflow";

type WorkflowLibraryProps = {
  workflows: Workflow[];
};

export function WorkflowLibrary({ workflows }: WorkflowLibraryProps) {
  const [query, setQuery] = useState("");
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
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_2fr]">
          <SearchBar
            onChange={setQuery}
            placeholder="Try study, writing, builder, freshness..."
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
