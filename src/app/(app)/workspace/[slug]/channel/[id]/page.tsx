import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import MessageList from '@/components/chat/MessageList'
import MessageInput from '@/components/chat/MessageInput'

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>
}) {
  const { id } = await params
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
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-3">
        <h2 className="font-semibold text-gray-900">
          {channel.is_private ? '🔒' : '#'} {channel.name}
        </h2>
        <p className="text-xs text-gray-500">{members?.length ?? 0} members</p>
      </div>
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
