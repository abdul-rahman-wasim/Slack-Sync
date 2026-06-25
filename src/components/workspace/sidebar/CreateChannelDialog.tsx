'use client'

import { useActionState, useState } from 'react'
import { Hash, Plus } from 'lucide-react'
import { createChannel } from '@/lib/actions/channel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
        <button
          aria-label="Create channel"
          className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground transition hover:bg-sidebar-accent hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
          <DialogDescription>Channels are where your team talks by topic.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <input type="hidden" name="workspaceSlug" value={workspaceSlug} />

          <div className="space-y-1.5">
            <Label htmlFor="channel-name">Channel name</Label>
            <div className="relative">
              <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="channel-name"
                name="name"
                placeholder="e.g. general"
                value={name}
                onChange={(e) => setName(slugify(e.target.value))}
                className="h-11 pl-9"
                required
                autoFocus
              />
            </div>
            <p className="text-xs text-muted-foreground">Lowercase, no spaces — hyphens only.</p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Make private</p>
              <p className="text-xs text-muted-foreground">Only invited members can join.</p>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
            <input type="hidden" name="isPrivate" value={isPrivate ? 'true' : 'false'} />
          </div>

          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending || !name.trim()}>
              {isPending ? 'Creating...' : 'Create channel'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
