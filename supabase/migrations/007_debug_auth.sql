create or replace function debug_auth()
returns table(role_name text, jwt_uid uuid, jwt_claims text)
language sql
security invoker
as $$
  select current_user, auth.uid(), current_setting('request.jwt.claims', true);
$$;

grant execute on function debug_auth() to authenticated;
