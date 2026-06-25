'use client'

import { LogOut } from 'lucide-react'
import { leaveChannel } from '@/lib/actions/channel'
import { Button } from '@/components/ui/button'

export default function LeaveChannelButton({
  channelId,
  workspaceSlug,
}: {
  channelId: string
  workspaceSlug: string
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        if (confirm('Leave this channel?')) {
          leaveChannel(channelId, workspaceSlug)
        }
      }}
      className="text-muted-foreground hover:text-destructive"
    >
      <LogOut className="h-4 w-4" /> Leave
    </Button>
  )
}
