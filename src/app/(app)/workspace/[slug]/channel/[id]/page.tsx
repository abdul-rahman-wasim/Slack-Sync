import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Hash, Lock } from 'lucide-react'
import MessageList from '@/components/chat/MessageList'
import MessageInput from '@/components/chat/MessageInput'
import LeaveChannelButton from '@/components/chat/LeaveChannelButton'

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>
}) {
  const { id, slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: channel } = await supabase
    .from('channels')
    .select('id, name, is_private')
    .eq('id', id)
    .single()

  if (!channel) notFound()

  const { data: membership } = await supabase
    .from('channel_members')
    .select('user_id')
    .eq('channel_id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (!membership && !channel.is_private) {
    await supabase.from('channel_members').insert({ channel_id: id, user_id: user.id })
  }

  const { data: messages } = await supabase
    .from('messages')
    .select('id, channel_id, user_id, content, created_at')
    .eq('channel_id', id)
    .order('created_at', { ascending: true })
    .limit(50)

  const { data: members } = await supabase
    .from('channel_members')
    .select('user_id, profiles(username, avatar_url)')
    .eq('channel_id', id)

  const memberMap = Object.fromEntries(
    (members ?? []).map((m: any) => [m.user_id, m.profiles])
  )

  return (
    <div className="flex h-full flex-col bg-card">
      <header className="flex items-center justify-between border-b border-border px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            {channel.is_private ? <Lock className="h-4 w-4" /> : <Hash className="h-4 w-4" />}
          </span>
          <div>
            <h1 className="font-display text-base font-bold leading-tight">{channel.name}</h1>
            <p className="text-xs text-muted-foreground">{members?.length ?? 0} members</p>
          </div>
        </div>
        <LeaveChannelButton channelId={id} workspaceSlug={slug} />
      </header>
      <MessageList
        channelId={id}
        initialMessages={messages ?? []}
        memberMap={memberMap}
        currentUserId={user.id}
      />
      <MessageInput channelId={id} userId={user.id} />
    </div>
  )
}
