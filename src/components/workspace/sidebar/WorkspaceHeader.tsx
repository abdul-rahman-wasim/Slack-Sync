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
    <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3.5">
      <div className="min-w-0">
        <h2 className="truncate font-display text-base font-bold leading-tight">{name}</h2>
        <p className="text-xs text-muted-foreground">
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <AddMemberDialog workspaceId={workspaceId} />
        <LeaveWorkspaceButton workspaceId={workspaceId} />
      </div>
    </div>
  )
}
