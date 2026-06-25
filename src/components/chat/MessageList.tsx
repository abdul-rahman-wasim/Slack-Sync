'use client'

import { useEffect, useRef } from 'react'
import { MessageSquare } from 'lucide-react'
import { useMessages, type Message } from '@/hooks/useMessages'
import MessageItem from './MessageItem'

type Profile = { username: string; avatar_url: string | null }

export default function MessageList({
  channelId,
  initialMessages,
  memberMap,
  currentUserId,
}: {
  channelId: string
  initialMessages: Message[]
  memberMap: Record<string, Profile>
  currentUserId: string
}) {
  const { data: messages } = useMessages(channelId, initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages?.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <MessageSquare className="h-6 w-6" />
        </span>
        <p className="mt-3 text-sm text-muted-foreground">No messages yet. Say hello! 👋</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="flex flex-col gap-1">
        {messages?.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            profile={memberMap[message.user_id]}
            isOwn={message.user_id === currentUserId}
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
