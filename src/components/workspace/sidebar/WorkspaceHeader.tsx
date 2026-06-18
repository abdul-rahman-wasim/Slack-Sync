import { Users } from 'lucide-react'
import AddMemberDialog from './AddMemberDialog'
import LeaveWorkspaceButton from './LeaveWorkspaceButton'

export default function WorkspaceHeader({
  workspaceId,
  name,
  memberCount,
}: {
  workspaceId: string
  name: string
  memberCount: number
}) {
  return (
    <div className="border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">{name}</h2>
        <AddMemberDialog workspaceId={workspaceId} />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users className="h-3 w-3" />
          <span>{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
        </div>
        <LeaveWorkspaceButton workspaceId={workspaceId} />
      </div>
    </div>
  )
}
