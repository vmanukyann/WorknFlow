import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { WorkflowRequestForm } from "@/components/request/WorkflowRequestForm";
import { Card } from "@/components/ui/Card";

type RequestPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export default async function RequestPage({ searchParams }: RequestPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialQuery = Array.isArray(resolvedSearchParams?.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams?.q;

  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            description="Describe the workflow you wish existed. Requests help decide what should be manually written and verified next."
            eyebrow="Request a workflow"
            title="What do you wish WorknFlow had?"
          />
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="p-6">
          <WorkflowRequestForm initialQuery={initialQuery ?? ""} />
        </Card>
      </section>
    </PageShell>
  );
}
