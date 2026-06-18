import type { SupabaseClient } from '@supabase/supabase-js'

export async function getDefaultWorkspaceRedirect(supabase: SupabaseClient) {
  const { data } = await supabase.from('workspaces').select('slug').limit(1).maybeSingle()
  return data ? `/workspace/${data.slug}` : '/onboarding'
}
