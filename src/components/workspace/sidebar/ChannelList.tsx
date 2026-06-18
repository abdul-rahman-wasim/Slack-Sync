'use client'

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

  return (
    <div className="flex flex-col gap-1 border-t p-3">
      <div className="flex items-center justify-between px-2 pb-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Channels
        </p>
        <CreateChannelDialog workspaceId={workspaceId} workspaceSlug={workspaceSlug} />
      </div>

      <nav className="flex flex-col gap-0.5">
        {liveChannels?.map((channel) => (
          <ChannelListItem key={channel.id} channel={channel} workspaceSlug={workspaceSlug} />
        ))}
        {liveChannels?.length === 0 && (
          <p className="px-2 text-sm text-gray-400">No channels yet</p>
        )}
      </nav>
    </div>
  )
}
