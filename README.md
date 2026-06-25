# SlackSync

A real-time team chat application built with Next.js 15 and Supabase. Supports workspaces, public/private channels, and live messaging — built as a learning project to go deep on Supabase (Auth, Realtime, RLS) end to end.

Live demo: [slack-sync-three.vercel.app](https://slack-sync-three.vercel.app)

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (Auth, Database, Realtime, Storage) |
| Client state | Zustand |
| Server state | TanStack Query |
| Forms | React Hook Form + Zod |
| Testing | Jest + React Testing Library |
| CI/CD | GitHub Actions |
| Hosting | Vercel |

## Features

- Magic link and Google OAuth authentication
- Workspaces with public and private channels — create, delete, leave, add members by username
- Real-time messaging and live-syncing workspace/channel lists via Supabase Realtime (Postgres Changes)
- Custom UI built from a [Lovable](https://lovable.dev) design reference — OKLCH theme, icon-rail workspace switcher, speech-bubble message styling

Out of scope for this round (see `CLAUDE.md` / project plan): direct messages, file uploads, and presence/typing indicators.

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project ([supabase.com](https://supabase.com))
- A Google OAuth app (for Google sign-in)

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/         # Login page (magic link + Google OAuth)
│   ├── (app)/                # Protected app routes (workspace, channel, onboarding)
│   └── auth/callback/        # OAuth + magic link callback handler
├── components/
│   ├── auth/                 # Auth UI components
│   ├── chat/                 # Message list/item/input, leave-channel button
│   ├── workspace/sidebar/    # Workspace rail, channel list, dialogs, user footer
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── actions/               # Server Actions (auth, workspace, channel)
│   ├── supabase/              # Supabase client files (browser, server, middleware)
│   ├── avatar.ts               # Deterministic name-hash colors + initials for badges
│   └── workspace.ts           # Default-workspace redirect helper
└── hooks/                    # useMessages / useChannels / useWorkspaces (Realtime + TanStack Query)
```

## Commands

```bash
npm run dev       # Start development server
npm test          # Run tests
npm run build     # Production build
npx tsc --noEmit  # Type check
```
