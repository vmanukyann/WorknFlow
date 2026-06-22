# WorknFlow

WorknFlow is a verified AI workflow system. Every workflow is expected to include context setup, prompt steps, example inputs and outputs, freshness status, and a quality checklist so users can judge whether the result is trustworthy.

`PROJECT_RULES.md` is the source of truth for product scope, design rules, security rules, workflow schema, phase map, and Codex operating rules.

## Current Phase

This repo is currently in Phase 1: project foundation.

Included in this phase:

- Next.js, TypeScript, Tailwind CSS, and App Router setup
- Foundation folders
- Core workflow TypeScript types
- Hardcoded sample workflow data
- Lightweight status/design tokens

Not included in this phase:

- Product homepage UI
- Workflow cards or workflow detail pages
- Supabase client code or database wiring
- Auth
- Payments
- Chrome extension work
- AI API calls

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Check code quality:

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.local.example` to `.env.local` for local environment variables. Supabase placeholders are present for later phases only.

## Database

Database migrations live in `supabase/migrations`. Phase 4 creates the Supabase schema and RLS policies only; frontend wiring comes in Phase 5.

## Phase 5 Supabase Wiring

Copy `.env.local.example` to `.env.local`, then add your Supabase URL and anon key. Apply the migrations separately in Supabase. When those public env vars are present, public workflow pages, workflow requests, and workflow feedback use Supabase with RLS; when they are missing, workflow browsing falls back to the hardcoded sample data for local development.

Failed searches are only saved when a user submits a request; searches are not logged automatically.

## Admin Setup

Create a Supabase Auth user manually, then add a matching `profiles` row with `is_admin = true`. Log in at `/admin/login`. Do not expose service role keys in frontend code or tracked environment files.

## Project Rules

Before adding or changing features, read `PROJECT_RULES.md`. Do not add Supabase, auth, payments, extension code, marketplace features, saved workflows, creator submissions, or AI API calls in Phase 1.
