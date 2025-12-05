import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Force dynamic rendering for catalogue route to prevent 404 errors
  if (request.nextUrl.pathname === '/catalogue') {
    const response = NextResponse.next()
    // Add header to prevent static optimization
    response.headers.set('x-middleware-cache', 'no-cache')
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/catalogue',
}
