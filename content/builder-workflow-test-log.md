# Builder Workflow Test Log V1

Status: Prepared manual tests. No workflow is approved, verified, or production-tested until a test case records pass results and notes.

How to use: Run each test with a real AI coding assistant in a read-only or controlled workspace first. Record pass/fail, notes, and revisions. Do not seed approved workflows until the corresponding draft is revised from test results.

## Test matrix

### 1. Turn a vague app idea into a build plan

**Test A - WorknFlow context**
- Input summary: Plan a builder-first content validation phase for WorknFlow without schema or admin changes.
- Expected good output: Clear MVP content plan, non-goals, file targets, review steps, and deferred seed SQL.
- Checklist: Scope stays content-first; non-goals explicit; files named; risks called out; no code generation.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Plan a two-weekend React app for a home baker to track custom cake orders without payments.
- Expected good output: Small MVP, screens, data objects, milestones, out-of-scope payment/auth decisions.
- Checklist: Keeps v1 small; identifies data; includes milestones; calls out privacy/order risks.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 2. Turn a feature idea into implementation steps

**Test A - WorknFlow context**
- Input summary: Add builder-first copy to homepage/library without redesigning UI or touching admin.
- Expected good output: Behavior brief, affected public files, safe steps, acceptance checks.
- Checklist: Does not broaden scope; preserves search/request behavior; includes lint/build.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Add dark mode toggle to a small React notes app with existing Tailwind setup.
- Expected good output: State/storage plan, affected components, CSS strategy, accessibility checks.
- Checklist: Names current-theme source; avoids package changes; includes manual checks.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 3. Create a project spec before asking Codex to code

**Test A - WorknFlow context**
- Input summary: Spec a no-seed Phase 10 content document task with 15 builder workflows and 30 tests.
- Expected good output: Decision-complete spec with allowed files, forbidden changes, doc structure, verification.
- Checklist: Includes no seed SQL; protects dirty UI files; lists deliverables and greps.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Spec a feature to export a Python script result to CSV without changing its CLI flags.
- Expected good output: Inputs/outputs, files, compatibility constraints, tests, non-goals.
- Checklist: Preserves CLI; names CSV format; includes error cases.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 4. Review AI-generated code before accepting it

**Test A - WorknFlow context**
- Input summary: Review a diff that adds public request tracking but also edits package files.
- Expected good output: Severity-ordered findings, forbidden package edit callout, minimal fix list.
- Checklist: Checks task scope; flags data-shape mistakes; includes verification.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Review AI code that rewrites a local business website contact form and adds an unrequested analytics script.
- Expected good output: Flags analytics scope issue, validates form behavior, lists safe corrections.
- Checklist: Identifies external side effects; checks accessibility; avoids style-only review.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 5. Debug an error message with context

**Test A - WorknFlow context**
- Input summary: Debug a Next build TypeScript error in a client form validation union.
- Expected good output: Normalized error, likely narrowing cause, minimal explicit type fix plan.
- Checklist: Uses exact file/error; no disabling TypeScript; reruns build.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Debug a Python script `KeyError: 'email'` after changing CSV input columns.
- Expected good output: Data/header inspection plan, likely cause, validation/default strategy.
- Checklist: Checks actual headers; avoids blanket try/except; includes test fixture.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 6. Ask Codex to inspect before editing

**Test A - WorknFlow context**
- Input summary: Ask Codex to inspect request form and migration before changing failed-search behavior.
- Expected good output: Inspection summary, plan, files, risks, no edits before approval.
- Checklist: Does not mutate; identifies source validation; names tests.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Ask an AI assistant to inspect a SwiftUI habit tracker before adding reminders.
- Expected good output: File map, notification risk notes, permission concerns, implementation plan only.
- Checklist: No edits before approval; flags permissions; avoids broad app rewrite.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 7. Turn a messy repo into a file map

**Test A - WorknFlow context**
- Input summary: Map public workflow browsing from route to query layer and components.
- Expected good output: Routes, components, data mapping, fallback behavior, risky zones.
- Checklist: Explains server/client split; includes Supabase/helper path; no edits.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Map a small Express API with routes, controllers, and JSON file storage.
- Expected good output: Endpoint map, data flow, config, test/run commands, safe edit zones.
- Checklist: Finds entrypoint; identifies storage; notes missing tests.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 8. Create a safe refactor plan

