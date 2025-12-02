import { NextResponse } from 'next/server'

/**
 * Gestionnaire d'erreurs pour les API routes Next.js
 */
export function handleError(error: any, req: Request) {
  // Log de l'erreur pour le débogage
  console.error(`❌ Erreur ${req.method} ${req.url}:`, error)

  // Détermination du type d'erreur et de la réponse appropriée
  let statusCode = 500
  let message = 'Erreur interne du serveur'
  let details = null

  // Gestion spécifique selon le type d'erreur
  if (error.name === 'ValidationError') {
    // Erreurs de validation MongoDB/Mongoose
    statusCode = 400
    message = 'Données invalides'
    details = Object.values(error.errors).map((err: any) => err.message)
  } else if (error.name === 'CastError') {
    // Erreurs de casting MongoDB
    statusCode = 400
    message = 'Format de données incorrect'
  } else if (error.code === 11000) {
    // Erreur de duplication MongoDB
    statusCode = 400
    message = 'Données déjà existantes'
  } else if (error.name === 'JsonWebTokenError') {
    // Erreurs JWT
    statusCode = 401
    message = 'Token invalide'
  } else if (error.name === 'TokenExpiredError') {
    // Token expiré
    statusCode = 401
    message = 'Token expiré'
  } else if (error.message && error.message.includes('SMTP')) {
    // Erreurs SMTP/Email
    statusCode = 503
    message = 'Service d\'email temporairement indisponible'
  } else if (error.message && error.message.includes('API')) {
    // Erreurs d'API externe
    statusCode = 503
    message = 'Service externe temporairement indisponible'
  } else if (error.statusCode || error.status) {
    // Erreurs avec status code défini
    statusCode = error.statusCode || error.status
    message = error.message || message
  } else if (error.message) {
    // Autres erreurs avec message
    message = error.message
  }

  // Construction de la réponse d'erreur
  const errorResponse: any = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  }

  // Ajout des détails en mode développement
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = details
    errorResponse.stack = error.stack
  }

  return NextResponse.json(errorResponse, { status: statusCode })
}

