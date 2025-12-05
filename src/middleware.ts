import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // The layout.tsx with dynamic = 'force-dynamic' handles the routing
  // This middleware is kept for additional safety
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/catalogue',
    '/catalogue/:path*',
  ],
}
