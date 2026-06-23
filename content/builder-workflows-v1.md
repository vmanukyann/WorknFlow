# Builder Workflows V1

Positioning: WorknFlow is a library of tested AI workflows for builders who use AI to plan, code, debug, and ship projects without losing control.

Status note: These are review drafts, not production-tested workflows. Do not seed or publish them as approved until the test log has completed pass records. Default intent for every workflow: `audience: builder`, `status: draft`, `is_verified: false`, `freshness_status: needs-review`, `learning_safe_mode: learning-safe`, `category_risk: high`, `platform_tested_on: Pending manual test with ChatGPT/Codex/Claude`.

## 1. Turn a vague app idea into a build plan

- Slug: `turn-vague-app-idea-into-build-plan`
- Category: Planning
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders often start coding before the user, scope, risks, and smallest useful version are clear.
- Description: Convert a loose project idea into a constrained MVP plan with screens, data, milestones, risks, and non-goals.
- Context setup: Bring the idea, target user, constraints, timeline, current skills/tools, and anything explicitly out of scope.
- Example input: "I want to build a small web app that helps local tutors manage student lesson notes. I have two weekends, know Next.js, and do not want payments or accounts in v1."
- Example output: "MVP: tutor creates student records and lesson notes locally. Screens: student list, student detail, note editor. Data: Student, LessonNote. Non-goals: payments, scheduling, parent portal. Risks: auth and privacy; postpone or mock for v1."
- Use when: You need a buildable first version before asking an AI coding tool to write code.
- Do not use when: You already have approved specs, designs, and implementation tasks.

### Steps

1. **Clarify the product boundary**
   - Guidance: Force the AI to separate known facts from assumptions and non-goals.
   - Copyable prompt: "Act as a practical product planning partner. Turn this app idea into a concise product brief. Separate known facts, assumptions, target user, core problem, MVP outcome, non-goals, constraints, and open questions. Do not add features beyond the constraints.\n\nIdea:\n[idea]\n\nConstraints:\n[time, tools, skill level, must-haves, out-of-scope items]"
   - Example output: "Known: two weekends, Next.js, no payments. Assumption: one tutor uses it alone. MVP outcome: create and view lesson notes. Open question: whether student data can be stored locally."
2. **Define screens and data**
   - Guidance: Convert the brief into minimal screens, objects, fields, and actions.
   - Copyable prompt: "Using the product brief below, create an MVP build plan with screens, data objects, required fields, user actions, and must-have/should-have/later labels. Keep it small enough for the stated constraints.\n\nProduct brief:\n[paste brief]"
   - Example output: "Must-have screen: student list. Object: LessonNote with id, studentId, date, summary, nextSteps. Later: reminders."
3. **Sequence the build**
   - Guidance: Turn the plan into ordered checkpoints before coding.
   - Copyable prompt: "Turn this MVP plan into an implementation sequence. Include milestones, files/modules to start with, demo checkpoints, risks, and decisions to postpone. Output a numbered plan. Do not write code yet.\n\nMVP plan:\n[paste plan]"
   - Example output: "1. Define types and mock data. 2. Build list/detail UI. 3. Add local create/edit. Checkpoint: create a lesson note and reload the page."

### Quality checklist

- Separates facts from assumptions.
- Keeps MVP smaller than the original idea.
- Names screens, data objects, and user actions.
- Includes non-goals and postponed decisions.
- Produces an implementation sequence, not code.

### Failure modes

- Adds auth, payments, or integrations without evidence.
- Produces vague phases like "build backend" without files or checkpoints.
- Treats assumptions as confirmed requirements.

Test notes placeholder: Pending manual tests A and B.

## 2. Turn a feature idea into implementation steps

- Slug: `turn-feature-idea-into-implementation-steps`
- Category: Planning
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders ask for code before defining affected screens, files, states, and acceptance checks.
- Description: Turn one feature idea into a controlled implementation plan an AI coding assistant can follow.
- Context setup: Bring the feature idea, repo stack, likely files, current behavior, desired behavior, constraints, and forbidden changes.
- Example input: "Add a clear-filters button to a workflow library page. Current search and filters are URL-driven. Do not change schema or packages."
- Example output: "Affected areas: filter component, library state, empty states. Steps: confirm current URL params, add button, reset query/filter state, verify URL removal. Acceptance: clear removes params and resets UI."
- Use when: A feature is real but still too vague for direct coding.
- Do not use when: The change is purely cosmetic or already has a detailed issue.

