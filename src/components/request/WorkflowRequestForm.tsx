"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type RequestSource = "request_form" | "failed_search";

type WorkflowRequestFormProps = {
  initialQuery?: string;
  initialSource?: RequestSource;
};

type SubmissionState = "idle" | "submitting" | "success" | "error" | "local";

function optionalValue(value: FormDataEntryValue | null) {
  const trimmed = String(value ?? "").trim();
  return trimmed || null;
}

export function WorkflowRequestForm({
  initialQuery = "",
  initialSource = "request_form",
}: WorkflowRequestFormProps) {
  const [state, setState] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setState("local");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("query") ?? "").trim();

    if (!query) {
      setState("error");
      return;
    }

    setState("submitting");

    const { error } = await supabase.from("workflow_requests").insert({
      category_guess: optionalValue(formData.get("category_guess")),
      extra_context: optionalValue(formData.get("extra_context")),
      platform: optionalValue(formData.get("platform")),
      query,
      source: initialSource,
      status: "new",
    });

    if (error) {
      setState("error");
      return;
    }

    event.currentTarget.reset();
    setState("success");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {initialSource === "failed_search" ? (
        <p className="text-sm font-medium text-teal-800">
          Requesting a workflow for your search.
        </p>
      ) : null}
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">
          What are you trying to do?
        </span>
        <Input
          className="mt-2"
          defaultValue={initialQuery}
          name="query"
          placeholder="Example: turn lab notes into practice questions"
          required
          type="text"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Category</span>
        <Input
          className="mt-2"
          name="category_guess"
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
          name="platform"
          placeholder="ChatGPT, Claude, Gemini, another tool..."
          type="text"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Extra context</span>
        <Textarea
          className="mt-2"
          name="extra_context"
          placeholder="What should the workflow avoid? What would a good result include?"
        />
      </label>
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm leading-6 text-zinc-600">
          Share the workflow you need. WorknFlow stores only this request text so
          future workflows can be prioritized.
        </p>
      </div>
      <Button disabled={state === "submitting"} type="submit">
        {state === "submitting" ? "Submitting..." : "Submit request"}
      </Button>
      {state === "success" ? (
        <p className="text-sm font-medium text-teal-800">
          Thanks. Your workflow request was submitted.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="text-sm font-medium text-red-700">
          Something went wrong. Please check the required field and try again.
        </p>
      ) : null}
      {state === "local" ? (
        <p className="text-sm font-medium text-zinc-700">
          Supabase is not configured locally yet, so this request was not sent.
        </p>
      ) : null}
    </form>
  );
}
