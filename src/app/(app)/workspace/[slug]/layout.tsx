import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import WorkspaceSwitcher from '@/components/workspace/sidebar/WorkspaceSwitcher'
import ChannelList from '@/components/workspace/sidebar/ChannelList'

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

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

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r bg-gray-50 flex flex-col">
        <WorkspaceSwitcher workspaces={workspaces ?? []} currentSlug={slug} />
        <ChannelList channels={channels ?? []} workspaceId={workspace.id} workspaceSlug={slug} />
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
