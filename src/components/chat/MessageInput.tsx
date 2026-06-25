'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function MessageInput({ channelId, userId }: { channelId: string; userId: string }) {
  const [content, setContent] = useState('')
  const supabase = createClient()

  async function send() {
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        send()
      }}
      className="border-t border-border p-4"
    >
      <div className="flex items-end gap-2 rounded-2xl border border-input bg-background px-3 py-2 shadow-soft focus-within:ring-2 focus-within:ring-ring/40">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          rows={1}
          placeholder="Message..."
          className="max-h-40 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" size="icon" disabled={!content.trim()} className="h-9 w-9 shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
