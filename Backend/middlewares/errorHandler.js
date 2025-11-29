/**
 * Middleware de gestion centralisée des erreurs
 */

/**
 * Gestionnaire d'erreurs principal
 * Doit être le dernier middleware ajouté à l'application
 */
const errorHandler = (err, req, res, next) => {
  // Log de l'erreur pour le débogage
  console.error(`❌ Erreur ${req.method} ${req.originalUrl}:`, err);

  // Erreur déjà traitée, passer au middleware suivant
  if (res.headersSent) {
    return next(err);
  }

  // Détermination du type d'erreur et de la réponse appropriée
  let statusCode = 500;
  let message = 'Erreur interne du serveur';
  let details = null;

  // Gestion spécifique selon le type d'erreur
  if (err.name === 'ValidationError') {
    // Erreurs de validation MongoDB/Mongoose
    statusCode = 400;
    message = 'Données invalides';
    details = Object.values(err.errors).map(error => error.message);
  } else if (err.name === 'CastError') {
    // Erreurs de casting MongoDB
    statusCode = 400;
    message = 'Format de données incorrect';
  } else if (err.code === 11000) {
    // Erreur de duplication MongoDB
    statusCode = 400;
    message = 'Données déjà existantes';
  } else if (err.name === 'JsonWebTokenError') {
    // Erreurs JWT
    statusCode = 401;
    message = 'Token invalide';
  } else if (err.name === 'TokenExpiredError') {
    // Token expiré
    statusCode = 401;
    message = 'Token expiré';
  } else if (err.message && err.message.includes('SMTP')) {
    // Erreurs SMTP/Email
    statusCode = 503;
    message = 'Service d\'email temporairement indisponible';
  } else if (err.message && err.message.includes('API')) {
    // Erreurs d'API externe
    statusCode = 503;
    message = 'Service externe temporairement indisponible';
  } else if (err.statusCode || err.status) {
    // Erreurs avec status code défini
    statusCode = err.statusCode || err.status;
    message = err.message || message;
  } else if (err.message) {
    // Autres erreurs avec message
    message = err.message;
  }

  // Construction de la réponse d'erreur
  const errorResponse = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  };

  // Ajout des détails en mode développement
  if (process.env.NODE_ENV === 'development') {
    errorResponse.details = details;
    errorResponse.stack = err.stack;
  }

  // Ajout de l'ID de requête si disponible
  if (req.id) {
    errorResponse.requestId = req.id;
  }

  // Envoi de la réponse d'erreur
  res.status(statusCode).json(errorResponse);
};

module.exports = {
  errorHandler
};
