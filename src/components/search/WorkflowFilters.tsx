"use client";

type FilterKey =
  | "audience"
  | "category"
  | "difficulty"
  | "freshness"
  | "platform"
  | "safety";

type FilterValues = Record<FilterKey, string>;

type WorkflowFiltersProps = {
  audiences: string[];
  categories: string[];
  difficulties: string[];
  filters: FilterValues;
  freshnessOptions: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onFilterChange: (key: FilterKey, value: string) => void;
  platforms: string[];
  safetyOptions: string[];
};

function label(value: string) {
  return value
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

const filterHelp: Record<FilterKey, string> = {
  audience: "Who the workflow is written for.",
  category: "The kind of task or problem.",
  difficulty: "How much setup or judgment it needs.",
  freshness: "How recently it should be trusted.",
  platform: "Where the workflow was tested.",
  safety: "Whether it supports learning-safe use.",
};

function FilterSelect({
  labelText,
  name,
  onChange,
  options,
  value,
}: {
  labelText: string;
  name: FilterKey;
  onChange: (key: FilterKey, value: string) => void;
  options: string[];
  value: string;
}) {
  const helpId = `${name}-filter-help`;

  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{labelText}</span>
      <select
        aria-describedby={helpId}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
        onChange={(event) => onChange(name, event.target.value)}
        value={value}
      >
        <option value="all">All {labelText.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {label(option)}
          </option>
        ))}
      </select>
      <span className="mt-1 block text-xs leading-5 text-zinc-500" id={helpId}>
        {filterHelp[name]}
      </span>
    </label>
  );
}

export function WorkflowFilters({
  audiences,
  categories,
  difficulties,
  filters,
  freshnessOptions,
  hasActiveFilters,
  onClearFilters,
  onFilterChange,
  platforms,
  safetyOptions,
}: WorkflowFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-950">
            Filter by trust signals
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Narrow the library without changing how search works.
          </p>
        </div>
        {hasActiveFilters ? (
          <button
            className="text-left text-sm font-semibold text-teal-800 hover:text-teal-900"
            onClick={onClearFilters}
            type="button"
          >
            Clear search and filters
          </button>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FilterSelect
          labelText="Category"
          name="category"
          onChange={onFilterChange}
          options={categories}
          value={filters.category}
        />
        <FilterSelect
          labelText="Audience"
          name="audience"
          onChange={onFilterChange}
          options={audiences}
          value={filters.audience}
        />
        <FilterSelect
          labelText="Difficulty"
          name="difficulty"
          onChange={onFilterChange}
          options={difficulties}
          value={filters.difficulty}
        />
        <FilterSelect
          labelText="Freshness"
          name="freshness"
          onChange={onFilterChange}
          options={freshnessOptions}
          value={filters.freshness}
        />
        <FilterSelect
          labelText="Safety"
          name="safety"
          onChange={onFilterChange}
          options={safetyOptions}
          value={filters.safety}
        />
        <FilterSelect
          labelText="Platform"
          name="platform"
          onChange={onFilterChange}
          options={platforms}
          value={filters.platform}
        />
      </div>
    </div>
  );
}
