type Message = { id: string; user_id: string; content: string; created_at: string }
type Profile = { username: string; avatar_url: string | null }

export default function MessageItem({
  message,
  profile,
  isOwn,
}: {
  message: Message
  profile?: Profile
  isOwn: boolean
}) {
  const time = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`mb-3 flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md rounded-lg px-3 py-2 ${isOwn ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        {!isOwn && (
          <p className="mb-0.5 text-xs font-semibold text-gray-500">
            {profile?.username ?? 'Unknown'}
          </p>
        )}
        <p className="text-sm">{message.content}</p>
        <p className={`mt-1 text-[10px] ${isOwn ? 'text-gray-300' : 'text-gray-400'}`}>{time}</p>
      </div>
    </div>
  )
}
