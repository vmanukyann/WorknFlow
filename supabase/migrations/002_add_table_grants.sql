grant usage on schema public to anon, authenticated;

grant select on public.workflows to anon, authenticated;
grant select on public.workflow_steps to anon, authenticated;
grant select on public.workflow_quality_checks to anon, authenticated;

grant insert on public.workflow_requests to anon, authenticated;
grant insert on public.workflow_feedback to anon, authenticated;

grant select, insert, update, delete on public.workflows to authenticated;
grant select, insert, update, delete on public.workflow_steps to authenticated;
grant select, insert, update, delete on public.workflow_quality_checks to authenticated;

grant select, update on public.workflow_requests to authenticated;
grant select on public.workflow_feedback to authenticated;

grant select on public.profiles to authenticated;

grant select, insert on public.admin_audit_log to authenticated;
