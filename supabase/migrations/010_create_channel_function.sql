create or replace function create_channel(_workspace_id uuid, _name text, _is_private boolean)
returns channels
language plpgsql
security invoker
as $$
declare
  new_channel channels;
begin
  insert into channels (workspace_id, name, is_private, created_by)
  values (_workspace_id, _name, _is_private, auth.uid())
  returning * into new_channel;

  insert into channel_members (channel_id, user_id)
  values (new_channel.id, auth.uid());

  return new_channel;
end;
$$;

grant execute on function create_channel(uuid, text, boolean) to authenticated;
