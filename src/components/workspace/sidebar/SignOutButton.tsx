'use client'

import { LogOut } from 'lucide-react'
import { signOut } from '@/lib/actions/auth'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      aria-label="Sign out"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
    >
      <LogOut className="h-4 w-4" />
    </button>
  )
}
