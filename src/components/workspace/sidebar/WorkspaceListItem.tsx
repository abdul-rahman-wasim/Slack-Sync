'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { deleteWorkspace } from '@/lib/actions/workspace'

type Workspace = { id: string; name: string; slug: string }

export default function WorkspaceListItem({
  workspace,
  isActive,
}: {
  workspace: Workspace
  isActive: boolean
}) {
  return (
    <div
      className={`group flex items-center justify-between rounded-md text-sm transition-colors ${
        isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Link href={`/workspace/${workspace.slug}`} className="flex flex-1 items-center gap-2 px-2 py-1.5">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold ${
            isActive ? 'bg-white/20 text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          {workspace.name.charAt(0).toUpperCase()}
        </span>
        <span className="truncate">{workspace.name}</span>
      </Link>
      <button
        onClick={() => {
          if (confirm(`Delete "${workspace.name}"? This permanently deletes all its channels and messages.`)) {
            deleteWorkspace(workspace.id)
          }
        }}
        className="mr-1 rounded p-1 opacity-0 hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