### Steps

1. **Restate the feature as behavior**
   - Guidance: Make the AI describe user-visible behavior and non-goals first.
   - Copyable prompt: "Restate this feature idea as concrete behavior. Include user goal, current behavior, desired behavior, non-goals, and constraints. Do not propose code yet.\n\nFeature idea:\n[feature]\n\nProject context:\n[stack, route, relevant files, constraints]"
   - Example output: "User wants to reset filters. Non-goal: add saved searches. Constraint: keep URL-driven state."
2. **Identify affected areas**
   - Guidance: Ask for likely files and risks, but require uncertainty labels.
   - Copyable prompt: "Based on this behavior brief, list likely affected files/modules, data flow, state changes, edge cases, and risks. Mark anything that must be verified by inspecting the repo.\n\nBehavior brief:\n[paste brief]"
   - Example output: "Likely affected: WorkflowLibrary state, WorkflowFilters props. Verify exact prop names before editing."
3. **Create implementation steps**
   - Guidance: Produce small steps with checks after each one.
   - Copyable prompt: "Create a step-by-step implementation plan for this feature. For each step include purpose, files to inspect/edit, expected result, and verification. Keep changes minimal and do not add packages.\n\nAffected-area notes:\n[paste notes]"
   - Example output: "Step 1 inspect WorkflowLibrary. Step 2 add handler. Step 3 pass to filters. Step 4 verify URL params."

### Quality checklist

- Feature is described as observable behavior.
- Non-goals and forbidden changes are explicit.
- Affected files are marked as likely until inspected.
- Includes acceptance checks.
- Avoids jumping straight to code.

### Failure modes

- Suggests broad refactors.
- Adds new state sources when existing state is enough.
- Ignores URL, loading, empty, or mobile states.

Test notes placeholder: Pending manual tests A and B.

## 3. Create a project spec before asking Codex to code

- Slug: `create-project-spec-before-codex-codes`
- Category: Planning
- Audience: builder
- Difficulty: Intermediate
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: AI coding sessions drift when scope, success criteria, and forbidden changes are not written down.
- Description: Create a compact implementation spec that can be handed to Codex or another AI coding assistant.
- Context setup: Bring the goal, relevant repo facts, allowed files, forbidden files/features, expected behavior, and test commands.
- Example input: "Implement failed-search request tracking only when users submit the request form. Do not auto-log searches."
- Example output: "Spec includes scope, allowed files, URL params, insert payload, local-dev behavior, forbidden changes, tests, and acceptance criteria."
- Use when: You are about to ask an AI coding tool to change a repo.
- Do not use when: You only need brainstorming or product copy.

### Steps

1. **Extract the goal and boundaries**
   - Guidance: Make the AI separate goal, scope, non-goals, and risks.
   - Copyable prompt: "Turn this request into a coding spec outline. Extract goal, success criteria, in-scope files/areas, out-of-scope changes, risks, and required verification. Do not implement.\n\nRequest:\n[paste request]\n\nRepo facts:\n[paste relevant facts]"
   - Example output: "Goal: failed searches become requests only on form submit. Out of scope: background logging, schema changes."
2. **Define interfaces and data flow**
   - Guidance: Force exact inputs, outputs, params, and state changes.
   - Copyable prompt: "Fill in the interface and data-flow section for this spec. Include route params, props, database fields, fallback behavior, and error states. Use only the provided repo facts. Mark unknowns.\n\nSpec outline:\n[paste outline]"
   - Example output: "URL: /request?q=<query>&source=failed_search. Insert source only after submit."
3. **Write acceptance tests**
   - Guidance: Require objective pass/fail checks.
   - Copyable prompt: "Create acceptance criteria and verification commands for this coding spec. Include build/lint, browser/manual checks, and forbidden-change audits.\n\nSpec:\n[paste spec]"
   - Example output: "No automatic inserts from /workflows. Invalid source falls back to request_form."

### Quality checklist

