import { render, screen } from '@testing-library/react'
import MessageItem from './MessageItem'

const baseMessage = {
  id: 'msg-1',
  user_id: 'user-1',
  content: 'Hello team!',
  created_at: '2026-01-01T12:00:00Z',
}

describe('MessageItem', () => {
  it('shows the sender username for messages from other users', () => {
    render(
      <MessageItem
        message={baseMessage}
        profile={{ username: 'abdul', avatar_url: null }}
        isOwn={false}
      />
    )
    expect(screen.getByText('abdul')).toBeInTheDocument()
    expect(screen.getByText('Hello team!')).toBeInTheDocument()
  })

  it('shows "You" instead of the username for own messages', () => {
    render(
      <MessageItem
        message={baseMessage}
        profile={{ username: 'abdul', avatar_url: null }}
        isOwn={true}
      />
    )
    expect(screen.getByText('You')).toBeInTheDocument()
    expect(screen.queryByText('abdul')).not.toBeInTheDocument()
  })

  it('falls back to "Unknown" when no profile is available', () => {
    render(<MessageItem message={baseMessage} isOwn={false} />)
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('renders initials derived from the sender name', () => {
    render(
      <MessageItem
        message={baseMessage}
        profile={{ username: 'abdul', avatar_url: null }}
        isOwn={false}
      />
    )
    expect(screen.getByText('AB')).toBeInTheDocument()
  })
})
