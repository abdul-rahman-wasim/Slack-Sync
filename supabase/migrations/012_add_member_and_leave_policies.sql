drop policy if exists "workspace_members_insert" on workspace_members;
create policy "workspace_members_insert" on workspace_members for insert with check (
  user_id = auth.uid()
  or exists (select 1 from workspace_members wm where wm.workspace_id = workspace_members.workspace_id and wm.user_id = auth.uid())
);

drop policy if exists "channel_members_insert" on channel_members;
create policy "channel_members_insert" on channel_members for insert with check (
  exists (
    select 1 from channels c
    join workspace_members wm on wm.workspace_id = c.workspace_id
    where c.id = channel_members.channel_id and wm.user_id = auth.uid()
  )
);

drop policy if exists "workspace_members_delete" on workspace_members;
create policy "workspace_members_delete" on workspace_members for delete using (
  user_id = auth.uid() and role <> 'owner'
);

drop policy if exists "channel_members_delete" on channel_members;
create policy "channel_members_delete" on channel_members for delete using (
  user_id = auth.uid()
);

grant delete on public.workspace_members to authenticated;
grant delete on public.channel_members to authenticated;

create or replace function add_workspace_member(_workspace_id uuid, _username text)
returns void
language plpgsql
security invoker
as $$
declare
  target_user_id uuid;
begin
  select id into target_user_id from profiles where username = _username;

  if target_user_id is null then
    raise exception 'User not found';
  end if;

  insert into workspace_members (workspace_id, user_id, role)
  values (_workspace_id, target_user_id, 'member');

  insert into channel_members (channel_id, user_id)
  select id, target_user_id from channels
  where workspace_id = _workspace_id and is_private = false
  on conflict do nothing;
end;
$$;

grant execute on function add_workspace_member(uuid, text) to authenticated;
