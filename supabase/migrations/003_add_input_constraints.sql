alter table public.workflow_requests
  add constraint workflow_requests_query_length_check
    check (char_length(btrim(query)) between 3 and 240),
  add constraint workflow_requests_category_guess_length_check
    check (
      category_guess is null
      or char_length(btrim(category_guess)) between 1 and 80
    ),
  add constraint workflow_requests_platform_length_check
    check (
      platform is null
      or char_length(btrim(platform)) between 1 and 80
    ),
  add constraint workflow_requests_extra_context_length_check
    check (
      extra_context is null
      or char_length(btrim(extra_context)) between 1 and 1200
    );

alter table public.workflow_feedback
  add constraint workflow_feedback_comment_length_check
    check (comment is null or char_length(btrim(comment)) <= 1000);
