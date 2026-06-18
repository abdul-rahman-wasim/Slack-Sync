// 'use server'

// import { createClient } from '@/lib/supabase/server'
// import { workspaceSchema } from '@/lib/validations'
// import { redirect } from 'next/navigation'

// type WorkspaceState = { error?: string } | null

// export async function createWorkspace(prevState: WorkspaceState, formData: FormData) {
//   const parsed = workspaceSchema.safeParse({
//     name: formData.get('name'),
//     slug: formData.get('slug'),
//   })

//   if (!parsed.success) {
//     return { error: parsed.error.issues[0].message }
//   }

//   const supabase = await createClient()
//   const { data, error } = await supabase.rpc('create_workspace', {
//     _name: parsed.data.name,
//     _slug: parsed.data.slug,
//   })

//   if (error) {
//     return { error: error.message }
//   }

//   redirect(`/workspace/${data.slug}`)
// }
'use server'

import { createClient } from '@/lib/supabase/server'
import { workspaceSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'

type WorkspaceState = { error?: string } | null

export async function createWorkspace(prevState: WorkspaceState, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: debug } = await supabase.rpc('debug_auth')
  console.log('DEBUG AUTH:', debug)
  if (!user) redirect('/login')

  const parsed = workspaceSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { data, error } = await supabase.rpc('create_workspace', {
    _name: parsed.data.name,
    _slug: parsed.data.slug,
  })

  if (error) {
    return { error: error.message }
  }

  redirect(`/workspace/${data.slug}`)
}
