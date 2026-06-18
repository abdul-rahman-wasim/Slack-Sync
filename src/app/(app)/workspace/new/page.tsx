import WorkspaceForm from '@/components/workspace/WorkspaceForm'

export default function NewWorkspacePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create a workspace</h1>
          <p className="text-sm text-gray-500">Set up a new space for your team</p>
        </div>
        <WorkspaceForm />
      </div>
    </main>
  )
}
