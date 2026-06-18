drop policy "channels_select" on channels;
create policy "channels_select" on channels for select using (
  created_by = auth.uid()
  or (
    exists (select 1 from workspace_members where workspace_id = channels.workspace_id and user_id = auth.uid())
    and (
      channels.is_private = false
      or exists (select 1 from channel_members where channel_id = channels.id and user_id = auth.uid())
    )
  )
);