- Includes clear allowed and forbidden changes.
- Defines data flow and external side effects.
- Includes exact verification commands.
- Lists local fallback behavior.
- Is implementable without guessing.

### Failure modes

- Leaves "make it better" language.
- Omits forbidden files or side effects.
- Does not include acceptance checks.

Test notes placeholder: Pending manual tests A and B.

## 4. Review AI-generated code before accepting it

- Slug: `review-ai-generated-code-before-accepting`
- Category: Review
- Audience: builder
- Difficulty: Intermediate
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders accept AI code without checking behavior, scope, security, or maintainability.
- Description: Review a proposed diff for correctness, blast radius, test coverage, and project-rule violations.
- Context setup: Bring the diff, task request, project rules, relevant files, and test output.
- Example input: "AI added a Supabase client and edited package files. The task said no package changes."
- Example output: "Findings: package edits violate scope; service role not present; missing no-env fallback test. Recommendation: revert package edits, keep client helper."
- Use when: An AI coding assistant has produced a diff.
- Do not use when: You need line-by-line style nitpicks before checking correctness.

### Steps

1. **Summarize the intended change**
   - Guidance: Establish what the code was supposed to do.
   - Copyable prompt: "Review this AI-generated change. First summarize the intended behavior and explicit constraints from the task. Do not judge the code yet.\n\nTask:\n[paste task]\n\nProject rules:\n[paste relevant rules]"
   - Example output: "Intent: wire public reads. Constraint: no admin/auth/package changes."
2. **Inspect for risks**
   - Guidance: Ask for severity-ordered findings.
   - Copyable prompt: "Now review the diff against the task and rules. Return findings ordered by severity with file/line references when available. Focus on behavior bugs, security, forbidden scope, missing tests, and data-shape mismatches.\n\nDiff:\n[paste diff]\n\nRelevant files:\n[paste snippets]"
   - Example output: "P1: request insert uses requested_workflow instead of query. P2: missing local fallback message."
3. **Decide accept, revise, or reject**
   - Guidance: Produce a clear decision and minimal fix list.
   - Copyable prompt: "Based on the findings, recommend accept, revise, or reject. Provide the smallest fix list and verification commands. Do not rewrite unrelated code.\n\nFindings:\n[paste findings]"
   - Example output: "Revise. Fix insert field names, rerun lint/build, browser-check request form."

### Quality checklist

- Checks against original task, not personal preference.
- Prioritizes correctness and security over style.
- Calls out forbidden-scope changes.
- Requires verification before accepting.
- Produces a clear accept/revise/reject decision.

### Failure modes

- Rubber-stamps code because it compiles.
- Focuses only on formatting.
- Misses environment, RLS, or secret-handling issues.

Test notes placeholder: Pending manual tests A and B.

## 5. Debug an error message with context

- Slug: `debug-error-message-with-context`
- Category: Debugging
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders paste only an error and get guesses instead of a focused debugging path.
- Description: Turn an error message plus repo/runtime context into likely causes, checks, and a safe fix plan.
- Context setup: Bring the exact error, command run, recent changes, relevant files, environment, and what has already been tried.
- Example input: "Next build says Type 'undefined' is not assignable. Recent change added validation result union."
- Example output: "Likely TypeScript narrowing issue. Inspect validator return type, add explicit union, rerun build."
- Use when: You have a concrete error and need a controlled debugging sequence.
- Do not use when: You want broad architecture advice.

### Steps

1. **Normalize the error report**
   - Guidance: Make the AI capture facts before guessing.
   - Copyable prompt: "Analyze this error report. Extract exact error, command, environment, recent changes, affected files, and unknowns. Do not propose fixes yet.\n\nError:\n[paste error]\n\nContext:\n[paste context]"
   - Example output: "Command: npm run build. File: WorkflowRequestForm.tsx. Unknown: validator return type."
2. **Rank likely causes and checks**
   - Guidance: Ask for tests that can falsify each cause.
   - Copyable prompt: "List the most likely causes ranked by probability. For each cause, include the smallest read-only check or inspection to confirm it. Avoid speculative rewrites.\n\nNormalized report:\n[paste report]"
   - Example output: "Cause 1: TypeScript cannot narrow implicit union. Check function signature."
