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
type WorkflowRequestPayload = {
  category_guess: string | null;
  extra_context: string | null;
  platform: string | null;
  query: string;
};
type WorkflowRequestValidation =
  | { data: WorkflowRequestPayload }
  | { error: string };

const QUERY_MIN_LENGTH = 3;
const QUERY_MAX_LENGTH = 240;
const SHORT_TEXT_MAX_LENGTH = 80;
const EXTRA_CONTEXT_MAX_LENGTH = 1200;

function optionalValue(value: FormDataEntryValue | null) {
  const trimmed = String(value ?? "").trim();
  return trimmed || null;
}

function validateWorkflowRequest(formData: FormData): WorkflowRequestValidation {
  const query = String(formData.get("query") ?? "").trim();
  const categoryGuess = optionalValue(formData.get("category_guess"));
  const platform = optionalValue(formData.get("platform"));
  const extraContext = optionalValue(formData.get("extra_context"));

  if (query.length < QUERY_MIN_LENGTH || query.length > QUERY_MAX_LENGTH) {
    return {
      error: `Describe the workflow in ${QUERY_MIN_LENGTH} to ${QUERY_MAX_LENGTH} characters.`,
    };
  }

  if (categoryGuess && categoryGuess.length > SHORT_TEXT_MAX_LENGTH) {
    return {
      error: `Category must be ${SHORT_TEXT_MAX_LENGTH} characters or fewer.`,
    };
  }

  if (platform && platform.length > SHORT_TEXT_MAX_LENGTH) {
    return {
      error: `Platform must be ${SHORT_TEXT_MAX_LENGTH} characters or fewer.`,
    };
  }

  if (extraContext && extraContext.length > EXTRA_CONTEXT_MAX_LENGTH) {
    return {
      error: `Extra context must be ${EXTRA_CONTEXT_MAX_LENGTH} characters or fewer.`,
    };
  }

  return {
    data: {
      category_guess: categoryGuess,
      extra_context: extraContext,
      platform,
      query,
    },
  };
}

export function WorkflowRequestForm({
  initialQuery = "",
  initialSource = "request_form",
}: WorkflowRequestFormProps) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const safeSource: RequestSource =
    initialSource === "failed_search" ? "failed_search" : "request_form";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const validation = validateWorkflowRequest(formData);

    setErrorMessage("");

    if ("error" in validation) {
      setErrorMessage(validation.error);
      setState("error");
      return;
    }

    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setState("local");
      return;
    }

    setState("submitting");

    const { error } = await supabase.from("workflow_requests").insert({
      ...validation.data,
      source: safeSource,
      status: "new",
    });

    if (error) {
      setErrorMessage(
        "Something went wrong. Please check the form and try again.",
      );
      setState("error");
      return;
    }

    form.reset();
    setState("success");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {safeSource === "failed_search" ? (
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
          maxLength={QUERY_MAX_LENGTH}
          minLength={QUERY_MIN_LENGTH}
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
          maxLength={SHORT_TEXT_MAX_LENGTH}
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
          maxLength={SHORT_TEXT_MAX_LENGTH}
          name="platform"
          placeholder="ChatGPT, Claude, Gemini, another tool..."
          type="text"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Extra context</span>
        <Textarea
          className="mt-2"
          maxLength={EXTRA_CONTEXT_MAX_LENGTH}
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
          {errorMessage ||
            "Something went wrong. Please check the form and try again."}
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
