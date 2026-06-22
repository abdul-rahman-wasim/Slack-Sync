'use client'

import { LogOut } from 'lucide-react'
import { signOut } from '@/lib/actions/auth'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-red-600"
    >
      <LogOut className="h-4 w-4" />
    </button>
  )
}
