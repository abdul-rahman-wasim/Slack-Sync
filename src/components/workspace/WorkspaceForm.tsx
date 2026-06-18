'use client'

import { useActionState, useState } from 'react'
import { createWorkspace } from '@/lib/actions/workspace'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function WorkspaceForm() {
  const [state, formAction, isPending] = useActionState(createWorkspace, null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [slugVisible, setSlugVisible] = useState(false)

  function handleNameChange(value: string) {
    setName(value)
    if (!slugEdited) setSlug(slugify(value))
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true)
    setSlug(value)
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Workspace name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. Acme Inc"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            yourapp.com/workspace/{slug || 'your-slug'}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="slug-toggle" className="text-xs text-gray-500">
              Customize URL
            </label>
            <Switch
              id="slug-toggle"
              checked={slugVisible}
              onCheckedChange={setSlugVisible}
            />
          </div>
        </div>

        {slugVisible ? (
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            required
          />
        ) : (
          <input type="hidden" name="slug" value={slug} />
        )}
      </div>

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create workspace'}
      </Button>
    </form>
  )
}
