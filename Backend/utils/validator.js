/**
 * Utilitaires de validation pour l'application
 */

/**
 * Validation d'un email français
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validation d'un numéro de téléphone français
 */
const isValidFrenchPhone = (phone) => {
  // Supprime tous les espaces, points et tirets
  const cleanPhone = phone.replace(/[\s.-]/g, '');
  
  // Regex pour numéros français (avec ou sans indicatif)
  const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/;
  
  return phoneRegex.test(cleanPhone);
};

/**
 * Validation d'un code postal français
 */
const isValidFrenchPostalCode = (postalCode) => {
  const postalRegex = /^[0-9]{5}$/;
  return postalRegex.test(postalCode);
};

/**
 * Validation d'un nom (prénom/nom de famille)
 */
const isValidName = (name) => {
  // Autorise lettres, espaces, tirets et apostrophes
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/;
  return nameRegex.test(name.trim());
};

/**
 * Validation de la longueur d'un texte
 */
const isValidLength = (text, min = 0, max = Infinity) => {
  const length = text ? text.trim().length : 0;
  return length >= min && length <= max;
};

/**
 * Nettoyage et sanitisation d'une chaîne de caractères
 */
const sanitizeString = (str) => {
  if (!str) return '';
  
  return str
    .trim()
    .replace(/\s+/g, ' ') // Remplace les espaces multiples par un seul
    .replace(/[<>]/g, ''); // Supprime les caractères potentiellement dangereux
};

/**
 * Validation des données du formulaire de contact
 */
const validateContactForm = (formData) => {
  const errors = [];
  
  // Validation du nom
  if (!formData.nom || !isValidName(formData.nom)) {
    errors.push({
      field: 'nom',
      message: 'Le nom doit contenir entre 2 et 50 caractères (lettres, espaces, tirets et apostrophes uniquement)'
    });
  }
  
  // Validation de l'email
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.push({
      field: 'email',
      message: 'Format d\'email invalide'
    });
  }
  
  // Validation du téléphone (optionnel)
  if (formData.telephone && !isValidFrenchPhone(formData.telephone)) {
    errors.push({
      field: 'telephone',
      message: 'Format de téléphone français invalide'
    });
  }
  
  // Validation du type de demande
  const validTypes = [
    'Demande d\'information',
    'Demande de devis',
    'Question technique',
    'Support client',
    'Rendez-vous',
    'Partenariat',
    'Autre demande'
  ];
  
  if (!formData.typedemande || !validTypes.includes(formData.typedemande)) {
    errors.push({
      field: 'typedemande',
      message: 'Type de demande invalide'
    });
  }
  
  // Validation du message (optionnel, mais minimum 10 caractères si fourni)
  if (formData.message && formData.message.trim().length > 0) {
    if (!isValidLength(formData.message, 10, 1000)) {
      errors.push({
        field: 'message',
        message: 'Le message doit contenir entre 10 et 1000 caractères'
      });
    }
  }
  
  // Validation du code postal (optionnel)
  if (formData.codepostal && !isValidFrenchPostalCode(formData.codepostal)) {
    errors.push({
      field: 'codepostal',
      message: 'Code postal invalide (5 chiffres attendus)'
    });
  }
  
  // Validation de la ville (optionnel)
  if (formData.ville && !isValidLength(formData.ville, 1, 50)) {
    errors.push({
      field: 'ville',
      message: 'Le nom de ville ne peut pas dépasser 50 caractères'
    });
  }
  
  // Protection anti-spam (honeypot)
  if (formData.honeypot && formData.honeypot.trim() !== '') {
    errors.push({
      field: 'honeypot',
      message: 'Soumission suspecte détectée'
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitise les données du formulaire
 */
const sanitizeContactForm = (formData) => {
  return {
    nom: sanitizeString(formData.nom),
    email: formData.email ? formData.email.trim().toLowerCase() : '',
    telephone: formData.telephone ? formData.telephone.replace(/[\s.-]/g, '') : '',
    typedemande: sanitizeString(formData.typedemande),
    message: sanitizeString(formData.message),
    ville: sanitizeString(formData.ville),
    codepostal: formData.codepostal ? formData.codepostal.trim() : '',
    honeypot: formData.honeypot || ''
  };
};

/**
 * Validation des paramètres de requête pour les avis
 */
const validateReviewParams = (params) => {
  const errors = [];
  
  // Validation du nombre limite d'avis
  if (params.limit) {
    const limit = parseInt(params.limit);
    if (isNaN(limit) || limit < 1 || limit > 50) {
      errors.push({
        field: 'limit',
        message: 'La limite doit être un nombre entre 1 et 50'
      });
    }
  }
  
  // Validation du tri
  const validSortOptions = ['newest', 'oldest', 'rating_high', 'rating_low'];
  if (params.sort && !validSortOptions.includes(params.sort)) {
    errors.push({
      field: 'sort',
      message: 'Option de tri invalide'
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Utilitaire pour vérifier si une chaîne contient du spam
 */
const containsSpam = (text) => {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'prize',
    'free money', 'click here', 'limited time'
  ];
  
  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
};

/**
 * Validation de l'origine de la requête (protection CSRF basique)
 */
const isValidOrigin = (origin, allowedOrigins = []) => {
  if (!origin) return false;
  
  const defaultAllowed = [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL
  ].filter(Boolean);
  
  const allowed = [...defaultAllowed, ...allowedOrigins];
  return allowed.includes(origin);
};

module.exports = {
  isValidEmail,
  isValidFrenchPhone,
  isValidFrenchPostalCode,
  isValidName,
  isValidLength,
  sanitizeString,
  validateContactForm,
  sanitizeContactForm,
  validateReviewParams,
  containsSpam,
  isValidOrigin
};
