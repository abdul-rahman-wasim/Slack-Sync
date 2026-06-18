create or replace function is_workspace_member(_workspace_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from workspace_members
    where workspace_id = _workspace_id and user_id = auth.uid()
  );
$$;

create or replace function is_channel_member(_channel_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from channel_members
    where channel_id = _channel_id and user_id = auth.uid()
  );
$$;

drop policy "workspace_members_select" on workspace_members;
create policy "workspace_members_select" on workspace_members for select using (
  is_workspace_member(workspace_id)
);

drop policy "channel_members_select" on channel_members;
create policy "channel_members_select" on channel_members for select using (
  is_channel_member(channel_id)
);
