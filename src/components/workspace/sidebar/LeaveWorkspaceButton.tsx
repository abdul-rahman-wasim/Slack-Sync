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
      aria-label="Leave workspace"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
    >
      <LogOut className="h-4 w-4" />
    </button>
  )
}
