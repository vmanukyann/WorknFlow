import { Card } from "@/components/ui/Card";

type QualityChecklistProps = {
  items: string[];
};

export function QualityChecklist({ items }: QualityChecklistProps) {
  return (
    <Card className="p-5">
      <h2 className="text-xl font-semibold text-zinc-950">Quality checklist</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-zinc-700" key={item}>
            <span
              aria-hidden="true"
              className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-800"
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
