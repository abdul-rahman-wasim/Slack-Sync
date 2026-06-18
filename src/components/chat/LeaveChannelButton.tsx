'use client'

import { LogOut } from 'lucide-react'
import { leaveChannel } from '@/lib/actions/channel'

export default function LeaveChannelButton({
  channelId,
  workspaceSlug,
}: {
  channelId: string
  workspaceSlug: string
}) {
  return (
    <button
      onClick={() => {
        if (confirm('Leave this channel?')) {
          leaveChannel(channelId, workspaceSlug)
        }
      }}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-600"
    >
      <LogOut className="h-3 w-3" />
      Leave
    </button>
  )
}
