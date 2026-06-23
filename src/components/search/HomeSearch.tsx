"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function HomeSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/workflows");
      return;
    }

    router.push(`/workflows?search=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <label className="text-sm font-medium text-zinc-700" htmlFor="home-search">
        What workflow do you need?
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Input
          className="h-12 text-base"
          id="home-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Debug an error with context"
          type="search"
          value={query}
        />
        <Button className="h-12 px-5" type="submit">
          Search workflows
        </Button>
      </div>
    </form>
  );
}
