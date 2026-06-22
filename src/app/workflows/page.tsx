import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { WorkflowLibrary } from "@/components/search/WorkflowLibrary";
import { getApprovedWorkflows } from "@/lib/workflows/queries";

type WorkflowsPageProps = {
  searchParams?: Promise<{
    search?: string | string[];
  }>;
};

export default async function WorkflowsPage({
  searchParams,
}: WorkflowsPageProps) {
  const resolvedSearchParams = await searchParams;
  const search = Array.isArray(resolvedSearchParams?.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams?.search;
  const workflows = await getApprovedWorkflows();

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeader
            description="Search by what you need help doing. Each workflow shows the steps to copy, an example output, and a check before you trust the result."
            title="Find a workflow that matches your task"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <WorkflowLibrary
          initialSearch={search ?? ""}
          key={search ?? ""}
          workflows={workflows}
        />
      </section>
    </PageShell>
  );
}
