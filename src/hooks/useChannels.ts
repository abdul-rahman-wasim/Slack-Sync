'use client'

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export type Channel = { id: string; name: string; is_private: boolean }

export function useChannels(workspaceId: string, initialChannels: Channel[]) {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const query = useQuery({
    queryKey: ['channels', workspaceId],
    queryFn: () => initialChannels,
    initialData: initialChannels,
    staleTime: Infinity,
  })

  useEffect(() => {
    const channel = supabase
      .channel(`channels:${workspaceId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels', filter: `workspace_id=eq.${workspaceId}` },
        (payload: RealtimePostgresChangesPayload<Channel>) => {
          queryClient.setQueryData<Channel[]>(['channels', workspaceId], (old) => [
            ...(old ?? []),
            payload.new as Channel,
          ])
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'channels', filter: `workspace_id=eq.${workspaceId}` },
        (payload: RealtimePostgresChangesPayload<Channel>) => {
          const deletedId = (payload.old as { id: string }).id
          queryClient.setQueryData<Channel[]>(['channels', workspaceId], (old) =>
            (old ?? []).filter((c) => c.id !== deletedId)
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [workspaceId, queryClient, supabase])

  return query
}
