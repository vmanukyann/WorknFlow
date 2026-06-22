create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workflows (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  problem_solved text not null,
  category text not null,
  audience text not null,
  platform_tested_on text not null,
  difficulty text not null,
  category_risk text not null,
  context_setup text not null,
  example_input text not null,
  example_output text not null,
  learning_safe_mode text not null,
  freshness_status text not null,
  last_verified_at timestamptz,
  is_verified boolean not null default false,
  status text not null default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workflows_difficulty_check check (difficulty in ('beginner', 'intermediate', 'advanced')),
  constraint workflows_category_risk_check check (category_risk in ('low', 'medium', 'high')),
  constraint workflows_learning_safe_mode_check check (learning_safe_mode in ('learning-safe', 'needs-caution', 'not-allowed')),
  constraint workflows_freshness_status_check check (freshness_status in ('current', 'needs-review', 'stale', 'broken')),
  constraint workflows_status_check check (status in ('draft', 'approved', 'hidden', 'archived'))
);

create table public.workflow_steps (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  step_number integer not null,
  title text not null,
  prompt text not null,
  guidance text,
  example_output text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workflow_steps_step_number_positive check (step_number > 0),
  constraint workflow_steps_workflow_step_number_unique unique (workflow_id, step_number)
);

create table public.workflow_quality_checks (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  position integer not null,
  label text not null,
  description text,
  created_at timestamptz not null default now(),
  constraint workflow_quality_checks_position_positive check (position > 0),
  constraint workflow_quality_checks_workflow_position_unique unique (workflow_id, position)
);

create table public.workflow_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  requested_workflow text not null,
  use_case text,
  source text not null default 'request-page',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workflow_requests_source_check check (source in ('request-page', 'failed-search', 'admin')),
  constraint workflow_requests_status_check check (status in ('new', 'reviewing', 'planned', 'completed', 'declined'))
);

create table public.workflow_feedback (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  rating text not null,
  comment text,
  created_at timestamptz not null default now(),
  constraint workflow_feedback_rating_check check (rating in ('worked', 'did-not-work'))
);

create table public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint admin_audit_log_action_check check (action in ('create', 'update', 'delete', 'approve', 'hide', 'archive', 'status-change')),
  constraint admin_audit_log_table_name_check check (table_name in ('profiles', 'workflows', 'workflow_steps', 'workflow_quality_checks', 'workflow_requests', 'workflow_feedback', 'admin_audit_log'))
);

create index profiles_is_admin_idx on public.profiles (is_admin);

create index workflows_status_idx on public.workflows (status);
create index workflows_category_idx on public.workflows (category);
create index workflows_difficulty_idx on public.workflows (difficulty);
create index workflows_freshness_status_idx on public.workflows (freshness_status);
create index workflows_category_risk_idx on public.workflows (category_risk);
create index workflows_approved_order_idx on public.workflows (category, title) where status = 'approved';
create index workflows_created_at_idx on public.workflows (created_at desc);

create index workflow_steps_workflow_order_idx on public.workflow_steps (workflow_id, step_number);

create index workflow_quality_checks_workflow_order_idx on public.workflow_quality_checks (workflow_id, position);

create index workflow_requests_status_created_at_idx on public.workflow_requests (status, created_at desc);
create index workflow_requests_source_created_at_idx on public.workflow_requests (source, created_at desc);
create index workflow_requests_user_id_idx on public.workflow_requests (user_id);

create index workflow_feedback_workflow_created_at_idx on public.workflow_feedback (workflow_id, created_at desc);
create index workflow_feedback_rating_idx on public.workflow_feedback (rating);
create index workflow_feedback_user_id_idx on public.workflow_feedback (user_id);

create index admin_audit_log_admin_created_at_idx on public.admin_audit_log (admin_user_id, created_at desc);
create index admin_audit_log_table_record_idx on public.admin_audit_log (table_name, record_id);
create index admin_audit_log_created_at_idx on public.admin_audit_log (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger set_workflows_updated_at
before update on public.workflows
for each row
execute function public.set_updated_at();

create trigger set_workflow_steps_updated_at
before update on public.workflow_steps
for each row
execute function public.set_updated_at();

create or replace function public.enforce_workflow_request_status_only_update()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if old.user_id is distinct from new.user_id
    or old.requested_workflow is distinct from new.requested_workflow
    or old.use_case is distinct from new.use_case
    or old.source is distinct from new.source
    or old.created_at is distinct from new.created_at then
    raise exception 'workflow request updates may only change status and updated_at';
  end if;

  new.updated_at = now();
  return new;
end;
$$;

create trigger enforce_workflow_request_status_only_update
before update on public.workflow_requests
for each row
execute function public.enforce_workflow_request_status_only_update();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_admin = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.workflows enable row level security;
alter table public.workflow_steps enable row level security;
alter table public.workflow_quality_checks enable row level security;
alter table public.workflow_requests enable row level security;
alter table public.workflow_feedback enable row level security;
alter table public.admin_audit_log enable row level security;

create policy "Public can read approved workflows"
on public.workflows
for select
using (status = 'approved');

create policy "Public can read steps for approved workflows"
on public.workflow_steps
for select
using (
  exists (
    select 1
    from public.workflows
    where workflows.id = workflow_steps.workflow_id
      and workflows.status = 'approved'
  )
);

create policy "Public can read quality checks for approved workflows"
on public.workflow_quality_checks
for select
using (
  exists (
    select 1
    from public.workflows
    where workflows.id = workflow_quality_checks.workflow_id
      and workflows.status = 'approved'
  )
);

create policy "Public can create workflow requests"
on public.workflow_requests
for insert
with check (
  status = 'new'
  and source in ('request-page', 'failed-search')
  and (user_id is null or user_id = auth.uid())
);

create policy "Public can create feedback for approved workflows"
on public.workflow_feedback
for insert
with check (
  rating in ('worked', 'did-not-work')
  and (user_id is null or user_id = auth.uid())
  and exists (
    select 1
    from public.workflows
    where workflows.id = workflow_feedback.workflow_id
      and workflows.status = 'approved'
  )
);

create policy "Admins can select profiles"
on public.profiles
for select
using (public.is_admin());

create policy "Admins can manage workflows"
on public.workflows
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage workflow steps"
on public.workflow_steps
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage workflow quality checks"
on public.workflow_quality_checks
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can select workflow requests"
on public.workflow_requests
for select
using (public.is_admin());

create policy "Admins can update workflow request status"
on public.workflow_requests
for update
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can select workflow feedback"
on public.workflow_feedback
for select
using (public.is_admin());

create policy "Admins can select audit log"
on public.admin_audit_log
for select
using (public.is_admin());

create policy "Admins can insert audit log"
on public.admin_audit_log
for insert
with check (public.is_admin());
