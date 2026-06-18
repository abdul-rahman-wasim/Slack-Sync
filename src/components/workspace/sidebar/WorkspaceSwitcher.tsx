import Link from 'next/link'
import { Plus } from 'lucide-react'
import WorkspaceListItem from './WorkspaceListItem';

type Workspace = { id: string; name: string; slug: string }

export default function WorkspaceSwitcher({
  workspaces,
  currentSlug,
}: {
  workspaces: Workspace[]
  currentSlug: string
}) {
  return (
    <div className="flex flex-col gap-1 p-3">
      <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Workspaces
      </p>

      <nav className="flex flex-col gap-0.5">
        {/* {workspaces.map((ws) => {
          const isActive = ws.slug === currentSlug
          return (
            <Link
              key={ws.id}
              href={`/workspace/${ws.slug}`}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {ws.name.charAt(0).toUpperCase()}
              </span>
              <span className="truncate">{ws.name}</span>
            </Link>
          )
        })} */}
            {workspaces.map((ws) => (
                <WorkspaceListItem key={ws.id} workspace={ws} isActive={ws.slug === currentSlug} />
            ))}
      </nav>

      <Link
        href="/workspace/new"
        className="mt-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-900"
      >
        <Plus className="h-4 w-4" />
        New workspace
      </Link>
    </div>
  )
}
