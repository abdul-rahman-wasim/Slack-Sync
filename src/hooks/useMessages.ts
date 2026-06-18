'use client'

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export type Message = {
  id: string
  channel_id: string
  user_id: string
  content: string
  created_at: string
}

export function useMessages(channelId: string, initialMessages: Message[]) {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const query = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => initialMessages,
    initialData: initialMessages,
    staleTime: Infinity,
  })

  useEffect(() => {
    const channel = supabase
      .channel(`messages:${channelId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `channel_id=eq.${channelId}` },
         (payload: RealtimePostgresChangesPayload<Message>) => {
          queryClient.setQueryData<Message[]>(['messages', channelId], (old) => [
            ...(old ?? []),
            payload.new as Message,
          ])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [channelId, queryClient, supabase])

  return query
}
