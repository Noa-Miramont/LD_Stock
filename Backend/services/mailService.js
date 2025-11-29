const { createTransporter, getDefaultMailOptions, emailTemplates } = require('../config/mailer');

/**
 * Service pour l'envoi d'emails via Nodemailer
 */
class MailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.initializeTransporter();
  }

  /**
   * Initialise le transporteur Nodemailer
   */
  initializeTransporter() {
    try {
      this.transporter = createTransporter();
      // On considère le service comme configuré même si la vérification échoue
      // La vérification réelle se fera lors de l'envoi
      this.isConfigured = true;
      console.log('✅ Service mail initialisé (vérification de connexion en cours...)');
    } catch (error) {
      console.error('❌ Erreur initialisation service mail:', error.message);
      this.isConfigured = false;
    }
  }

  /**
   * Vérifie si le service mail est configuré
   */
  checkConfiguration() {
    if (!this.isConfigured || !this.transporter) {
      throw new Error('Service mail non configuré - vérifiez GMAIL_USER et GMAIL_PASSWORD dans le fichier .env');
    }
    
    // Vérifier que les variables d'environnement sont présentes
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      throw new Error('Variables GMAIL_USER et GMAIL_PASSWORD manquantes dans le fichier .env');
    }
    
    if (!process.env.ADMIN_EMAIL) {
      throw new Error('Variable ADMIN_EMAIL manquante dans le fichier .env');
    }
  }

  /**
   * Envoie un email à l'administrateur avec les données du formulaire
   * @param {Object} formData - Données du formulaire de contact
   */
  async sendAdminNotification(formData) {
    this.checkConfiguration();

    try {
      const defaultOptions = getDefaultMailOptions();
      
      const mailOptions = {
        ...defaultOptions,
        to: process.env.ADMIN_EMAIL,
        subject: `🔔 Nouveau message depuis le site - ${formData.typedemande || 'Contact'}`,
        html: emailTemplates.adminNotification(formData),
        // Version texte de secours
        text: this.createPlainTextVersion(formData, 'admin')
      };

      console.log(`📤 Envoi email admin à: ${process.env.ADMIN_EMAIL}`);
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email admin envoyé avec succès:', result.messageId);
      return {
        success: true,
        messageId: result.messageId,
        recipient: process.env.ADMIN_EMAIL
      };

    } catch (error) {
      console.error('❌ Erreur envoi email admin:', error);
      
      // Message d'erreur plus détaillé selon le type d'erreur
      let errorMessage = `Impossible d'envoyer l'email à l'administrateur: ${error.message}`;
      
      if (error.code === 'EAUTH') {
        errorMessage = `Erreur d'authentification Gmail. Vérifiez que vous utilisez un "Mot de passe d'application" (pas votre mot de passe habituel). Créez-en un sur: https://myaccount.google.com/apppasswords`;
      } else if (error.message && error.message.includes('Invalid login')) {
        errorMessage = `Identifiants Gmail invalides. Vérifiez GMAIL_USER et GMAIL_PASSWORD dans le fichier .env. Utilisez un "Mot de passe d'application" Gmail.`;
      }
      
      throw new Error(errorMessage);
    }
  }

  /**
   * Envoie un email de confirmation au client
   * @param {Object} formData - Données du formulaire de contact
   */
  async sendClientConfirmation(formData) {
    this.checkConfiguration();

    // Vérification que l'email client est fourni
    if (!formData.email) {
      throw new Error('Email client non fourni pour l\'envoi de confirmation');
    }

    try {
      const defaultOptions = getDefaultMailOptions();
      
      const mailOptions = {
        ...defaultOptions,
        to: formData.email,
        subject: `✅ Confirmation de réception - ${process.env.COMPANY_NAME || 'Votre Entreprise'}`,
        html: emailTemplates.clientConfirmation(formData),
        // Version texte de secours
        text: this.createPlainTextVersion(formData, 'client')
      };

      console.log(`📤 Envoi email confirmation à: ${formData.email}`);
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email confirmation envoyé avec succès:', result.messageId);
      return {
        success: true,
        messageId: result.messageId,
        recipient: formData.email
      };

    } catch (error) {
      console.error('❌ Erreur envoi email confirmation:', error);
      
      // Message d'erreur plus détaillé selon le type d'erreur
      let errorMessage = `Impossible d'envoyer l'email de confirmation: ${error.message}`;
      
      if (error.code === 'EAUTH') {
        errorMessage = `Erreur d'authentification Gmail. Vérifiez que vous utilisez un "Mot de passe d'application" (pas votre mot de passe habituel).`;
      } else if (error.message && error.message.includes('Invalid login')) {
        errorMessage = `Identifiants Gmail invalides. Vérifiez GMAIL_USER et GMAIL_PASSWORD dans le fichier .env.`;
      }
      
      throw new Error(errorMessage);
    }
  }

  /**
   * Crée une version texte simple de l'email
   * @param {Object} formData - Données du formulaire
   * @param {string} type - Type d'email ('admin' ou 'client')
   */
  createPlainTextVersion(formData, type) {
    if (type === 'admin') {
      const isLocation = formData.typedemande && formData.typedemande.includes('Location')
      const isAchat = formData.typedemande && (formData.typedemande.includes('Achat') || formData.typedemande.includes('achat'))
      
      let detailsSection = ''
      if (isLocation || isAchat) {
        detailsSection = '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
        detailsSection += isLocation ? 'DÉTAILS DE LA LOCATION\n' : 'DÉTAILS DE L\'ACHAT\n'
        detailsSection += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
        
        if (formData.service) {
          detailsSection += `Service: ${formData.service}\n`
        }
        if (formData.typeConteneur) {
          detailsSection += `Type de conteneur: ${formData.typeConteneur}\n`
        }
        if (formData.taille) {
          detailsSection += `Taille: ${formData.taille}\n`
        }
        if (formData.localisation) {
          detailsSection += `Localisation: ${formData.localisation}\n`
          if (formData.service === 'Location à domicile avec livraison' || isAchat) {
            detailsSection += `Note: Livraison uniquement en France métropolitaine\n`
          }
        }
      }
      
      return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 NOUVEAU MESSAGE DEPUIS VOTRE SITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS DU CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom complet: ${formData.nom || 'Non renseigné'}
Email: ${formData.email || 'Non renseigné'}
Téléphone: ${formData.telephone || 'Non renseigné'}

TYPE DE DEMANDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.typedemande || 'Non renseigné'}
${detailsSection}
${formData.message ? `
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date de réception: ${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message reçu automatiquement depuis le formulaire de contact de votre site
LD Stock - ${new Date().getFullYear()}
      `;
    } else {
      return `
CONFIRMATION DE RÉCEPTION

Bonjour ${formData.nom || 'Cher client'},

Votre demande a été bien prise en compte.
Nous vous recontacterons dans les plus brefs délais pour répondre à votre demande concernant : ${formData.typedemande || 'votre demande'}

Notre équipe analyse votre demande et vous proposera la solution la plus adaptée à vos besoins.

Vous pouvez également nous contacter :
Téléphone : ${process.env.COMPANY_PHONE || '01 23 45 67 89'}
Email : ${process.env.COMPANY_EMAIL || 'contact@votreentreprise.com'}

Merci de votre confiance,
L'équipe ${process.env.COMPANY_NAME || 'Votre Entreprise'}

---
Cet email est envoyé automatiquement, merci de ne pas y répondre.
Pour toute question, contactez-nous directement.
      `;
    }
  }

  /**
   * Test de la configuration du service mail
   */
  async testConfiguration() {
    try {
      this.checkConfiguration();
      
      // Test de la connexion SMTP
      await this.transporter.verify();
      
      return {
        configured: true,
        smtpConnected: true,
        adminEmail: process.env.ADMIN_EMAIL || 'non configuré'
      };
    } catch (error) {
      return {
        configured: false,
        error: error.message,
        adminEmail: process.env.ADMIN_EMAIL || 'non configuré'
      };
    }
  }

  /**
   * Envoie un email de test
   * @param {string} testEmail - Email de destination pour le test
   */
  async sendTestEmail(testEmail) {
    this.checkConfiguration();

    const defaultOptions = getDefaultMailOptions();
    
    const mailOptions = {
      ...defaultOptions,
      to: testEmail,
      subject: '🧪 Test de configuration email',
      html: `
        <h2>Test de configuration réussi !</h2>
        <p>Ce message confirme que la configuration email fonctionne correctement.</p>
        <p><strong>Date du test :</strong> ${new Date().toLocaleString('fr-FR')}</p>
      `,
      text: `Test de configuration réussi ! Ce message confirme que la configuration email fonctionne correctement. Date du test : ${new Date().toLocaleString('fr-FR')}`
    };

    const result = await this.transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: result.messageId,
      recipient: testEmail
    };
  }
}

module.exports = new MailService();
