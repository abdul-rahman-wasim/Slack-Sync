import { initials, colorFor } from '@/lib/avatar'

type Message = { id: string; user_id: string; content: string; created_at: string }
type Profile = { username: string; avatar_url: string | null }

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export default function MessageItem({
  message,
  profile,
  isOwn,
}: {
  message: Message
  profile?: Profile
  isOwn: boolean
}) {
  const name = profile?.username ?? 'Unknown'

  return (
    <div className={`flex gap-3 px-6 py-1.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <span
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: colorFor(name) }}
      >
        {initials(name)}
      </span>
      <div className={`max-w-[68%] ${isOwn ? 'items-end text-right' : ''}`}>
        <div className={`flex items-baseline gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-semibold">{isOwn ? 'You' : name}</span>
          <span className="text-[11px] text-muted-foreground">{formatTime(message.created_at)}</span>
        </div>
        <div
          className={`mt-1 inline-block rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
            isOwn
              ? 'rounded-tr-sm bg-primary text-primary-foreground'
              : 'rounded-tl-sm bg-muted text-foreground'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}
