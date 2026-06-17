import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-lg text-gray-500">Page not found</p>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  )
}
