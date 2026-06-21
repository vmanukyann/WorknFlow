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
  placeholder = "Search workflows",
}: SearchBarProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">Search</span>
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
