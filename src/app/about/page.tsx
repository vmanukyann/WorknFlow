import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card } from "@/components/ui/Card";

const trustSections = [
  {
    title: "Not a prompt dump",
    description:
      "Each workflow includes the setup context, prompt sequence, expected output, verification status, and a quality checklist. The goal is to make the method visible.",
  },
  {
    title: "Verification matters",
    description:
      "A workflow can sound polished and still fail. WorknFlow records whether a workflow has been manually checked and when it was last verified.",
  },
  {
    title: "Freshness matters",
    description:
      "Some tasks age faster than others. Study and writing workflows may stay useful longer, while tool or coding workflows need more frequent review.",
  },
  {
    title: "Learning-safe by design",
    description:
      "Workflows are labeled for academic integrity. They should help people learn, plan, explain, and revise instead of replacing their thinking.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            description="WorknFlow is a small, manually verified library of AI workflows. It is built around evidence: what context to provide, which prompt steps to run, what output to expect, and how to judge quality."
            eyebrow="Trust"
            title="Workflows should be clear enough to evaluate"
          />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {trustSections.map((section) => (
            <Card className="p-6" key={section.title}>
              <h2 className="text-xl font-semibold text-zinc-950">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {section.description}
              </p>
            </Card>
          ))}
        </div>
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold text-zinc-950">
            Current MVP approach
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            In this phase, every workflow is hardcoded sample data. There is no
            Supabase connection, no auth, no payments, no extension, and no AI
            API call. Workflows are manually written and manually verified.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
