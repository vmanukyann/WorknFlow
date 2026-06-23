"use client";

import { Input } from "@/components/ui/Input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search planning, coding, debugging, review...",
}: SearchBarProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">
        Search workflows
      </span>
      <Input
        className="mt-2"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </label>
  );
}
