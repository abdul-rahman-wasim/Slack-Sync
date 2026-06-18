'use server'

import { createClient } from '@/lib/supabase/server'
import { channelSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'

type ChannelState = { error?: string } | null

export async function createChannel(prevState: ChannelState, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const parsed = channelSchema.safeParse({ name: formData.get('name') })
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const workspaceId = formData.get('workspaceId') as string
  const workspaceSlug = formData.get('workspaceSlug') as string
  const isPrivate = formData.get('isPrivate') === 'true'

  const { data, error } = await supabase.rpc('create_channel', {
    _workspace_id: workspaceId,
    _name: parsed.data.name,
    _is_private: isPrivate,
  })

  if (error) {
    return { error: error.message }
  }

  redirect(`/workspace/${workspaceSlug}/channel/${data.id}`)
}

export async function deleteChannel(channelId: string, workspaceSlug: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('channels').delete().eq('id', channelId)
  if (error) throw new Error(error.message)
  redirect(`/workspace/${workspaceSlug}`)
}