3. **Create a minimal fix plan**
   - Guidance: Fix only after checks.
   - Copyable prompt: "Create a minimal fix plan for the confirmed cause. Include files to edit, why the fix is safe, and verification commands. Do not suggest unrelated refactors.\n\nConfirmed cause:\n[paste cause]"
   - Example output: "Add explicit WorkflowRequestValidation union. Run lint/build."

### Quality checklist

- Captures command, file, and recent change.
- Separates facts from hypotheses.
- Ranks causes with checks.
- Fix is smaller than a rewrite.
- Includes rerun command.

### Failure modes

- Guesses from the error alone.
- Suggests deleting types or disabling checks.
- Changes unrelated files.

Test notes placeholder: Pending manual tests A and B.

## 6. Ask Codex to inspect before editing

- Slug: `ask-codex-to-inspect-before-editing`
- Category: Control
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders let AI edit before it understands the repo, causing style drift and broken assumptions.
- Description: Use a prompt that forces inspection, plan, and approval before changes.
- Context setup: Bring the task, files to inspect, allowed files, forbidden files, and required tests.
- Example input: "Before editing, inspect workflow request form, request page, and migration. Then explain plan."
- Example output: "Inspection summary, proposed files, risks, no edits yet, approval request."
- Use when: You want an AI coding tool to work safely in an existing repo.
- Do not use when: You need an emergency one-line fix and already know the exact edit.

### Steps

1. **Write the inspection request**
   - Guidance: Make inspection mandatory and bounded.
   - Copyable prompt: "Before editing, inspect these files and summarize what you learn. Do not change files yet.\n\nTask:\n[task]\n\nInspect:\n[file list]\n\nAllowed edits:\n[allowed]\n\nForbidden edits:\n[forbidden]"
   - Example output: "Found request form uses source prop; migration supports failed_search; no schema change needed."
2. **Ask for a plan with risks**
   - Guidance: Require concrete files, behavior, and tests.
   - Copyable prompt: "Based on your inspection, propose a concise implementation plan. Include files to edit, behavior changes, risks, and verification. Do not implement until approved."
   - Example output: "Edit WorkflowLibrary, request page, form. Risk: invalid source handling."
3. **Approve only a narrow implementation**
   - Guidance: Convert approval into explicit boundaries.
   - Copyable prompt: "Approved. Implement only this plan. Do not touch [forbidden files]. After editing, run [commands] and summarize changed files and verification."
   - Example output: "Implementation follows exact file list and tests."

### Quality checklist

- Inspection happens before edits.
- Allowed and forbidden files are explicit.
- Plan names verification steps.
- Approval is narrow.
- Final summary includes files changed.

### Failure modes

- Gives blanket permission.
- Omits forbidden features.
- Lets AI pick broad refactors.

Test notes placeholder: Pending manual tests A and B.

## 7. Turn a messy repo into a file map

- Slug: `turn-messy-repo-into-file-map`
- Category: Understanding
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders waste time or make risky edits because they do not know where behavior lives.
- Description: Ask an AI tool to inspect the repo and produce a practical file map without changing files.
- Context setup: Bring the repo goal, directories, package scripts, route list, and the feature area you care about.
- Example input: "Map WorknFlow public workflow browsing and request submission."
- Example output: "Routes, components, data/query layer, schema, admin areas, test commands, and do-not-touch zones."
- Use when: You are new to a repo or feature area.
- Do not use when: You need the AI to edit immediately.

### Steps

1. **Inventory the repo**
   - Guidance: Use read-only commands and avoid huge dumps.
   - Copyable prompt: "Create a read-only file map for this repo area. Use fast file listing/search first. Do not edit files. Group routes, components, data layer, server actions, schemas, and tests.\n\nFocus area:\n[area]\n\nRepo notes:\n[notes]"
   - Example output: "Public routes: src/app/workflows. Query layer: src/lib/workflows/queries.ts."
2. **Explain data and control flow**
   - Guidance: Convert file list into behavior.
   - Copyable prompt: "Using the file map, explain how data and user actions flow through this area. Include entry points, important props, server/client boundaries, and external services."
   - Example output: "Workflows page calls getApprovedWorkflows, passes results to WorkflowLibrary client component."
