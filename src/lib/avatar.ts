export function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const PALETTE = [
  "oklch(0.55 0.16 318)",
  "oklch(0.55 0.14 200)",
  "oklch(0.58 0.15 145)",
  "oklch(0.62 0.16 70)",
  "oklch(0.6 0.18 25)",
  "oklch(0.55 0.15 265)",
]

export function colorFor(key: string): string {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}
