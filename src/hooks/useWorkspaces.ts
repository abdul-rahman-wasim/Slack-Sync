'use client'

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export type Workspace = { id: string; name: string; slug: string }

export function useWorkspaces(userId: string, initialWorkspaces: Workspace[]) {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const query = useQuery({
    queryKey: ['workspaces', userId],
    queryFn: () => initialWorkspaces,
    initialData: initialWorkspaces,
    staleTime: Infinity,
  })

  useEffect(() => {
    const channel = supabase
      .channel(`workspace_members:${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'workspace_members', filter: `user_id=eq.${userId}` },
        async (payload: RealtimePostgresChangesPayload<{ workspace_id: string }>) => {
          const workspaceId = (payload.new as { workspace_id: string }).workspace_id
          const { data: workspace } = await supabase
            .from('workspaces')
            .select('id, name, slug')
            .eq('id', workspaceId)
            .single()

          if (workspace) {
            queryClient.setQueryData<Workspace[]>(['workspaces', userId], (old) => [
              ...(old ?? []),
              workspace,
            ])
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'workspace_members', filter: `user_id=eq.${userId}` },
        (payload: RealtimePostgresChangesPayload<{ workspace_id: string }>) => {
          const removedId = (payload.old as { workspace_id: string }).workspace_id
          queryClient.setQueryData<Workspace[]>(['workspaces', userId], (old) =>
            (old ?? []).filter((w) => w.id !== removedId)
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, queryClient, supabase])

  return query
}
