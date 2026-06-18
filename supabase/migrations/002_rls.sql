alter table profiles enable row level security;
alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table channels enable row level security;
alter table channel_members enable row level security;
alter table messages enable row level security;
alter table direct_messages enable row level security;

create policy "profiles_select" on profiles for select using (true);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

create policy "workspaces_select" on workspaces for select using (
  exists (select 1 from workspace_members where workspace_id = workspaces.id and user_id = auth.uid())
);
create policy "workspaces_insert" on workspaces for insert with check (owner_id = auth.uid());

create policy "workspace_members_select" on workspace_members for select using (
  exists (select 1 from workspace_members wm where wm.workspace_id = workspace_members.workspace_id and wm.user_id = auth.uid())
);
create policy "workspace_members_insert" on workspace_members for insert with check (user_id = auth.uid());

create policy "channels_select" on channels for select using (
  exists (select 1 from workspace_members where workspace_id = channels.workspace_id and user_id = auth.uid())
  and (
    channels.is_private = false
    or exists (select 1 from channel_members where channel_id = channels.id and user_id = auth.uid())
  )
);
create policy "channels_insert" on channels for insert with check (
  exists (select 1 from workspace_members where workspace_id = channels.workspace_id and user_id = auth.uid())
);

create policy "channel_members_select" on channel_members for select using (
  exists (select 1 from channel_members cm where cm.channel_id = channel_members.channel_id and cm.user_id = auth.uid())
);
create policy "channel_members_insert" on channel_members for insert with check (
  user_id = auth.uid()
  and exists (
    select 1 from channels c
    join workspace_members wm on wm.workspace_id = c.workspace_id
    where c.id = channel_members.channel_id and wm.user_id = auth.uid()
  )
);

create policy "messages_select" on messages for select using (
  exists (select 1 from channel_members where channel_id = messages.channel_id and user_id = auth.uid())
);
create policy "messages_insert" on messages for insert with check (
  user_id = auth.uid()
  and exists (select 1 from channel_members where channel_id = messages.channel_id and user_id = auth.uid())
);
create policy "messages_update" on messages for update using (user_id = auth.uid());
create policy "messages_delete" on messages for delete using (user_id = auth.uid());

create policy "dm_select" on direct_messages for select using (auth.uid() in (sender_id, receiver_id));
create policy "dm_insert" on direct_messages for insert with check (sender_id = auth.uid());
