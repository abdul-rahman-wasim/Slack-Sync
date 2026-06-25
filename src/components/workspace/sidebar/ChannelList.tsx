'use client'

import { usePathname } from 'next/navigation'
import CreateChannelDialog from './CreateChannelDialog'
import ChannelListItem from './ChannelListItem'
import { useChannels, type Channel } from '@/hooks/useChannels'

export default function ChannelList({
  channels,
  workspaceId,
  workspaceSlug,
}: {
  channels: Channel[]
  workspaceId: string
  workspaceSlug: string
}) {
  const { data: liveChannels } = useChannels(workspaceId, channels)
  const pathname = usePathname()
  const activeChannelId = pathname.split('/channel/')[1]

  return (
    <div className="flex-1 overflow-y-auto px-2 pb-4">
      <div className="flex items-center justify-between px-3 pb-1 pt-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Channels
        </span>
        <CreateChannelDialog workspaceId={workspaceId} workspaceSlug={workspaceSlug} />
      </div>

      <ul className="space-y-0.5">
        {liveChannels?.map((channel) => (
          <li key={channel.id}>
            <ChannelListItem
              channel={channel}
              workspaceSlug={workspaceSlug}
              isActive={channel.id === activeChannelId}
            />
          </li>
        ))}
        {liveChannels?.length === 0 && (
          <li className="px-3 py-1 text-xs text-muted-foreground">No channels yet</li>
        )}
      </ul>
    </div>
  )
}
