# WorknFlow

WorknFlow is a verified AI workflow system. Every workflow is expected to include context setup, prompt steps, example inputs and outputs, freshness status, and a quality checklist so users can judge whether the result is trustworthy.

`PROJECT_RULES.md` is the source of truth for product scope, design rules, security rules, workflow schema, phase map, and Codex operating rules.

## Current Phase

This repo is in the MVP buildout. Public workflow browsing, workflow requests,
feedback, Supabase RLS, and the admin workflow manager are wired for the current
phase. Do not add accounts for normal visitors, payments, extension code,
marketplace features, or AI API calls.

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

Copy `.env.local.example` to `.env.local`, then add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Do not put a Supabase service role key in frontend code or tracked environment
files.

## Database

Database migrations live in `supabase/migrations`. Apply them manually in
Supabase before using live data. If Supabase automatic table exposure is
disabled, `002_add_table_grants.sql` is required so RLS-protected anon and
authenticated access works.

## Phase 5 Supabase Wiring

Copy `.env.local.example` to `.env.local`, then add your Supabase URL and anon key. Apply the migrations separately in Supabase. When those public env vars are present, public workflow pages, workflow requests, and workflow feedback use Supabase with RLS; when they are missing, workflow browsing falls back to the hardcoded sample data for local development.

Failed searches are only saved when a user submits a request; searches are not logged automatically.

## Admin Setup

Create a Supabase Auth user manually, then insert a matching `public.profiles`
row with the Auth user `id`, email, and `is_admin = true`. Log in at
`/admin/login`. Admin access is still enforced server-side through Supabase Auth,
RLS, and `profiles.is_admin = true`.

## Project Rules

Before adding or changing features, read `PROJECT_RULES.md`. Do not add payments,
extension code, marketplace features, saved workflows, creator submissions, or AI
API calls in the MVP.
