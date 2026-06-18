drop policy "workspaces_select" on workspaces;
create policy "workspaces_select" on workspaces for select using (
  owner_id = auth.uid()
  or exists (select 1 from workspace_members where workspace_id = workspaces.id and user_id = auth.uid())
);

drop function if exists debug_auth();
