'use client'

import Link from 'next/link'
import { Hash, Lock, Trash2 } from 'lucide-react'
import { deleteChannel } from '@/lib/actions/channel'

type Channel = { id: string; name: string; is_private: boolean }

export default function ChannelListItem({
  channel,
  workspaceSlug,
}: {
  channel: Channel
  workspaceSlug: string
}) {
  return (
    <div className="group flex items-center justify-between rounded-md text-sm text-gray-700 hover:bg-gray-200">
      <Link
        href={`/workspace/${workspaceSlug}/channel/${channel.id}`}
        className="flex flex-1 items-center gap-2 px-2 py-1.5"
      >
        {channel.is_private ? (
          <Lock className="h-3.5 w-3.5 text-gray-400" />
        ) : (
          <Hash className="h-3.5 w-3.5 text-gray-400" />
        )}
        <span className="truncate">{channel.name}</span>
      </Link>
      <button
        onClick={() => {
          if (confirm(`Delete #${channel.name}? This permanently deletes all its messages.`)) {
            deleteChannel(channel.id, workspaceSlug)
          }
        }}
        className="mr-1 rounded p-1 opacity-0 hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
