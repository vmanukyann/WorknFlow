import {
  categoryRiskOptions,
  difficultyOptions,
  freshnessStatusOptions,
  learningSafeModeOptions,
  workflowStatusOptions,
  type AdminWorkflow,
} from "@/lib/admin/types";

import { AdminNotice } from "./AdminNotice";

type WorkflowFormProps = {
  action: (formData: FormData) => Promise<void>;
  error?: string;
  mode: "create" | "edit";
  success?: string;
  workflow?: AdminWorkflow;
};

function inputClassName() {
  return "mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15";
}

function textareaClassName() {
  return `${inputClassName()} min-h-28`;
}

function labelFor(value: string) {
  return value.replaceAll("-", " ");
}

function TextField({
  label,
  name,
  required = true,
  value,
}: {
  label: string;
  name: string;
  required?: boolean;
  value?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <input
        className={inputClassName()}
        defaultValue={value ?? ""}
        name={name}
        required={required}
        type="text"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value?: string | null;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <textarea
        className={textareaClassName()}
        defaultValue={value ?? ""}
        name={name}
        required
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <select className={inputClassName()} defaultValue={value} name={name}>
        {options.map((option) => (
          <option key={option} value={option}>
            {labelFor(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

export function WorkflowForm({
  action,
  error,
  mode,
  success,
  workflow,
}: WorkflowFormProps) {
  return (
    <form action={action} className="space-y-6">
      <AdminNotice error={error} success={success} />
      {workflow ? <input name="id" type="hidden" value={workflow.id} /> : null}
      {mode === "create" ? <input name="status" type="hidden" value="draft" /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Title" name="title" value={workflow?.title} />
        <TextField label="Slug" name="slug" value={workflow?.slug} />
        <TextField label="Category" name="category" value={workflow?.category} />
        <TextField label="Audience" name="audience" value={workflow?.audience} />
        <TextField
          label="Platform tested on"
          name="platform_tested_on"
          value={workflow?.platform_tested_on}
        />
        <SelectField
          label="Difficulty"
          name="difficulty"
          options={difficultyOptions}
          value={workflow?.difficulty ?? "beginner"}
        />
        <SelectField
          label="Category risk"
          name="category_risk"
          options={categoryRiskOptions}
          value={workflow?.category_risk ?? "low"}
        />
        <SelectField
          label="Learning safe mode"
          name="learning_safe_mode"
          options={learningSafeModeOptions}
          value={workflow?.learning_safe_mode ?? "learning-safe"}
        />
        <SelectField
          label="Freshness status"
          name="freshness_status"
          options={freshnessStatusOptions}
          value={workflow?.freshness_status ?? "current"}
        />
        {mode === "edit" ? (
          <SelectField
            label="Status"
            name="status"
            options={workflowStatusOptions}
            value={workflow?.status ?? "draft"}
          />
        ) : null}
      </div>

      <TextAreaField
        label="Description"
        name="description"
        value={workflow?.description}
      />
      <TextAreaField
        label="Problem solved"
        name="problem_solved"
        value={workflow?.problem_solved}
      />
      <TextAreaField
        label="Context setup"
        name="context_setup"
        value={workflow?.context_setup}
      />
      <TextAreaField
        label="Example input"
        name="example_input"
        value={workflow?.example_input}
      />
      <TextAreaField
        label="Example output"
        name="example_output"
        value={workflow?.example_output}
      />

      <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
        <input
          className="h-4 w-4 rounded border-zinc-300 text-teal-800"
          defaultChecked={workflow?.is_verified ?? false}
          name="is_verified"
          type="checkbox"
        />
        Verified
      </label>

      <button
        className="inline-flex items-center justify-center rounded-md border border-teal-800 bg-teal-800 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        type="submit"
      >
        {mode === "create" ? "Create draft workflow" : "Save workflow"}
      </button>
    </form>
  );
}
