import {
  createWorkflowQualityCheckAction,
  createWorkflowStepAction,
  deleteWorkflowQualityCheckAction,
  deleteWorkflowStepAction,
  updateWorkflowQualityCheckAction,
  updateWorkflowStepAction,
} from "@/lib/admin/actions";
import type { AdminWorkflow, WorkflowChildren } from "@/lib/admin/types";

type WorkflowChildEditorsProps = {
  childrenRecords: WorkflowChildren;
  checksSuccess?: string;
  stepsSuccess?: string;
  workflow: AdminWorkflow;
};

function inputClassName() {
  return "mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15";
}

function textareaClassName() {
  return `${inputClassName()} min-h-24`;
}

function saveButtonClassName() {
  return "inline-flex items-center justify-center rounded-md border border-teal-800 bg-teal-800 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";
}

function secondaryButtonClassName() {
  return "inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500";
}

function nextPosition(items: { step_number?: number; position?: number }[]) {
  const maxPosition = items.reduce((highest, item) => {
    const value = item.step_number ?? item.position ?? 0;

    return value > highest ? value : highest;
  }, 0);

  return maxPosition + 1;
}

function WorkflowHiddenFields({ workflow }: { workflow: AdminWorkflow }) {
  return (
    <>
      <input name="workflow_id" type="hidden" value={workflow.id} />
      <input name="workflow_slug" type="hidden" value={workflow.slug} />
    </>
  );
}

export function WorkflowChildEditors({
  checksSuccess,
  childrenRecords,
  stepsSuccess,
  workflow,
}: WorkflowChildEditorsProps) {
  const nextStepNumber = nextPosition(childrenRecords.steps);
  const nextCheckPosition = nextPosition(childrenRecords.checks);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Prompt steps</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Add, edit, delete, and reorder workflow prompt steps.
            </p>
          </div>
          {stepsSuccess ? (
            <p className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-medium text-teal-800">
              {stepsSuccess}
            </p>
          ) : null}
        </div>

        <form action={createWorkflowStepAction} className="mt-5 grid gap-4 rounded-lg border border-zinc-100 bg-zinc-50 p-4">
          <WorkflowHiddenFields workflow={workflow} />
          <h3 className="text-sm font-semibold text-zinc-950">Add step</h3>
          <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Number</span>
              <input
                className={inputClassName()}
                defaultValue={nextStepNumber}
                min={1}
                name="step_number"
                required
                type="number"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Title</span>
              <input className={inputClassName()} name="title" required type="text" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Guidance</span>
            <textarea className={textareaClassName()} name="guidance" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Prompt</span>
            <textarea className={textareaClassName()} name="prompt" required />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Example output</span>
            <textarea className={textareaClassName()} name="example_output" />
          </label>
          <div>
            <button className={saveButtonClassName()} type="submit">
              Add step
            </button>
          </div>
        </form>

        <div className="mt-5 space-y-4">
          {childrenRecords.steps.map((step) => (
            <div className="rounded-lg border border-zinc-200 p-4" key={step.id}>
              <form action={updateWorkflowStepAction} className="grid gap-4">
                <WorkflowHiddenFields workflow={workflow} />
                <input name="id" type="hidden" value={step.id} />
                <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-700">Number</span>
                    <input
                      className={inputClassName()}
                      defaultValue={step.step_number}
                      min={1}
                      name="step_number"
                      required
                      type="number"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-700">Title</span>
                    <input
                      className={inputClassName()}
                      defaultValue={step.title}
                      name="title"
                      required
                      type="text"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">Guidance</span>
                  <textarea
                    className={textareaClassName()}
                    defaultValue={step.guidance ?? ""}
                    name="guidance"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">Prompt</span>
                  <textarea
                    className={textareaClassName()}
                    defaultValue={step.prompt}
                    name="prompt"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">
                    Example output
                  </span>
                  <textarea
                    className={textareaClassName()}
                    defaultValue={step.example_output ?? ""}
                    name="example_output"
                  />
                </label>
                <div>
                  <button className={saveButtonClassName()} type="submit">
                    Save step
                  </button>
                </div>
              </form>
              <form action={deleteWorkflowStepAction} className="mt-3">
                <WorkflowHiddenFields workflow={workflow} />
                <input name="id" type="hidden" value={step.id} />
                <button className={secondaryButtonClassName()} type="submit">
                  Delete step
                </button>
              </form>
            </div>
          ))}
          {childrenRecords.steps.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-200 p-4 text-sm text-zinc-600">
              No prompt steps yet.
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">
              Quality checklist
            </h2>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Manage the quality checks shown on the public workflow page.
            </p>
          </div>
          {checksSuccess ? (
            <p className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-medium text-teal-800">
              {checksSuccess}
            </p>
          ) : null}
        </div>

        <form action={createWorkflowQualityCheckAction} className="mt-5 grid gap-4 rounded-lg border border-zinc-100 bg-zinc-50 p-4">
          <WorkflowHiddenFields workflow={workflow} />
          <h3 className="text-sm font-semibold text-zinc-950">Add quality check</h3>
          <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Position</span>
              <input
                className={inputClassName()}
                defaultValue={nextCheckPosition}
                min={1}
                name="position"
                required
                type="number"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Label</span>
              <input className={inputClassName()} name="label" required type="text" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">Description</span>
            <textarea className={textareaClassName()} name="description" />
          </label>
          <div>
            <button className={saveButtonClassName()} type="submit">
              Add quality check
            </button>
          </div>
        </form>

        <div className="mt-5 space-y-4">
          {childrenRecords.checks.map((check) => (
            <div className="rounded-lg border border-zinc-200 p-4" key={check.id}>
              <form action={updateWorkflowQualityCheckAction} className="grid gap-4">
                <WorkflowHiddenFields workflow={workflow} />
                <input name="id" type="hidden" value={check.id} />
                <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-700">
                      Position
                    </span>
                    <input
                      className={inputClassName()}
                      defaultValue={check.position}
                      min={1}
                      name="position"
                      required
                      type="number"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-zinc-700">Label</span>
                    <input
                      className={inputClassName()}
                      defaultValue={check.label}
                      name="label"
                      required
                      type="text"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">
                    Description
                  </span>
                  <textarea
                    className={textareaClassName()}
                    defaultValue={check.description ?? ""}
                    name="description"
                  />
                </label>
                <div>
                  <button className={saveButtonClassName()} type="submit">
                    Save quality check
                  </button>
                </div>
              </form>
              <form action={deleteWorkflowQualityCheckAction} className="mt-3">
                <WorkflowHiddenFields workflow={workflow} />
                <input name="id" type="hidden" value={check.id} />
                <button className={secondaryButtonClassName()} type="submit">
                  Delete quality check
                </button>
              </form>
            </div>
          ))}
          {childrenRecords.checks.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-200 p-4 text-sm text-zinc-600">
              No quality checklist items yet.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
