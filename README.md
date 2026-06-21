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

## Project Rules

Before adding or changing features, read `PROJECT_RULES.md`. Do not add Supabase, auth, payments, extension code, marketplace features, saved workflows, creator submissions, or AI API calls in Phase 1.
