import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const workspaceSchema = z.object({
  name: z.string()
    .min(2, 'Workspace name must be at least 2 characters')
    .max(50, 'Workspace name must be under 50 characters'),
  slug: z.string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
})

export const channelSchema = z.object({
  name: z.string()
    .min(1, 'Channel name is required')
    .max(80, 'Channel name must be under 80 characters')
    .regex(/^[a-z0-9-]+$/, 'Channel name can only contain lowercase letters, numbers, and hyphens'),
})

export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message cannot be empty')
    .max(4000, 'Message must be under 4000 characters'),
})

export type EmailInput = z.infer<typeof emailSchema>
export type WorkspaceInput = z.infer<typeof workspaceSchema>
export type ChannelInput = z.infer<typeof channelSchema>
export type MessageInput = z.infer<typeof messageSchema>
