import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { WorkflowLibrary } from "@/components/search/WorkflowLibrary";
import { sampleWorkflows } from "@/data/sampleWorkflows";

export default function WorkflowsPage() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeader
            description="Search the hardcoded reference library by task, category, audience, and context. Every result is a manually written workflow record with prompts, examples, and checks."
            eyebrow="Workflow library"
            title="A small library of inspectable AI workflows"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <WorkflowLibrary workflows={sampleWorkflows} />
      </section>
    </PageShell>
  );
}
