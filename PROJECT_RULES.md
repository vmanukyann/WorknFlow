# PROJECT_RULES.md

## What This Product Is

A verified AI workflow system where every workflow includes context setup, prompt steps, example outputs, freshness status, and a quality checklist — so users can trust and judge the result.

## One-Sentence Description

A searchable library of tested AI workflows for students and builders, with real outputs, freshness status, and quality checklists.

## MVP Scope — What Is Included

- Homepage
- Workflow library page (/workflows)
- Individual workflow page (/workflows/[slug])
- Request a workflow page (/request)
- About/trust page (/about)
- Admin workflow management (/admin)
- Public approved workflow browsing
- Keyword search and category filter
- Copy prompt step buttons
- Copy full workflow button
- Workflow feedback (worked / did not work)
- Failed search empty state + request prefill
- Supabase database with RLS
- SEO metadata on all workflow pages

## MVP Scope — What Is NOT Included

DO NOT BUILD ANY OF THESE:

- User accounts for normal visitors
- Saved workflows / collections
- Payments or Stripe
- Gumroad integration
- Chrome extension
- Creator submissions
- Creator marketplace
- Team workspaces
- AI-powered search or generation
- Automatic workflow retesting
- Claude Skills directory
- Custom GPT directory
- Gemini Gems directory
- DOM injection of any kind
- Any reading of browser page content

## Stack

- Framework: Next.js + TypeScript
- Styling: Tailwind CSS
- Database + Auth: Supabase
- Hosting: Vercel
- Payments later: Gumroad, then Stripe

## User Types — MVP Only

Anonymous visitor:

- Can view approved workflows
- Can search and filter
- Can copy prompts
- Can submit workflow requests
- Can submit simple feedback

Admin:

- Can create, edit, approve, hide workflows
- Can manage workflow steps and quality checklists
- Can view failed searches and requests
- Can update verification status and freshness
- Cannot be set by frontend logic — must be server-side

## Auth Clarification

The MVP does not include accounts for normal visitors.

However, admin access still requires authentication.

Admin authentication may use Supabase Auth, but only approved admin emails or server-side admin records may access /admin routes.

Do not rely on frontend-only checks to protect admin pages.

## Design Rules

- Clean white or off-white background
- Strong readable text
- Rounded cards with soft borders
- No robot mascots
- No fake testimonials
- No heavy gradients
- No cluttered sidebars
- No excessive animations
- Student-friendly and professional
- Mobile must work cleanly

## UI Consistency Rules

- Reuse shared Button, Card, Badge, Input, and PageShell components.
- Do not create one-off button styles on individual pages.
- Do not create one-off card styles on individual pages.
- Use the same spacing scale across all pages.
- Use the same badge system for platform, difficulty, freshness, and learning-safe status.
- Workflow pages should prioritize readability over decoration.

## Accessibility Rules

- All buttons must have clear text or aria-labels.
- All form fields must have labels.
- Color cannot be the only way to communicate status.
- Text contrast must be readable.
- Keyboard navigation should work for buttons, links, and forms.
- Focus states must be visible.

## Security Rules

- Never expose Supabase service role keys in frontend code.
- Enable RLS on every public table.
- Public users may only read approved workflows.
- Draft, hidden, and archived workflows must not be publicly readable.
- Admin permissions must be checked server-side.
- Do not render raw HTML from user content.
- Sanitize or escape all user-generated text.
- Validate all form inputs.
- Rate-limit workflow requests and feedback if possible.
- Do not store unnecessary personal data.
- Do not collect exact birthdates.
- If age gating is added, ask only: “Are you 13 or older?”

## AI Feature Rule

The MVP does not call OpenAI, Anthropic, Gemini, or any AI API.

All workflows are manually written and manually verified.

Search is keyword/filter-based only in the MVP.

## Academic Integrity Rules

ALLOWED workflows:

- Study guides, flashcards, practice questions
- Essay feedback and thesis improvement
- Rubric-based revision
- Code debugging explanations
- Project planning and MVP scoping
- Concept explanations

NOT ALLOWED workflows:

- Write my essay
- Do my homework
- Generate fake citations
- Bypass AI detectors
- Pretend to be human-written

## Workflow Object — Required Fields

Every workflow in the database must have:

- title
- slug
- description
- problem_solved
- category
- audience
- platform_tested_on
- difficulty
- category_risk: low / medium / high
- context_setup: its own field, NOT a step
- example_input
- example_output
- learning_safe_mode: learning-safe / needs-caution / not-allowed
- freshness_status: current / needs-review / stale / broken
- last_verified_at
- is_verified
- status: draft / approved / hidden / archived

## Freshness Review Windows

- Low risk: studying, flashcards — review every 90–120 days
- Medium risk: writing, analysis — review every 60–90 days
- High risk: coding, tools, APIs — review every 30–60 days

## Codex Rules

Before every Codex session:

1. Tell Codex which phase you are in.
2. Tell Codex which files it may touch.
3. Tell Codex what features are forbidden in this phase.
4. Ask Codex to explain its plan before editing.

After every Codex session:

1. Run: npm run lint
2. Run: npm run build
3. Review the diff
4. Fix one issue before moving to the next

Never tell Codex:

- Build the whole app.
- Make it secure.
- Add auth.
- Make it look good.
- Add Supabase.

Always tell Codex:

- Build only [specific component].
- Do not touch [specific files].
- Do not add [feature not in this phase].
- Explain your plan before editing.
- Read PROJECT_RULES.md first.

## Phase Map

Phase 0 — Write PROJECT_RULES.md
Phase 1 — Next.js + Tailwind project setup
Phase 2 — Hardcoded UI with 3 sample workflows
Phase 3 — UI polish pass
Phase 4 — Supabase schema + RLS
Phase 5 — Wire Supabase to frontend
Phase 5.5 — Failed-search tracking
Phase 6 — Admin panel MVP
Phase 6.5 — Admin verification helper
Phase 7 — Search + filters
Phase 8: Security + abuse pass
Phase 9: SEO + share metadata
Phase 10: Seed 10 high-quality workflows
Phase 11: Real-user testing pass
Phase 12: Seed 50 workflows
Phase 13: Soft launch
Phase 14: Monetization experiment
Phase 15: Chrome side panel / browser assistant
Phase 16: Reputation + proof system
Phase 17: Context packs / advanced workflow system
Phase 18: Analytics + iteration loop