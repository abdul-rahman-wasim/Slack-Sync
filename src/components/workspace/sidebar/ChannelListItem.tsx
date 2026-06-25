'use client'

import Link from 'next/link'
import { Hash, Lock, Trash2 } from 'lucide-react'
import { deleteChannel } from '@/lib/actions/channel'

type Channel = { id: string; name: string; is_private: boolean }

export default function ChannelListItem({
  channel,
  workspaceSlug,
  isActive,
}: {
  channel: Channel
  workspaceSlug: string
  isActive: boolean
}) {
  return (
    <div
      className={`group flex items-center justify-between rounded-lg text-sm transition ${
        isActive
          ? 'bg-sidebar-primary font-semibold text-sidebar-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent'
      }`}
    >
      <Link
        href={`/workspace/${workspaceSlug}/channel/${channel.id}`}
        className="flex flex-1 items-center gap-2 px-3 py-1.5"
      >
        {channel.is_private ? (
          <Lock className="h-3.5 w-3.5 shrink-0 opacity-70" />
        ) : (
          <Hash className="h-3.5 w-3.5 shrink-0 opacity-70" />
        )}
        <span className="truncate">{channel.name}</span>
      </Link>
      <button
        onClick={() => {
          if (confirm(`Delete #${channel.name}? This permanently deletes all its messages.`)) {
            deleteChannel(channel.id, workspaceSlug)
          }
        }}
        aria-label={`Delete #${channel.name}`}
        className={`mr-1 rounded p-1 opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 ${
          isActive ? 'text-sidebar-primary-foreground' : ''
        }`}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
