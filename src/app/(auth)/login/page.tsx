import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/')

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">SlackSync</h1>
          <p className="text-sm text-gray-500">Sign in to your workspace</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