**Test A - WorknFlow context**
- Input summary: Plan refactor of repeated admin child editor markup without changing server actions.
- Expected good output: Invariants, staged extraction, verification, rollback signals.
- Checklist: Keeps requireAdmin; no schema changes; staged no-op behavior.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Refactor a React app's duplicated modal components into one shared component.
- Expected good output: Props contract, staged replacement, visual checks, no behavior change.
- Checklist: Preserves keyboard behavior; no new package; includes rollback.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 9. Check if a code change broke project rules

**Test A - WorknFlow context**
- Input summary: Audit a diff for service-role usage, signup, AI calls, package changes, and schema edits.
- Expected good output: Relevant rules, grep commands, touched-file audit, accept/revise recommendation.
- Checklist: Distinguishes allowed text from app-code usage; reports package/schema status.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Audit a school club website change against rules: no payments, no tracking, no member login.
- Expected good output: Rule extraction, diff audit, grep checks, clear violations if any.
- Checklist: Checks external scripts; checks forms; names forbidden scope.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 10. Generate a README from a real project

**Test A - WorknFlow context**
- Input summary: Generate/update README sections from WorknFlow scripts, env vars, migrations, and admin setup.
- Expected good output: Factual setup docs, no invented features, clear limitations.
- Checklist: Scripts match package; env vars match template; no fake launch claims.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Generate README for a local Python invoice cleaner script with sample input/output.
- Expected good output: Install/run instructions, input format, output format, limitations, tests.
- Checklist: No unsupported deployment claims; includes example command; mentions data privacy.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 11. Turn user feedback into a product fix list

**Test A - WorknFlow context**
- Input summary: Feedback says WorknFlow is too broad and should validate builders first.
- Expected good output: Normalized observation, high-priority content validation, deferred UI variants.
- Checklist: Separates feedback from inference; chooses one next step; defers bloat.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Users of a meal-planning app say setup is confusing and recipes are hard to edit.
- Expected good output: Prioritized fixes, validation plan, non-actions, questions.
- Checklist: Groups feedback; does not add unrelated features; defines success criteria.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 12. Compare two technical approaches

**Test A - WorknFlow context**
- Input summary: Compare seed SQL now versus reviewable markdown docs first for 15 workflows.
- Expected good output: Recommends docs first for validation, defers seed, lists revisit trigger.
- Checklist: Weighs reversibility; avoids premature production data; names approval trigger.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Compare local JSON storage versus SQLite for a small desktop helper app.
- Expected good output: Criteria-based recommendation, migration trigger, risks.
- Checklist: Considers data size, backups, concurrency, reversibility.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 13. Create a test plan for a new feature

**Test A - WorknFlow context**
- Input summary: Create a test plan for failed-search request tracking.
- Expected good output: Routes, valid/invalid source cases, local no-env path, no background logging audit.
- Checklist: Covers happy and edge cases; includes lint/build; includes forbidden inserts.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Test plan for adding image upload preview to a React profile editor.
- Expected good output: File type/size checks, preview state, submit behavior, accessibility, error cases.
- Checklist: Avoids real upload if out of scope; includes keyboard and mobile checks.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 14. Prepare a handoff summary after an AI coding session

**Test A - WorknFlow context**
- Input summary: Summarize a Phase 9.5 UI clarity pass with dirty files, lint/build, browser checks, and follow-ups.
- Expected good output: Accurate changed-file list, verification, remaining risks, no hidden blockers.
- Checklist: Mentions tests actually run; lists files; says what was not done.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Handoff after adding offline caching to a small PWA.
- Expected good output: Changed files, behavior, tests, cache invalidation risks, next checks.
- Checklist: Does not claim production readiness; includes manual browser checks.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

### 15. Decide what to build next without adding bloat

**Test A - WorknFlow context**
- Input summary: Decide between visual variant exploration, content seeding, payments, and builder niche validation.
- Expected good output: Chooses builder content validation, defers UI variants/payments, defines success criteria.
- Checklist: Scores options; prioritizes validation; avoids multiple next steps.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD

**Test B - Second builder scenario**
- Input summary: Decide next step for a simple habit app: widgets, social sharing, or fixing retention feedback.
- Expected good output: Chooses smallest validation/fix step, defers bloat, defines stop condition.
- Checklist: Uses evidence; scores effort/risk; names deferrals.
- Pass/fail: TBD
- Notes: TBD
- Revision needed: TBD
