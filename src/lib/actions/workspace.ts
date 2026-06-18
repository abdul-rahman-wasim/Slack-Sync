'use server'

import { createClient } from '@/lib/supabase/server'
import { workspaceSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'
import { getDefaultWorkspaceRedirect } from '../workspace'

type WorkspaceState = { error?: string } | null
type AddMemberState = { error?: string; success?: boolean } | null

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

export async function addWorkspaceMember(prevState: AddMemberState, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const workspaceId = formData.get('workspaceId') as string
  const username = formData.get('username') as string

  const { error } = await supabase.rpc('add_workspace_member', {
    _workspace_id: workspaceId,
    _username: username,
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function leaveWorkspace(workspaceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('workspace_members')
    .delete()
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  redirect(await getDefaultWorkspaceRedirect(supabase))
}
