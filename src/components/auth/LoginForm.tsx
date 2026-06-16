'use client'

import { useActionState, useEffect, useState } from 'react'
import { sendMagicLink, signInWithGoogle } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(sendMagicLink, null)
  const [sentEmail, setSentEmail] = useState<string | null>(null)

  useEffect(() => {
    if (state?.success && state.email) {
      setSentEmail(state.email)
    }
  }, [state?.success, state?.email])

  if (sentEmail) {
    return (
      <div className="space-y-2 text-center">
        <p className="font-medium">Check your email</p>
        <p className="text-sm text-gray-500">
          We sent a link to <span className="font-medium">{sentEmail}</span>
        </p>
        <button
          className="text-sm text-blue-600 underline"
          onClick={() => setSentEmail(null)}
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-2">
        <Input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send magic link'}
        </Button>
      </form>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <div className="h-px flex-1 bg-gray-200" />
        or
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <form action={signInWithGoogle}>
        <Button type="submit" variant="outline" className="w-full">
          Continue with Google
        </Button>
      </form>
    </div>
  )
}
