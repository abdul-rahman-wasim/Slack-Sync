import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import WorkspaceSwitcher from '@/components/workspace/sidebar/WorkspaceSwitcher'
import ChannelList from '@/components/workspace/sidebar/ChannelList'
import WorkspaceHeader from '@/components/workspace/sidebar/WorkspaceHeader'

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id, name, slug')
    .eq('slug', slug)
    .single()

  if (!workspace) notFound()

  const { data: workspaces } = await supabase
    .from('workspaces')
    .select('id, name, slug')

  const { data: channels } = await supabase
    .from('channels')
    .select('id, name, is_private')
    .eq('workspace_id', workspace.id)

  const { count: memberCount } = await supabase
    .from('workspace_members')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', workspace.id)

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex h-screen">
      <WorkspaceSwitcher
        workspaces={workspaces ?? []}
        currentSlug={slug}
        userId={user.id}
        username={profile?.username ?? 'You'}
      />
      <aside className="flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <WorkspaceHeader name={workspace.name} memberCount={memberCount ?? 0} workspaceId={workspace.id} />
        <ChannelList channels={channels ?? []} workspaceId={workspace.id} workspaceSlug={slug} />
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
