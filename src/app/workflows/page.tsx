import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { WorkflowLibrary } from "@/components/search/WorkflowLibrary";
import { sampleWorkflows } from "@/data/sampleWorkflows";

export default function WorkflowsPage() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader
            description="Search the current hardcoded workflows by task, category, audience, and context. No database or AI search is used in this phase."
            eyebrow="Workflow library"
            title="Find a workflow you can inspect before using"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <WorkflowLibrary workflows={sampleWorkflows} />
      </section>
    </PageShell>
  );
}
