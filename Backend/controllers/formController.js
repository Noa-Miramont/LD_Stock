const { validationResult } = require('express-validator');
const mailService = require('../services/mailService');

/**
 * Contrôleur pour la gestion des formulaires de contact/devis
 */
class FormController {
  /**
   * Traite la soumission d'un formulaire de contact
   * POST /api/form/submit
   */
  async submitForm(req, res, next) {
    try {
      // Vérification des erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Données de formulaire invalides',
          errors: errors.array()
        });
      }

      const formData = req.body;
      
      // Log de la réception du formulaire (sans données sensibles)
      console.log(`📝 Nouveau formulaire reçu de: ${formData.email || 'email non fourni'}`);
      console.log(`📋 Type de demande: ${formData.typedemande || 'non spécifié'}`);

      // Vérifier si le service mail est configuré
      const isMailConfigured = process.env.GMAIL_USER && process.env.GMAIL_PASSWORD && process.env.ADMIN_EMAIL;
      
      if (!isMailConfigured) {
        console.warn('⚠️ Service mail non configuré - les emails ne seront pas envoyés');
        console.warn('⚠️ Variables requises: GMAIL_USER, GMAIL_PASSWORD, ADMIN_EMAIL');
        
        // En mode développement, retourner un succès même sans email
        if (process.env.NODE_ENV === 'development') {
          return res.status(200).json({
            success: true,
            message: 'Votre demande a été reçue avec succès. (Mode développement: emails non configurés)',
            warning: 'Le service email n\'est pas configuré. Configurez GMAIL_USER, GMAIL_PASSWORD et ADMIN_EMAIL dans le fichier .env',
            data: {
              adminEmailSent: false,
              confirmationEmailSent: false,
              submittedAt: new Date().toISOString(),
              formData: {
                nom: formData.nom,
                email: formData.email,
                typedemande: formData.typedemande
              }
            }
          });
        } else {
          // En production, c'est une erreur critique
          throw new Error('Service email non configuré. Veuillez contacter l\'administrateur.');
        }
      }

      // Envoi des emails en parallèle pour optimiser les performances
      const emailPromises = [
        mailService.sendAdminNotification(formData),
        mailService.sendClientConfirmation(formData)
      ];

      const emailResults = await Promise.allSettled(emailPromises);
      
      // Vérification des résultats d'envoi
      const adminEmailSuccess = emailResults[0].status === 'fulfilled';
      const clientEmailSuccess = emailResults[1].status === 'fulfilled';

      // Log des erreurs d'email si nécessaire
      if (!adminEmailSuccess) {
        console.error('❌ Erreur envoi email admin:', emailResults[0].reason);
        console.error('❌ Détails:', emailResults[0].reason?.message || emailResults[0].reason);
      }
      if (!clientEmailSuccess) {
        console.error('❌ Erreur envoi email client:', emailResults[1].reason);
        console.error('❌ Détails:', emailResults[1].reason?.message || emailResults[1].reason);
      }

      // Réponse selon le succès des envois
      if (adminEmailSuccess && clientEmailSuccess) {
        // Succès complet
        return res.status(200).json({
          success: true,
          message: 'Votre demande a été envoyée avec succès. Vous allez recevoir un email de confirmation.',
          data: {
            adminEmailSent: true,
            confirmationEmailSent: true,
            submittedAt: new Date().toISOString()
          }
        });
      } else if (adminEmailSuccess) {
        // Seul l'email admin a réussi
        return res.status(200).json({
          success: true,
          message: 'Votre demande a été envoyée avec succès.',
          warning: 'L\'email de confirmation n\'a pas pu être envoyé.',
          data: {
            adminEmailSent: true,
            confirmationEmailSent: false,
            submittedAt: new Date().toISOString()
          }
        });
      } else {
        // Échec des envois d'emails - mais on retourne quand même un succès avec un avertissement
        const errorMessage = adminEmailSuccess === false 
          ? emailResults[0].reason?.message || 'Erreur inconnue'
          : 'Erreur lors de l\'envoi des emails';
        
        console.error('❌ Échec envoi emails:', errorMessage);
        
        // En développement, on accepte quand même la soumission
        if (process.env.NODE_ENV === 'development') {
          return res.status(200).json({
            success: true,
            message: 'Votre demande a été reçue. (Erreur lors de l\'envoi des emails)',
            warning: `Erreur email: ${errorMessage}. Vérifiez la configuration Gmail.`,
            data: {
              adminEmailSent: false,
              confirmationEmailSent: false,
              submittedAt: new Date().toISOString()
            }
          });
        } else {
          // En production, on lance une erreur
          throw new Error(`Impossible d'envoyer les emails: ${errorMessage}`);
        }
      }

    } catch (error) {
      console.error('❌ Erreur lors du traitement du formulaire:', error);
      next(error);
    }
  }

  /**
   * Endpoint de test pour vérifier le fonctionnement
   * GET /api/form/test
   */
  async testForm(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Service de formulaire opérationnel',
        timestamp: new Date().toISOString(),
        config: {
          adminEmail: process.env.ADMIN_EMAIL ? 'configuré' : 'non configuré',
          smtpConfig: process.env.GMAIL_USER ? 'configuré' : 'non configuré'
        }
      });
    } catch (error) {
      console.error('❌ Erreur test formulaire:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors du test du service'
      });
    }
  }

  /**
   * Endpoint de debug pour tester la validation sans envoyer d'emails
   * POST /api/form/validate
   */
  async validateForm(req, res) {
    try {
      // Vérification des erreurs de validation
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(200).json({
          success: false,
          message: 'Validation échouée',
          errors: errors.array(),
          receivedData: req.body
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Validation réussie - les données sont valides',
        receivedData: req.body
      });
    } catch (error) {
      console.error('❌ Erreur validation:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la validation'
      });
    }
  }

  /**
   * Récupère les types de demandes disponibles
   * GET /api/form/types
   */
  async getFormTypes(req, res) {
    try {
      // Types de demandes génériques - À personnaliser selon votre activité
      const formTypes = [
        'Demande d\'information',
        'Demande de devis',
        'Question technique',
        'Support client',
        'Rendez-vous',
        'Partenariat',
        'Autre demande'
      ];

      res.status(200).json({
        success: true,
        data: formTypes
      });
    } catch (error) {
      console.error('❌ Erreur récupération types:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des types de demande'
      });
    }
  }
}

module.exports = new FormController();