3. **Mark safe edit zones**
   - Guidance: Identify what to touch and avoid for future work.
   - Copyable prompt: "Add safe edit zones, risky zones, unknowns, and recommended first files for future changes. Keep this as an orientation document."
   - Example output: "Safe: search components for UI copy. Risky: migrations, admin auth."

### Quality checklist

- Uses read-only inspection.
- Groups files by responsibility.
- Explains flow, not just filenames.
- Flags risky zones.
- Gives recommended next inspection points.

### Failure modes

- Produces an unstructured file dump.
- Misses server/client boundary.
- Suggests edits during mapping.

Test notes placeholder: Pending manual tests A and B.

## 8. Create a safe refactor plan

- Slug: `create-safe-refactor-plan`
- Category: Refactoring
- Audience: builder
- Difficulty: Intermediate
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Refactors become risky when the goal, invariants, and tests are not explicit.
- Description: Convert a refactor idea into a small, staged plan that protects behavior.
- Context setup: Bring current code, reason for refactor, behavior that must not change, tests, and risky files.
- Example input: "Extract repeated admin child editor markup without changing server actions."
- Example output: "Invariants, stages, files, rollback points, tests, and no schema changes."
- Use when: You want to improve structure without changing product behavior.
- Do not use when: You are actually adding a feature.

### Steps

1. **Define refactor intent and invariants**
   - Guidance: Separate structure changes from behavior changes.
   - Copyable prompt: "Turn this refactor idea into intent, invariants, non-goals, and risks. State exactly what behavior must remain unchanged.\n\nRefactor idea:\n[idea]\n\nCurrent code:\n[snippets]"
   - Example output: "Invariant: admin actions still call requireAdmin. Non-goal: no schema changes."
2. **Plan staged edits**
   - Guidance: Keep stages reversible.
   - Copyable prompt: "Create a staged refactor plan with small commits/checkpoints. For each stage include files, change type, expected no-op behavior, and verification."
   - Example output: "Stage 1 extract pure helper. Stage 2 replace call sites. Stage 3 remove duplication."
3. **Add safety checks**
   - Guidance: Include diff review and tests.
   - Copyable prompt: "Add safety checks for this refactor: tests, grep audits, manual checks, and rollback signs. Keep the plan behavior-preserving."
   - Example output: "Run lint/build; grep for old prop names; browser-check affected page."

### Quality checklist

- States behavior invariants.
- Keeps stages small and reversible.
- Includes verification after each stage.
- Avoids opportunistic feature work.
- Identifies rollback signs.

### Failure modes

- Bundles feature changes into refactor.
- Removes checks before adding replacements.
- Relies only on visual inspection.

Test notes placeholder: Pending manual tests A and B.

## 9. Check if a code change broke project rules

- Slug: `check-code-change-against-project-rules`
- Category: Review
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: AI-assisted changes can quietly add forbidden features or violate product/security rules.
- Description: Audit a diff against project rules, scope, and forbidden feature lists.
- Context setup: Bring the rules file, task prompt, diff, package changes, and touched files.
- Example input: "Audit Phase 8 security pass for service-role usage, signup, and AI calls."
- Example output: "No service-role refs; signup grep only existing no-signup copy; no AI calls."
- Use when: Before accepting or merging an AI-generated change.
- Do not use when: You only need product brainstorming.

### Steps

1. **Extract rules that matter**
   - Guidance: Use the actual rules, not memory.
   - Copyable prompt: "Read these project rules and extract only the rules relevant to this change. Group them as required, forbidden, and verification.\n\nRules:\n[paste rules]\n\nTask:\n[paste task]"
   - Example output: "Forbidden: service role, signup, payments, AI calls."
2. **Audit touched files and diff**
   - Guidance: Check file scope and behavior.
   - Copyable prompt: "Audit this diff against the extracted rules. List violations, suspicious changes, and clean confirmations. Include file references.\n\nTouched files:\n[list]\n\nDiff:\n[paste diff]"
   - Example output: "Clean: no package files. Risk: README mentions service role only as forbidden guidance."
