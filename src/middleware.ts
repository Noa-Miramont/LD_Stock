import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes valides avec leur casse correcte
const validRoutes: Record<string, string> = {
  '/catalogue': '/catalogue',
  '/contact': '/contact',
  '/produit': '/produit',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorer les routes API, les fichiers statiques et les fichiers Next.js
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/img/') ||
    pathname.startsWith('/logo/') ||
    pathname.includes('.') // Fichiers avec extension
  ) {
    return NextResponse.next()
  }

  // Vérifier si le pathname correspond à une route valide mais avec une mauvaise casse
  const lowerPathname = pathname.toLowerCase()
  
  // Si le pathname en minuscule correspond à une route valide mais que le pathname original est différent
  if (validRoutes[lowerPathname] && pathname !== validRoutes[lowerPathname]) {
    // Construire la nouvelle URL avec la bonne casse
    const url = request.nextUrl.clone()
    url.pathname = validRoutes[lowerPathname]
    
    // Préserver les query parameters
    return NextResponse.redirect(url, 301) // 301 = redirection permanente
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
