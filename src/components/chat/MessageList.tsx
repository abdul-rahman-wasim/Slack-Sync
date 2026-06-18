'use client'

import { useEffect, useRef } from 'react'
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

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {messages?.length === 0 && (
        <p className="text-sm text-gray-400">No messages yet. Say hello!</p>
      )}
      {messages?.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          profile={memberMap[message.user_id]}
          isOwn={message.user_id === currentUserId}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