3. **Run targeted grep checks**
   - Guidance: Generate commands for forbidden patterns.
   - Copyable prompt: "Create targeted grep/build checks for this audit. Include commands and what each result means.\n\nRules and findings:\n[paste]"
   - Example output: "grep SERVICE_ROLE in src supabase README; expected no app-code usage."

### Quality checklist

- Uses the actual rules text.
- Checks file scope and behavior.
- Includes command-based audits.
- Distinguishes violations from allowed mentions.
- Produces accept/revise recommendation.

### Failure modes

- Audits from memory.
- Ignores package/schema changes.
- Treats all grep hits as equal.

Test notes placeholder: Pending manual tests A and B.

## 10. Generate a README from a real project

- Slug: `generate-readme-from-real-project`
- Category: Documentation
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders generate README files that invent features or miss actual setup steps.
- Description: Create or update a README using only inspected repo facts.
- Context setup: Bring package scripts, env examples, app routes, product description, setup requirements, and forbidden claims.
- Example input: "Create a README for a Next.js Supabase app. Do not mention features not in repo."
- Example output: "README with product summary, local setup, env vars, database migrations, admin setup, and project rules."
- Use when: The repo exists and needs accurate documentation.
- Do not use when: You need marketing copy detached from the code.

### Steps

1. **Inspect facts first**
   - Guidance: Force repo inspection before writing.
   - Copyable prompt: "Inspect the repo facts needed for a README. Do not write yet. Report product summary, scripts, env vars, routes, database/migrations, and known limitations.\n\nFiles to inspect:\n[files]"
   - Example output: "Scripts: npm run lint/build/dev. Env: NEXT_PUBLIC_SUPABASE_URL/ANON_KEY."
2. **Draft factual README sections**
   - Guidance: Use only confirmed features.
   - Copyable prompt: "Using only the inspected facts, draft README sections: overview, local setup, environment, database, commands, admin/setup notes, project rules, and limitations. Do not invent features."
   - Example output: "No normal user accounts; admin users created manually."
3. **Audit claims**
   - Guidance: Check for unverified promises.
   - Copyable prompt: "Audit this README draft for unsupported claims, stale instructions, fake social proof, and forbidden features. Suggest minimal edits."
   - Example output: "Remove 'production-ready analytics' because no analytics exists."

### Quality checklist

- Every feature claim is backed by repo facts.
- Commands match package scripts.
- Env vars match templates.
- Limitations are clear.
- No fake social proof or roadmap promises.

### Failure modes

- Invents deployment, analytics, or integrations.
- Omits required migrations/env vars.
- Uses marketing language instead of setup facts.

Test notes placeholder: Pending manual tests A and B.

## 11. Turn user feedback into a product fix list

- Slug: `turn-user-feedback-into-product-fix-list`
- Category: Product
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders jump from user feedback to random fixes without grouping severity, evidence, and scope.
- Description: Convert messy feedback into prioritized product fixes, questions, and non-actions.
- Context setup: Bring raw feedback, product goal, current scope, constraints, and recent changes.
- Example input: "Users say the workflow page feels confusing and too plain."
- Example output: "Fix list: clarify hero, improve cards, defer visual redesign, ask follow-up about trust signals."
- Use when: You have qualitative feedback and need an actionable list.
- Do not use when: Feedback is actually a bug report with exact reproduction steps.

### Steps

1. **Normalize feedback**
   - Guidance: Separate quotes, interpretation, and evidence strength.
   - Copyable prompt: "Turn this raw feedback into normalized observations. Separate direct feedback, inferred problem, affected user, evidence strength, and unknowns.\n\nFeedback:\n[paste]"
   - Example output: "Observation: UI feels plain. Inference: trust hierarchy may be weak. Evidence: one user."
2. **Prioritize fixes**
   - Guidance: Tie fixes to product goal and effort.
   - Copyable prompt: "Create a prioritized fix list from these observations. Include impact, effort, risk, scope boundary, and whether to do now/defer/ignore."
   - Example output: "Do now: improve card copy. Defer: full visual identity exploration."
3. **Define validation**
   - Guidance: Decide how to know if fixes helped.
   - Copyable prompt: "For each fix marked do now, define acceptance criteria and how to validate with users or manual review. Keep it practical."
   - Example output: "User can explain product in under 5 seconds from homepage."

