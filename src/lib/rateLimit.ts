/**
 * Rate limiting simple pour Next.js API routes
 * Utilise un Map en mémoire (pour Vercel, considérer Redis en production)
 */

interface RateLimitStore {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitStore>()

/**
 * Nettoie les entrées expirées du store
 */
const cleanup = () => {
  const now = Date.now()
  for (const [key, value] of store.entries()) {
    if (value.resetTime < now) {
      store.delete(key)
    }
  }
}

/**
 * Vérifie et applique le rate limiting
 * @param identifier - Identifiant unique (IP, user ID, etc.)
 * @param windowMs - Fenêtre de temps en millisecondes
 * @param max - Nombre maximum de requêtes
 * @returns { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(
  identifier: string,
  windowMs: number,
  max: number
): { allowed: boolean; remaining: number; resetTime: number } {
  cleanup()

  const now = Date.now()
  const record = store.get(identifier)

  if (!record || record.resetTime < now) {
    // Nouvelle fenêtre
    const resetTime = now + windowMs
    store.set(identifier, { count: 1, resetTime })
    return {
      allowed: true,
      remaining: max - 1,
      resetTime
    }
  }

  // Fenêtre existante
  if (record.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    }
  }

  record.count++
  return {
    allowed: true,
    remaining: max - record.count,
    resetTime: record.resetTime
  }
}

/**
 * Obtient l'identifiant de l'utilisateur depuis la requête
 * Pour Vercel, utilise les headers X-Forwarded-For ou X-Real-IP
 */
export function getClientIdentifier(req: Request): string {
  // Pour Vercel, utiliser les headers de proxy
  const forwardedFor = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'
  
  return ip
}

