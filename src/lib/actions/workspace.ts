'use server'

import { createClient } from '@/lib/supabase/server'
import { workspaceSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'
import { getDefaultWorkspaceRedirect } from '../workspace'

type WorkspaceState = { error?: string } | null

export async function createWorkspace(prevState: WorkspaceState, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const parsed = workspaceSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { data, error } = await supabase.rpc('create_workspace', {
    _name: parsed.data.name,
    _slug: parsed.data.slug,
  })

  if (error) {
    return { error: error.message }
  }

  redirect(`/workspace/${data.slug}`)
}

export async function deleteWorkspace(workspaceId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('workspaces').delete().eq('id', workspaceId)
  if (error) throw new Error(error.message)
  redirect(await getDefaultWorkspaceRedirect(supabase))
}