### Quality checklist

- Separates feedback from interpretation.
- Prioritizes by impact and effort.
- Includes deferrals and non-actions.
- Keeps scope tied to product phase.
- Defines validation.

### Failure modes

- Treats one comment as a full redesign mandate.
- Ignores product constraints.
- Produces fixes without validation.

Test notes placeholder: Pending manual tests A and B.

## 12. Compare two technical approaches

- Slug: `compare-two-technical-approaches`
- Category: Decision
- Audience: builder
- Difficulty: Intermediate
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders choose tools or architectures based on vibes instead of constraints and tradeoffs.
- Description: Compare two approaches using project context, risks, reversibility, implementation cost, and tests.
- Context setup: Bring the decision, two options, constraints, current stack, risks, and success criteria.
- Example input: "Use URL-driven client filters or database full-text search for workflow library?"
- Example output: "Recommendation: URL-driven client filters for MVP; defer database search until dataset grows."
- Use when: You have two plausible technical paths.
- Do not use when: One option is clearly forbidden by project rules.

### Steps

1. **Frame the decision**
   - Guidance: Define criteria before comparing.
   - Copyable prompt: "Frame this technical decision. List options, success criteria, constraints, non-goals, and what would make each option fail.\n\nDecision:\n[paste]\n\nContext:\n[paste]"
   - Example output: "Criteria: MVP speed, no new packages, URL sharing, dataset size."
2. **Compare options**
   - Guidance: Use a table with tradeoffs.
   - Copyable prompt: "Compare the two approaches against the criteria. Include complexity, user impact, risks, testability, reversibility, and future migration path."
   - Example output: "Client filters: simple, good for small data. Full-text: better later, needs indexes."
3. **Recommend and define trigger to revisit**
   - Guidance: Avoid permanent decisions.
   - Copyable prompt: "Recommend one approach for now. Include implementation notes, what not to do, and the future trigger for revisiting the decision."
   - Example output: "Choose client filters until approved workflows exceed 100 or latency becomes visible."

### Quality checklist

- Defines success criteria first.
- Compares against constraints.
- Includes reversibility.
- Names a revisit trigger.
- Does not overbuild for hypothetical scale.

### Failure modes

- Picks the more complex option by default.
- Ignores current stack.
- Has no migration or revisit plan.

Test notes placeholder: Pending manual tests A and B.

## 13. Create a test plan for a new feature

- Slug: `create-test-plan-for-new-feature`
- Category: Testing
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders ship AI-generated changes after only running a happy path.
- Description: Create a focused test plan with command checks, browser checks, edge cases, and forbidden-change audits.
- Context setup: Bring the feature spec, touched files, expected behavior, failure modes, and available scripts.
- Example input: "Test failed-search request tracking."
- Example output: "Lint/build, zero-result CTA, request prefill, invalid source fallback, no background inserts."
- Use when: A feature is about to be implemented or reviewed.
- Do not use when: You need unit test code only.

### Steps

1. **List behavior to prove**
   - Guidance: Turn the feature into observable cases.
   - Copyable prompt: "Turn this feature spec into observable behaviors to prove. Include happy path, edge cases, failure modes, and forbidden behaviors.\n\nFeature spec:\n[paste]"
   - Example output: "CTA appears only on non-empty zero-result search. No search is saved automatically."
2. **Choose verification methods**
   - Guidance: Mix command, browser, and grep checks.
   - Copyable prompt: "Create a practical test plan for these behaviors. Include commands, browser routes, manual checks, and grep audits. Keep it scoped to the feature."
   - Example output: "npm run lint/build; visit /workflows?search=zzz; submit request."
3. **Define pass/fail log**
   - Guidance: Make results recordable.
   - Copyable prompt: "Format this test plan as a checklist with pass/fail, notes, and revision-needed columns."
   - Example output: "Case: invalid source URL. Expected: submits request_form."

### Quality checklist

- Covers happy path and edge cases.
- Includes forbidden behaviors.
- Uses available scripts.
- Has recordable pass/fail fields.
- Does not require unnecessary tooling.

### Failure modes

- Only tests the happy path.
- Omits local/no-env behavior.
- Does not check forbidden side effects.

Test notes placeholder: Pending manual tests A and B.

