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
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{labelText}</span>
      <select
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
      {hasActiveFilters ? (
        <button
          className="text-sm font-semibold text-teal-800 hover:text-teal-900"
          onClick={onClearFilters}
          type="button"
        >
          Clear filters
        </button>
      ) : null}
    </div>
  );
}
