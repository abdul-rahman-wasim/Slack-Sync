import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Welcome to SlackSync</h1>
      <p className="text-gray-500">You don&apos;t have any workspaces yet.</p>
      <Button asChild>
        <Link href="/workspace/new">Create your first workspace</Link>
      </Button>
    </main>
  )
}
