'use client'

import { LogOut } from 'lucide-react'
import { leaveWorkspace } from '@/lib/actions/workspace'

export default function LeaveWorkspaceButton({ workspaceId }: { workspaceId: string }) {
  return (
    <button
      onClick={() => {
        if (confirm('Leave this workspace?')) {
          leaveWorkspace(workspaceId)
        }
      }}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-600"
    >
      <LogOut className="h-3 w-3" />
      Leave
    </button>
  )
}
