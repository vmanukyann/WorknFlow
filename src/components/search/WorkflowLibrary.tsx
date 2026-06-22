"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SearchBar } from "@/components/search/SearchBar";
import { WorkflowFilters } from "@/components/search/WorkflowFilters";
import { EmptyState } from "@/components/ui/EmptyState";
import { WorkflowGrid } from "@/components/workflow/WorkflowGrid";
import type { SearchableWorkflow } from "@/lib/workflows/queries";

type Filters = {
  audience: string;
  category: string;
  difficulty: string;
  freshness: string;
  platform: string;
  safety: string;
};

type InitialFilters = Filters & {
  search: string;
};

type WorkflowLibraryProps = {
  initialFilters?: InitialFilters;
  workflows: SearchableWorkflow[];
};

const defaultFilters: Filters = {
  audience: "all",
  category: "all",
  difficulty: "all",
  freshness: "all",
  platform: "all",
  safety: "all",
};

function uniqueOptions(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
}

function normalizeInitialFilter(value: string | undefined, options: string[]) {
  return value && options.includes(value) ? value : "all";
}

function buildWorkflowSearchText(workflow: SearchableWorkflow) {
  return (
    workflow.searchText ??
    [
      workflow.title,
      workflow.description,
      workflow.problemSolved,
      workflow.category,
      workflow.audience,
      workflow.platformTestedOn,
      workflow.difficulty,
      workflow.categoryRisk,
      workflow.contextSetup,
      workflow.exampleInput,
      workflow.exampleOutput,
      workflow.learningSafeMode,
      workflow.freshnessStatus,
      workflow.lastVerifiedAt,
      ...workflow.steps.flatMap((step) => [
        step.title,
        step.goal,
        step.promptText,
        step.exampleOutput ?? "",
      ]),
      ...workflow.qualityChecklist,
    ].join(" ")
  );
}

export function WorkflowLibrary({
  initialFilters,
  workflows,
}: WorkflowLibraryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = useMemo(
    () => uniqueOptions(workflows.map((workflow) => workflow.category)),
    [workflows],
  );
  const audiences = useMemo(
    () => uniqueOptions(workflows.map((workflow) => workflow.audience)),
    [workflows],
  );
  const difficulties = useMemo(
    () => uniqueOptions(workflows.map((workflow) => workflow.difficulty)),
    [workflows],
  );
  const freshnessOptions = useMemo(
    () => uniqueOptions(workflows.map((workflow) => workflow.freshnessStatus)),
    [workflows],
  );
  const safetyOptions = useMemo(
    () => uniqueOptions(workflows.map((workflow) => workflow.learningSafeMode)),
    [workflows],
  );
  const platforms = useMemo(
    () => uniqueOptions(workflows.map((workflow) => workflow.platformTestedOn)),
    [workflows],
  );

  const [query, setQuery] = useState(initialFilters?.search ?? "");
  const [filters, setFilters] = useState<Filters>(() => ({
    audience: normalizeInitialFilter(initialFilters?.audience, audiences),
    category: normalizeInitialFilter(initialFilters?.category, categories),
    difficulty: normalizeInitialFilter(initialFilters?.difficulty, difficulties),
    freshness: normalizeInitialFilter(initialFilters?.freshness, freshnessOptions),
    platform: normalizeInitialFilter(initialFilters?.platform, platforms),
    safety: normalizeInitialFilter(initialFilters?.safety, safetyOptions),
  }));

  const hasActiveFilters = Object.values(filters).some((value) => value !== "all");

  useEffect(() => {
    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      params.set("search", trimmedQuery);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value === "all") {
        return;
      }

      const paramKey = key === "safety" ? "safety" : key;
      params.set(paramKey, value);
    });

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    const currentUrl = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [filters, pathname, query, router, searchParams]);

  const filteredWorkflows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return workflows.filter((workflow) => {
      const matchesQuery =
        !normalizedQuery ||
        buildWorkflowSearchText(workflow).toLowerCase().includes(normalizedQuery);

      return (
        matchesQuery &&
        (filters.category === "all" || workflow.category === filters.category) &&
        (filters.audience === "all" || workflow.audience === filters.audience) &&
        (filters.difficulty === "all" ||
          workflow.difficulty === filters.difficulty) &&
        (filters.freshness === "all" ||
          workflow.freshnessStatus === filters.freshness) &&
        (filters.safety === "all" ||
          workflow.learningSafeMode === filters.safety) &&
        (filters.platform === "all" ||
          workflow.platformTestedOn === filters.platform)
      );
    });
  }, [filters, query, workflows]);

  const trimmedQuery = query.trim();

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function clearFilters() {
    setQuery("");
    setFilters(defaultFilters);
  }

  if (workflows.length === 0) {
    return (
      <EmptyState
        description="Check back after the first workflows are reviewed and approved."
        title="No workflows are available yet."
      />
    );
  }

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
        <div className="grid gap-5 p-4 sm:p-5">
          <SearchBar
            onChange={setQuery}
            placeholder="Try notes, essay, app idea..."
            value={query}
          />
          <WorkflowFilters
            audiences={audiences}
            categories={categories}
            difficulties={difficulties}
            filters={filters}
            freshnessOptions={freshnessOptions}
            hasActiveFilters={hasActiveFilters || Boolean(trimmedQuery)}
            onClearFilters={clearFilters}
            onFilterChange={updateFilter}
            platforms={platforms}
            safetyOptions={safetyOptions}
          />
        </div>
      </div>
      {filteredWorkflows.length > 0 ? (
        <WorkflowGrid workflows={filteredWorkflows} />
      ) : trimmedQuery ? (
        <EmptyState
          actionHref={`/request?q=${encodeURIComponent(trimmedQuery)}&source=failed_search`}
          actionLabel="Request this workflow"
          description="Request it and I'll consider adding it."
          title="Can't find this workflow?"
        />
      ) : (
        <EmptyState
          actionHref="/workflows"
          actionLabel="Clear filters"
          description="Try a broader category, audience, difficulty, safety, freshness, or platform."
          title="No workflows match these filters."
        />
      )}
    </div>
  );
}
