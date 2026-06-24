'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import WorkspaceListItem from './WorkspaceListItem'
import { useWorkspaces, type Workspace } from '@/hooks/useWorkspaces'

export default function WorkspaceSwitcher({
  workspaces,
  currentSlug,
  userId,
}: {
  workspaces: Workspace[]
  currentSlug: string
  userId: string
}) {
  const { data: liveWorkspaces } = useWorkspaces(userId, workspaces)

  return (
    <div className="flex flex-col gap-1 p-3">
      <div className="flex items-center justify-between px-2 pb-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Workspaces
        </p>
        <Link
          href="/workspace/new"
          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
        >
          <Plus className="h-4 w-4" />
        </Link>
      </div>

      <nav className="flex flex-col gap-0.5">
        {liveWorkspaces?.map((ws) => (
          <WorkspaceListItem key={ws.id} workspace={ws} isActive={ws.slug === currentSlug} />
        ))}
      </nav>
    </div>
  )
}
