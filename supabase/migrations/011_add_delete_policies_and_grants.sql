drop policy if exists "workspaces_delete" on workspaces;
create policy "workspaces_delete" on workspaces for delete using (owner_id = auth.uid());

drop policy if exists "channels_delete" on channels;
create policy "channels_delete" on channels for delete using (created_by = auth.uid());

grant delete on public.workspaces to authenticated;
grant delete on public.channels to authenticated;
