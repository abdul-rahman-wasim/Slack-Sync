'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const emailSchema = z.object({
  email: z.email('Please enter a valid email address'),
})

type MagicLinkState = { error?: string; email?: string; success?: boolean } | null

export async function sendMagicLink(prevState: MagicLinkState, formData: FormData) {
  const result = emailSchema.safeParse({ email: formData.get('email') })

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { email } = result.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) return { error: error.message, email }
  return { success: true, email }
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (data.url) redirect(data.url)
}
