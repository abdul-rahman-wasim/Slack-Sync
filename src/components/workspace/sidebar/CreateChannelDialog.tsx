'use client'

import { useActionState, useState } from 'react'
import { createChannel } from '@/lib/actions/channel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function CreateChannelDialog({
  workspaceId,
  workspaceSlug,
}: {
  workspaceId: string
  workspaceSlug: string
}) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(createChannel, null)
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700">
          <Plus className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input type="hidden" name="workspaceSlug" value={workspaceSlug} />

          <div className="space-y-1">
            <label htmlFor="channel-name" className="text-sm font-medium">
              Channel name
            </label>
            <Input
              id="channel-name"
              name="name"
              placeholder="e.g. general"
              value={name}
              onChange={(e) => setName(slugify(e.target.value))}
              required
            />
            <p className="text-xs text-gray-500">Lowercase, no spaces — hyphens only</p>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="is-private" className="text-sm font-medium">
              Make private
            </label>
            <Switch id="is-private" checked={isPrivate} onCheckedChange={setIsPrivate} />
            <input type="hidden" name="isPrivate" value={isPrivate ? 'true' : 'false'} />
          </div>

          {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create channel'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
