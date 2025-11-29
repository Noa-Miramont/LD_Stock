const express = require('express');
const { body } = require('express-validator');
const formController = require('../controllers/formController');

const router = express.Router();

/**
 * Règles de validation pour le formulaire de contact
 */
const formValidationRules = [
  body('nom')
    .trim()
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères')
    .matches(/^[a-zA-ZÀ-ÿ0-9\s\-'\.]+$/)
    .withMessage('Le nom contient des caractères non autorisés'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('L\'email est obligatoire')
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('L\'email ne peut pas dépasser 100 caractères'),

  body('telephone')
    .notEmpty()
    .withMessage('Le téléphone est obligatoire')
    .trim()
    .matches(/^[\d\s\+\-\(\)\.]{8,20}$/)
    .withMessage('Format de téléphone invalide (8 à 20 caractères, chiffres, espaces, +, -, (, ), . autorisés)'),

  body('typedemande')
    .notEmpty()
    .withMessage('Le type de demande est obligatoire')
    .isIn([
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
    ])
    .withMessage('Type de demande invalide'),

  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Le message ne peut pas dépasser 2000 caractères'),

  // Champs optionnels avec validation
  body('service')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le service ne peut pas dépasser 100 caractères'),

  body('taille')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La taille ne peut pas dépasser 50 caractères'),

  body('localisation')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('La localisation ne peut pas dépasser 100 caractères'),

  body('typeConteneur')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le type de conteneur ne peut pas dépasser 100 caractères'),

  body('ville')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Le nom de ville ne peut pas dépasser 50 caractères'),

  body('codepostal')
    .optional()
    .trim()
    .matches(/^[0-9]{5}$/)
    .withMessage('Le code postal doit contenir exactement 5 chiffres'),

  // Protection contre le spam
  body('honeypot')
    .optional()
    .isEmpty()
    .withMessage('Soumission suspecte détectée')
];

/**
 * Routes pour la gestion des formulaires
 */

// POST /api/form/submit - Soumission du formulaire de contact
router.post('/submit', formValidationRules, formController.submitForm);

// POST /api/form/validate - Validation des données sans envoi d'email (debug)
router.post('/validate', formValidationRules, formController.validateForm);

// GET /api/form/types - Récupération des types de demandes disponibles
router.get('/types', formController.getFormTypes);

// GET /api/form/test - Test du service de formulaire
router.get('/test', formController.testForm);

module.exports = router;
