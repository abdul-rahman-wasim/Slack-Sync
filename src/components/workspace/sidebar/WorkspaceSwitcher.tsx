'use client'

import Link from 'next/link'
import { LogOut, Plus } from 'lucide-react'
import { colorFor, initials } from '@/lib/avatar'
import { useWorkspaces, type Workspace } from '@/hooks/useWorkspaces'
import { signOut } from '@/lib/actions/auth'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function WorkspaceSwitcher({
  workspaces,
  currentSlug,
  userId,
  username,
}: {
  workspaces: Workspace[]
  currentSlug: string
  userId: string
  username: string
}) {
  const { data: liveWorkspaces } = useWorkspaces(userId, workspaces)

  return (
    <TooltipProvider delayDuration={150}>
      <nav className="flex h-full w-17 shrink-0 flex-col items-center gap-2 bg-rail py-3">
        {liveWorkspaces?.map((ws) => {
          const active = ws.slug === currentSlug
          return (
            <Tooltip key={ws.id}>
              <TooltipTrigger asChild>
                <Link
                  href={`/workspace/${ws.slug}`}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-white transition-all hover:rounded-xl ${
                    active ? 'rounded-xl ring-2 ring-rail-foreground ring-offset-2 ring-offset-rail' : ''
                  }`}
                  style={{ backgroundColor: colorFor(ws.name) }}
                >
                  {initials(ws.name)}
                  {active && (
                    <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-rail-foreground" />
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{ws.name}</TooltipContent>
            </Tooltip>
          )
        })}

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/workspace/new"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rail-active/40 text-rail-foreground transition-all hover:rounded-xl hover:bg-rail-active"
            >
              <Plus className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Create a workspace</TooltipContent>
        </Tooltip>

        <div className="mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-transparent transition hover:ring-rail-muted"
                style={{ backgroundColor: colorFor(username) }}
              >
                {initials(username)}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="text-xs font-normal text-muted-foreground">@{username}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </TooltipProvider>
  )
}
