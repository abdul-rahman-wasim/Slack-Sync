import { Users } from 'lucide-react'

export default function WorkspaceHeader({
  name,
  memberCount,
}: {
  name: string
  memberCount: number
}) {
  return (
    <div className="border-b px-4 py-3">
      <h2 className="font-semibold text-gray-900">{name}</h2>
      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
        <Users className="h-3 w-3" />
        <span>{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
      </div>
    </div>
  )
}
