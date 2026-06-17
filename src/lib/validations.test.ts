import { emailSchema, workspaceSchema, channelSchema, messageSchema } from '@/lib/validations'

describe('emailSchema', () => {
  it('accepts a valid email', () => {
    expect(emailSchema.safeParse({ email: 'user@example.com' }).success).toBe(true)
  })
  it('rejects an invalid email', () => {
    expect(emailSchema.safeParse({ email: 'not-an-email' }).success).toBe(false)
  })
  it('rejects empty string', () => {
    expect(emailSchema.safeParse({ email: '' }).success).toBe(false)
  })
})

describe('workspaceSchema', () => {
  it('accepts valid workspace data', () => {
    expect(workspaceSchema.safeParse({ name: 'My Team', slug: 'my-team' }).success).toBe(true)
  })
  it('rejects name shorter than 2 characters', () => {
    expect(workspaceSchema.safeParse({ name: 'A', slug: 'a' }).success).toBe(false)
  })
  it('rejects slug with uppercase letters', () => {
    expect(workspaceSchema.safeParse({ name: 'My Team', slug: 'My-Team' }).success).toBe(false)
  })
  it('rejects slug with spaces', () => {
    expect(workspaceSchema.safeParse({ name: 'My Team', slug: 'my team' }).success).toBe(false)
  })
})

describe('channelSchema', () => {
  it('accepts a valid channel name', () => {
    expect(channelSchema.safeParse({ name: 'general' }).success).toBe(true)
  })
  it('rejects channel name with spaces', () => {
    expect(channelSchema.safeParse({ name: 'general chat' }).success).toBe(false)
  })
  it('rejects empty channel name', () => {
    expect(channelSchema.safeParse({ name: '' }).success).toBe(false)
  })
})

describe('messageSchema', () => {
  it('accepts a valid message', () => {
    expect(messageSchema.safeParse({ content: 'Hello!' }).success).toBe(true)
  })
  it('rejects empty message', () => {
    expect(messageSchema.safeParse({ content: '' }).success).toBe(false)
  })
  it('rejects message over 4000 characters', () => {
    expect(messageSchema.safeParse({ content: 'a'.repeat(4001) }).success).toBe(false)
  })
})
