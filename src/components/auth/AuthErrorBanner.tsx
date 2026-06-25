'use client'
import { useEffect, useState } from 'react'

const ERROR_MESSAGES: Record<string, string> = {
  otp_expired: 'Magic link has expired. Please request a new one.',
  access_denied: 'Sign-in failed. Please try again.',
}

export default function AuthErrorBanner() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1))
    const errorCode = hash.get('error_code') ?? hash.get('error') ?? null
    if (errorCode) {
      setError(ERROR_MESSAGES[errorCode] ?? 'Something went wrong. Please try again.')
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  if (!error) return null

  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {error}
    </div>
  )
}
