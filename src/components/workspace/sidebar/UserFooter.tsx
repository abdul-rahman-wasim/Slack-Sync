import { createClient } from '@/lib/supabase/server'
import SignOutButton from './SignOutButton'

export default async function UserFooter() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex items-center justify-between border-t border-sidebar-border px-4 py-3">
      <span className="text-sm text-sidebar-foreground">@{profile?.username}</span>
      <SignOutButton />
    </div>
  )
}
