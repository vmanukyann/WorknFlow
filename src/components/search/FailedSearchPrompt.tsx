import { EmptyState } from "@/components/ui/EmptyState";

type FailedSearchPromptProps = {
  query: string;
};

export function FailedSearchPrompt({ query }: FailedSearchPromptProps) {
  return (
    <EmptyState
      actionHref={`/request${query ? `?q=${encodeURIComponent(query)}` : ""}`}
      actionLabel="Request this workflow"
      description="The hardcoded library is intentionally small right now. Request the workflow you needed and it can be considered when submissions are wired up later."
      title="No matching workflows yet"
    />
  );
}
