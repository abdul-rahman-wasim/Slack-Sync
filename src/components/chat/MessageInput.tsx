'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function MessageInput({ channelId, userId }: { channelId: string; userId: string }) {
  const [content, setContent] = useState('')
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed) return

    const { error } = await supabase.from('messages').insert({
      channel_id: channelId,
      user_id: userId,
      content: trimmed,
    })

    if (!error) setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Message..."
        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <button
        type="submit"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
      >
        Send
      </button>
    </form>
  )
}
