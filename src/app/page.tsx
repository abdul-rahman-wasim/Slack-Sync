import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Hash, MessageSquare, Users, Zap, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuthErrorBanner from '@/components/auth/AuthErrorBanner'
import { getDefaultWorkspaceRedirect } from '@/lib/workspace'

const features = [
  {
    icon: Hash,
    title: 'Channels',
    body: 'Organize every conversation by topic, team, or project — public or private.',
  },
  {
    icon: Zap,
    title: 'Real-time',
    body: 'Messages, channels, and workspaces sync instantly. No refresh, no waiting.',
  },
  {
    icon: Users,
    title: 'Workspaces',
    body: 'Spin up a space for every team and switch between them in a click.',
  },
]

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect(await getDefaultWorkspaceRedirect(supabase))

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient text-primary-foreground shadow-soft">
            <MessageSquare className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">SlackSync</span>
        </div>
        <Button asChild variant="ghost">
          <Link href="/login">Sign in</Link>
        </Button>
      </header>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-3xl brand-gradient"
        />
        <div className="relative mx-auto max-w-3xl space-y-6 px-6 pb-12 pt-16 text-center sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Now with instant real-time sync
          </span>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            Where your team
            <span className="block text-brand-gradient">stays in sync</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Real-time team chat. Channels and instant messaging — all in one beautifully focused
            place.
          </p>

          <AuthErrorBanner />

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button asChild size="lg" className="h-12 px-7 text-base shadow-soft">
              <Link href="/login">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> Free demo
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> No setup
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> Unlimited channels
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:brand-gradient group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border brand-gradient p-10 text-center shadow-pop sm:p-14">
          <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to get in sync?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Create your workspace in seconds and bring the whole team along.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7 h-12 px-8 text-base font-semibold">
            <Link href="/login">
              Create your workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md brand-gradient text-primary-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
            </div>
            <span className="font-display font-semibold text-foreground">SlackSync</span>
          </div>
          <p>&copy; {new Date().getFullYear()} SlackSync. A demo experience.</p>
        </div>
      </footer>
    </div>
  )
}
