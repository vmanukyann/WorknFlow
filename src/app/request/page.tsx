import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function RequestPage() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            description="Describe the runbook you wish existed. This is static UI only in this phase; submissions will be connected later."
            eyebrow="Request a workflow"
            title="What do you wish WorknFlow had?"
          />
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="p-6">
          <form className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                What are you trying to do?
              </span>
              <Input
                className="mt-2"
                placeholder="Example: turn lab notes into practice questions"
                type="text"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Category</span>
              <Input
                className="mt-2"
                placeholder="Studying, writing, STEM, coding, project planning..."
                type="text"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                What platform do you use?
              </span>
              <Input
                className="mt-2"
                placeholder="ChatGPT, Claude, Gemini, another tool..."
                type="text"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Extra context</span>
              <Textarea
                className="mt-2"
                placeholder="What should the workflow avoid? What would a good result include?"
              />
            </label>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm leading-6 text-zinc-600">
                Submissions are not connected yet. This form is a static preview
                for the hardcoded UI phase.
              </p>
            </div>
            <Button disabled type="submit">
              Submit later
            </Button>
          </form>
        </Card>
      </section>
    </PageShell>
  );
}
