/**
 * Validation du formulaire de contact
 * Reproduit les règles de validation du backend Express original
 */

export interface ValidationError {
  param: string
  msg: string
}

/**
 * Valide les données du formulaire selon les règles du backend
 */
export function validateFormData(formData: any): { isValid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = []

  // Validation du nom
  if (!formData.nom || typeof formData.nom !== 'string') {
    errors.push({ param: 'nom', msg: 'Le nom est obligatoire' })
  } else {
    const nom = formData.nom.trim()
    if (nom.length < 2 || nom.length > 100) {
      errors.push({ param: 'nom', msg: 'Le nom doit contenir entre 2 et 100 caractères' })
    } else if (!/^[a-zA-ZÀ-ÿ0-9\s\-'\.]+$/.test(nom)) {
      errors.push({ param: 'nom', msg: 'Le nom contient des caractères non autorisés' })
    }
  }

  // Validation de l'email
  if (!formData.email || typeof formData.email !== 'string') {
    errors.push({ param: 'email', msg: 'L\'email est obligatoire' })
  } else {
    const email = formData.email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.push({ param: 'email', msg: 'Format d\'email invalide' })
    } else if (email.length > 100) {
      errors.push({ param: 'email', msg: 'L\'email ne peut pas dépasser 100 caractères' })
    }
  }

  // Validation du téléphone
  if (!formData.telephone || typeof formData.telephone !== 'string') {
    errors.push({ param: 'telephone', msg: 'Le téléphone est obligatoire' })
  } else {
    const telephone = formData.telephone.trim()
    if (!/^[\d\s\+\-\(\)\.]{8,20}$/.test(telephone)) {
      errors.push({ param: 'telephone', msg: 'Format de téléphone invalide (8 à 20 caractères, chiffres, espaces, +, -, (, ), . autorisés)' })
    }
  }

  // Validation du type de demande
  const validTypes = [
    'Location de conteneur',
    'Achat de conteneur',
    'Achat de bungalow',
    'Je souhaite juste obtenir un renseignement',
    'Demande d\'information',
    'Demande de devis',
    'Question technique',
    'Support client',
    'Rendez-vous',
    'Partenariat',
    'Autre demande'
  ]

  if (!formData.typedemande || typeof formData.typedemande !== 'string') {
    errors.push({ param: 'typedemande', msg: 'Le type de demande est obligatoire' })
  } else if (!validTypes.includes(formData.typedemande)) {
    errors.push({ param: 'typedemande', msg: 'Type de demande invalide' })
  }

  // Validation du message (optionnel)
  if (formData.message && typeof formData.message === 'string') {
    const message = formData.message.trim()
    if (message.length > 2000) {
      errors.push({ param: 'message', msg: 'Le message ne peut pas dépasser 2000 caractères' })
    }
  }

  // Validation du service (optionnel)
  if (formData.service && typeof formData.service === 'string') {
    const service = formData.service.trim()
    if (service.length > 100) {
      errors.push({ param: 'service', msg: 'Le service ne peut pas dépasser 100 caractères' })
    }
  }

  // Validation de la taille (optionnel)
  if (formData.taille && typeof formData.taille === 'string') {
    const taille = formData.taille.trim()
    if (taille.length > 50) {
      errors.push({ param: 'taille', msg: 'La taille ne peut pas dépasser 50 caractères' })
    }
  }

  // Validation de la localisation (optionnel)
  if (formData.localisation && typeof formData.localisation === 'string') {
    const localisation = formData.localisation.trim()
    if (localisation.length > 100) {
      errors.push({ param: 'localisation', msg: 'La localisation ne peut pas dépasser 100 caractères' })
    }
  }

  // Validation du type de conteneur (optionnel)
  if (formData.typeConteneur && typeof formData.typeConteneur === 'string') {
    const typeConteneur = formData.typeConteneur.trim()
    if (typeConteneur.length > 100) {
      errors.push({ param: 'typeConteneur', msg: 'Le type de conteneur ne peut pas dépasser 100 caractères' })
    }
  }

  // Validation de la ville (optionnel)
  if (formData.ville && typeof formData.ville === 'string') {
    const ville = formData.ville.trim()
    if (ville.length > 50) {
      errors.push({ param: 'ville', msg: 'Le nom de ville ne peut pas dépasser 50 caractères' })
    }
  }

  // Validation du code postal (optionnel)
  if (formData.codepostal && typeof formData.codepostal === 'string') {
    const codepostal = formData.codepostal.trim()
    if (!/^[0-9]{5}$/.test(codepostal)) {
      errors.push({ param: 'codepostal', msg: 'Le code postal doit contenir exactement 5 chiffres' })
    }
  }

  // Protection contre le spam (honeypot)
  if (formData.honeypot && typeof formData.honeypot === 'string' && formData.honeypot.trim() !== '') {
    errors.push({ param: 'honeypot', msg: 'Soumission suspecte détectée' })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
