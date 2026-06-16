import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/onboarding')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            SlackSync
          </h1>
          <p className="text-xl text-gray-500">
            Real-time team chat. Channels, direct messages, and file sharing —
            all in one place.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/login">Get started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3">
          {[
            { title: 'Channels', desc: 'Organize conversations by topic' },
            { title: 'Direct Messages', desc: 'Chat privately with teammates' },
            { title: 'Real-time', desc: 'Messages appear instantly, no refresh' },
          ].map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
