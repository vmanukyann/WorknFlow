"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function WorkflowFeedback() {
  const [feedback, setFeedback] = useState<"worked" | "not-worked" | null>(null);

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-zinc-950">Did this run work?</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Feedback stays local for now. Submission tracking will be connected in a later phase.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => setFeedback("worked")} variant="secondary">
          Worked for me
        </Button>
        <Button onClick={() => setFeedback("not-worked")} variant="secondary">
          Did not work
        </Button>
      </div>
      {feedback ? (
        <p className="mt-4 text-sm font-medium text-teal-800">
          Thanks. This note will become real feedback once the backend is added.
        </p>
      ) : null}
    </Card>
  );
}
