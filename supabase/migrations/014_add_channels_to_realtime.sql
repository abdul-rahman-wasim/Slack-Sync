do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'channels'
  ) then
    alter publication supabase_realtime add table channels;
  end if;
end $$;
