# SlackSync

A real-time team chat application built with Next.js 15 and Supabase. Supports workspaces, channels, direct messages, file sharing, and online presence.

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
- Workspaces with public and private channels
- Real-time messaging via Supabase Realtime (Postgres Changes)
- Direct messages between workspace members
- File and image sharing via Supabase Storage
- Online presence and typing indicators

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
│   ├── (app)/                # Protected app routes
│   └── auth/callback/        # OAuth + magic link callback handler
├── components/
│   ├── auth/                 # Auth UI components
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── actions/              # Server Actions (auth, messages, etc.)
│   └── supabase/             # Supabase client files (browser, server, middleware)
└── hooks/                    # Custom React hooks
```

## Commands

```bash
npm run dev       # Start development server
npm test          # Run tests
npm run build     # Production build
npx tsc --noEmit  # Type check
```
