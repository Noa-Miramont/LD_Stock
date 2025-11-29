const nodemailer = require('nodemailer');

/**
 * Configuration du transporteur Nodemailer pour Gmail
 * Utilise les App Passwords de Gmail pour l'authentification
 */
const createTransporter = () => {
  // Vérification des variables d'environnement requises
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    throw new Error('Configuration Gmail manquante: GMAIL_USER et GMAIL_PASSWORD sont requis');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD // App Password Gmail
    },
    // Configuration supplémentaire pour la fiabilité
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 20000, // 20 secondes
    rateLimit: 5 // 5 emails max par rateDelta
  });

  // Vérification de la connexion au démarrage (asynchrone, ne bloque pas le démarrage)
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Erreur de configuration Nodemailer:', error.message);
      if (error.code === 'EAUTH') {
        console.error('⚠️  Erreur d\'authentification Gmail:');
        console.error('   - Vérifiez que GMAIL_USER et GMAIL_PASSWORD sont corrects');
        console.error('   - Assurez-vous d\'utiliser un "Mot de passe d\'application" Gmail (pas votre mot de passe habituel)');
        console.error('   - Activez l\'authentification à 2 facteurs sur votre compte Gmail');
        console.error('   - Créez un mot de passe d\'application: https://myaccount.google.com/apppasswords');
      }
    } else {
      console.log('✅ Serveur SMTP Gmail connecté et prêt');
    }
  });

  return transporter;
};

/**
 * Options par défaut pour les emails
 */
const getDefaultMailOptions = () => ({
  from: {
    name: process.env.COMPANY_NAME || 'Votre Entreprise',
    address: process.env.GMAIL_USER
  }
});

/**
 * Templates HTML pour les emails
 */
