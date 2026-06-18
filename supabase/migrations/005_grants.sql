grant usage on schema public to authenticated;

grant select, update on public.profiles to authenticated;
grant select, insert on public.workspaces to authenticated;
grant select, insert on public.workspace_members to authenticated;
grant select, insert on public.channels to authenticated;
grant select, insert on public.channel_members to authenticated;
grant select, insert, update, delete on public.messages to authenticated;
grant select, insert on public.direct_messages to authenticated;
