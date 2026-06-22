"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type FeedbackRating = "worked" | "did-not-work";

type WorkflowFeedbackProps = {
  workflowId: string;
};

type FeedbackState = "idle" | "submitting" | "success" | "error" | "local";

const feedbackRatings = ["worked", "did-not-work"] as const;

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isFeedbackRating(rating: string): rating is FeedbackRating {
  return feedbackRatings.includes(rating as FeedbackRating);
}

export function WorkflowFeedback({ workflowId }: WorkflowFeedbackProps) {
  const [state, setState] = useState<FeedbackState>("idle");

  async function submitFeedback(rating: string) {
    if (!isFeedbackRating(rating)) {
      setState("error");
      return;
    }

    if (!uuidPattern.test(workflowId)) {
      setState("local");
      return;
    }

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setState("local");
      return;
    }

    setState("submitting");

    const { error } = await supabase.from("workflow_feedback").insert({
      rating,
      workflow_id: workflowId,
    });

    setState(error ? "error" : "success");
  }

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-zinc-950">Did this run work?</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Share whether this verified workflow helped. Feedback is only submitted
        for live Supabase workflow records.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button
          disabled={state === "submitting"}
          onClick={() => submitFeedback("worked")}
          variant="secondary"
        >
          Worked for me
        </Button>
        <Button
          disabled={state === "submitting"}
          onClick={() => submitFeedback("did-not-work")}
          variant="secondary"
        >
          Did not work
        </Button>
      </div>
      {state === "success" ? (
        <p className="mt-4 text-sm font-medium text-teal-800">
          Thanks. Your feedback was submitted.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="mt-4 text-sm font-medium text-red-700">
          Feedback could not be submitted. Please try again later.
        </p>
      ) : null}
      {state === "local" ? (
        <p className="mt-4 text-sm font-medium text-zinc-700">
          Feedback is disabled for local fallback workflows until Supabase is
          configured.
        </p>
      ) : null}
    </Card>
  );
}
