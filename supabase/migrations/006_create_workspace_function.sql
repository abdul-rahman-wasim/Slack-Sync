create or replace function create_workspace(_name text, _slug text)
returns workspaces
language plpgsql
security invoker
as $$
declare
  new_workspace workspaces;
begin
  insert into workspaces (name, slug, owner_id)
  values (_name, _slug, auth.uid())
  returning * into new_workspace;

  insert into workspace_members (workspace_id, user_id, role)
  values (new_workspace.id, auth.uid(), 'owner');

  return new_workspace;
end;
$$;

grant execute on function create_workspace(text, text) to authenticated;
