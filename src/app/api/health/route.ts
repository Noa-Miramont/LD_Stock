import { NextResponse } from 'next/server'
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit'

/**
 * GET /api/health - Route de santé
 */
export async function GET(req: Request) {
  try {
    // Rate limiting général (100 requêtes par 15 minutes)
    const clientId = getClientIdentifier(req)
    const rateLimit = checkRateLimit(clientId, 15 * 60 * 1000, 100)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          status: 'RATE_LIMITED',
          message: 'Trop de requêtes, veuillez réessayer plus tard.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '100',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    return NextResponse.json({
      status: 'OK',
      message: 'Backend API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'ERROR',
        message: 'Health check failed',
        error: error.message
      },
      { status: 500 }
    )
  }
}

