import { render, screen, fireEvent } from '@testing-library/react'
import ChannelListItem from './ChannelListItem'
import { deleteChannel } from '@/lib/actions/channel'

jest.mock('@/lib/actions/channel', () => ({
  deleteChannel: jest.fn(),
}))

const channel = { id: 'chan-1', name: 'general', is_private: false }

describe('ChannelListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the channel name', () => {
    render(<ChannelListItem channel={channel} workspaceSlug="acme" isActive={false} />)
    expect(screen.getByText('general')).toBeInTheDocument()
  })

  it('links to the correct channel URL', () => {
    render(<ChannelListItem channel={channel} workspaceSlug="acme" isActive={false} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/workspace/acme/channel/chan-1')
  })

  it('calls deleteChannel when the delete button is confirmed', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    render(<ChannelListItem channel={channel} workspaceSlug="acme" isActive={false} />)

    fireEvent.click(screen.getByRole('button', { name: /delete #general/i }))

    expect(deleteChannel).toHaveBeenCalledWith('chan-1', 'acme')
  })

  it('does not call deleteChannel when the confirm dialog is cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false)
    render(<ChannelListItem channel={channel} workspaceSlug="acme" isActive={false} />)

    fireEvent.click(screen.getByRole('button', { name: /delete #general/i }))

    expect(deleteChannel).not.toHaveBeenCalled()
  })
})