## 14. Prepare a handoff summary after an AI coding session

- Slug: `prepare-handoff-summary-after-ai-coding-session`
- Category: Handoff
- Audience: builder
- Difficulty: Beginner
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders lose track of what changed, what passed, and what still needs review after a long AI session.
- Description: Produce a concise handoff with changed files, behavior, verification, risks, and next actions.
- Context setup: Bring task, diff summary, test output, known blockers, and deployment/seed status.
- Example input: "Summarize Phase 9.5 UI pass after lint/build and browser checks."
- Example output: "Changed homepage/library/detail/request copy; lint/build passed; no forbidden grep hits; follow-up after seeding real workflows."
- Use when: Ending a coding session or handing work to another person.
- Do not use when: You need a commit message only.

### Steps

1. **Collect facts**
   - Guidance: Use git status/diff and test outputs.
   - Copyable prompt: "Prepare a handoff summary. First collect changed files, diff themes, verification run, failures, and known unresolved items. Do not invent results.\n\nTask:\n[paste]\n\nOutputs:\n[paste status/test output]"
   - Example output: "Files: public pages/components. Tests: lint/build passed."
2. **Write summary**
   - Guidance: Keep it scannable and honest.
   - Copyable prompt: "Write a concise handoff summary with: what changed, files changed, verification, risks, and next recommended action. Mention anything not done."
   - Example output: "Seed SQL not created. Human review still needed."
3. **Add review checklist**
   - Guidance: Help the next person inspect.
   - Copyable prompt: "Add a short reviewer checklist for this handoff. Include behavior checks and scope boundaries."
   - Example output: "Confirm no admin/schema changes; verify request path."

### Quality checklist

- Based on actual status/test output.
- Clearly says what was not done.
- Includes changed files.
- Includes remaining risks.
- Helps a human review quickly.

### Failure modes

- Claims tests passed without evidence.
- Omits dirty files.
- Hides blockers.

Test notes placeholder: Pending manual tests A and B.

## 15. Decide what to build next without adding bloat

- Slug: `decide-what-to-build-next-without-adding-bloat`
- Category: Product
- Audience: builder
- Difficulty: Intermediate
- Freshness status: needs-review
- Learning-safe mode: learning-safe
- Platform tested on: Pending manual test with ChatGPT/Codex/Claude
- Status intent: draft
- Is verified intent: false
- Problem solved: Builders keep adding features before validating whether the current product works.
- Description: Use constraints, user evidence, and product stage to choose the next smallest useful step.
- Context setup: Bring current product, user feedback, metrics or absence of metrics, constraints, and candidate ideas.
- Example input: "WorknFlow can browse workflows and submit requests. What next before launch?"
- Example output: "Do content validation and seed builder workflows before visual exploration or monetization."
- Use when: You have multiple possible next steps and want to avoid scope creep.
- Do not use when: A production bug blocks users.

### Steps

1. **Inventory current state**
   - Guidance: Start from what exists and what is unvalidated.
   - Copyable prompt: "Inventory the current product state. List what exists, what is unvalidated, active constraints, and candidate next steps. Do not recommend yet.\n\nContext:\n[paste]"
   - Example output: "Exists: browsing, requests, admin. Unvalidated: workflow content quality."
2. **Score candidate steps**
   - Guidance: Use validation value, effort, risk, and bloat.
   - Copyable prompt: "Score each candidate next step by validation value, implementation effort, risk, reversibility, and bloat risk. Use a small table."
   - Example output: "Seed content: high validation, low code risk. Payments: high bloat risk."
3. **Choose the next smallest step**
   - Guidance: Pick one and defer the rest.
   - Copyable prompt: "Choose the next smallest useful step. Include why, what to defer, success criteria, and stop conditions."
   - Example output: "Choose 15 builder workflows and test log. Defer UI variants until content direction is validated."

### Quality checklist

- Starts from current product state.
- Scores options against validation.
- Defers bloat explicitly.
- Defines success and stop conditions.
- Picks one next step.

### Failure modes

- Optimizes for novelty instead of validation.
- Adds monetization or accounts too early.
- Chooses multiple next steps at once.

Test notes placeholder: Pending manual tests A and B.