const emailTemplates = {
  // Template pour l'email admin (réception formulaire)
  adminNotification: (formData) => {
    // Déterminer si c'est une demande de location, achat ou renseignement
    const isLocation = formData.typedemande && formData.typedemande.includes('Location')
    const isAchat = formData.typedemande && (formData.typedemande.includes('Achat') || formData.typedemande.includes('achat'))
    const isRenseignement = formData.typedemande && formData.typedemande.includes('renseignement')

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nouveau message depuis votre site</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FF8905; color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f8f9fa; padding: 25px; border-radius: 0 0 8px 8px; }
        .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .section-title { color: #FF8905; font-size: 18px; font-weight: bold; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #FF8905; }
        .field { margin-bottom: 12px; display: flex; align-items: flex-start; }
        .label { font-weight: bold; color: #495057; min-width: 140px; }
        .value { color: #333; flex: 1; }
        .details-box { background: #fff3e0; padding: 15px; border-left: 4px solid #FF8905; margin: 15px 0; border-radius: 4px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #2563eb; margin-top: 10px; white-space: pre-wrap; border-radius: 4px; }
        .footer { background: #e9ecef; padding: 15px; text-align: center; font-size: 12px; color: #6c757d; border-radius: 0 0 8px 8px; margin-top: 20px; }
        .contact-links { margin-top: 10px; }
        .contact-links a { color: #FF8905; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Nouveau message depuis le site</h1>
        </div>
        <div class="content">
          <!-- Informations de contact -->
          <div class="section">
            <div class="section-title">👤 Informations du client</div>
            <div class="field">
              <span class="label">Nom complet:</span>
              <span class="value">${formData.nom || 'Non renseigné'}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${formData.email || ''}" style="color: #FF8905;">${formData.email || 'Non renseigné'}</a></span>
            </div>
            <div class="field">
              <span class="label">Téléphone:</span>
              <span class="value"><a href="tel:${formData.telephone || ''}" style="color: #FF8905;">${formData.telephone || 'Non renseigné'}</a></span>
            </div>
          </div>

          <!-- Type de demande -->
          <div class="section">
            <div class="section-title">📋 Type de demande</div>
            <div class="field">
              <span class="label">Demande:</span>
              <span class="value" style="font-size: 16px; font-weight: bold; color: #FF8905;">${formData.typedemande || 'Non renseigné'}</span>
            </div>
          </div>

          <!-- Détails spécifiques selon le type de demande -->
          ${(isLocation || isAchat) && (formData.service || formData.taille || formData.typeConteneur || formData.localisation) ? `
          <div class="section">
            <div class="section-title">${isLocation ? '🏠 Détails de la location' : '🛒 Détails de l\'achat'}</div>
            <div class="details-box">
              ${formData.service ? `
              <div class="field">
                <span class="label">Service:</span>
                <span class="value"><strong>${formData.service}</strong></span>
              </div>
              ` : ''}
              ${formData.typeConteneur ? `
              <div class="field">
                <span class="label">Type de conteneur:</span>
                <span class="value"><strong>${formData.typeConteneur}</strong></span>
              </div>
              ` : ''}
              ${formData.taille ? `
              <div class="field">
                <span class="label">Taille:</span>
                <span class="value"><strong>${formData.taille}</strong></span>
              </div>
              ` : ''}
              ${formData.localisation ? `
              <div class="field">
                <span class="label">Localisation:</span>
                <span class="value"><strong>${formData.localisation}</strong></span>
              </div>
              ${formData.service === 'Location à domicile avec livraison' || isAchat ? `
              <div style="margin-top: 10px; padding: 10px; background: #fff; border-radius: 4px; font-size: 12px; color: #666;">
                ⚠️ <em>Livraison uniquement en France métropolitaine</em>
              </div>
              ` : ''}
              ` : ''}
            </div>
          </div>
          ` : ''}

          <!-- Message -->
          ${formData.message ? `
          <div class="section">
            <div class="section-title">💬 Message</div>
            <div class="message-box">
              ${formData.message}
            </div>
          </div>
          ` : ''}

          <!-- Informations techniques -->
          <div class="section" style="background: #f8f9fa; border: 1px solid #dee2e6;">
            <div style="font-size: 12px; color: #6c757d;">
              <div class="field">
                <span class="label">Date de réception:</span>
                <span class="value">${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>Message reçu automatiquement depuis le formulaire de contact de votre site</p>
          <p style="margin-top: 5px;">LD Stock - ${new Date().getFullYear()}</p>
        </div>
      </div>
    </body>
    </html>
  `
  },

  // Template pour l'email de confirmation client
  clientConfirmation: (formData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmation de réception</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { background: #f8f9fa; padding: 20px; }
        .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
        .footer { background: #e9ecef; padding: 15px; text-align: center; font-size: 12px; color: #6c757d; }
        .contact-info { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Demande bien reçue !</h1>
        </div>
        <div class="content">
          <p>Bonjour ${formData.nom || 'Cher client'},</p>
          
          <div class="highlight">
            <p><strong>Votre demande a été bien prise en compte.</strong></p>
            <p>Nous vous recontacterons dans les plus brefs délais pour répondre à votre demande concernant : <strong>${formData.typedemande || 'votre demande'}</strong></p>
          </div>
          
          <p>Notre équipe analyse votre demande et vous proposera la solution la plus adaptée à vos besoins.</p>
          
          <div class="contact-info">
            <h3>📞 Vous pouvez également nous contacter :</h3>
            <p><strong>Téléphone :</strong> ${process.env.COMPANY_PHONE || '01 23 45 67 89'}</p>
            <p><strong>Email :</strong> ${process.env.COMPANY_EMAIL || 'contact@votreentreprise.com'}</p>
          </div>
          
          <p>Merci de votre confiance,<br>
          <strong>L'équipe ${process.env.COMPANY_NAME || 'Votre Entreprise'}</strong></p>
        </div>
        <div class="footer">
          <p>Cet email est envoyé automatiquement, merci de ne pas y répondre.</p>
          <p>Pour toute question, contactez-nous directement.</p>
        </div>
      </div>
    </body>
    </html>
  `
};

module.exports = {
  createTransporter,
  getDefaultMailOptions,
  emailTemplates
};
