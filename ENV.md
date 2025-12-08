# Variables d'environnement

Ce document liste toutes les variables d'environnement nécessaires au fonctionnement de l'application.

## Variables requises

### Configuration Gmail

Ces variables sont **obligatoires** pour que le système d'envoi d'emails fonctionne.

- **GMAIL_USER** : Adresse email Gmail utilisée pour envoyer les emails
  - Exemple: `votre-email@gmail.com`

- **GMAIL_PASSWORD** : Mot de passe d'application Gmail
  - ⚠️ **IMPORTANT** : Utilisez un "Mot de passe d'application", PAS votre mot de passe Gmail habituel
  - Pour créer un mot de passe d'application:
    1. Activez l'authentification à 2 facteurs sur votre compte Google
    2. Allez sur: https://myaccount.google.com/apppasswords
    3. Créez un nouveau mot de passe d'application pour "Mail"
    4. Copiez le mot de passe généré (16 caractères) ici

- **ADMIN_EMAIL** : Adresse email qui recevra les notifications de formulaires de contact
  - Exemple: `admin@votreentreprise.com`

## Variables optionnelles

Ces variables améliorent les emails envoyés mais ne sont pas obligatoires.

- **COMPANY_NAME** : Nom de l'entreprise (affiché dans les emails)
  - Exemple: `LD Stock`

- **COMPANY_PHONE** : Numéro de téléphone de l'entreprise (affiché dans les emails)
  - Exemple: `01 23 45 67 89`

- **COMPANY_EMAIL** : Email de contact de l'entreprise (affiché dans les emails)
  - Exemple: `contact@votreentreprise.com`

### Configuration SEO et Analytics

Ces variables sont utilisées pour optimiser le référencement et le tracking.

- **NEXT_PUBLIC_SITE_URL** : URL complète de votre site web
  - Exemple: `https://ldstock.fr` ou `https://votre-projet.vercel.app`
  - Utilisée pour les métadonnées Open Graph, le sitemap, et les données structurées
  - ⚠️ **IMPORTANT** : Ajoutez le protocole `https://` ou `http://` selon votre environnement

- **NEXT_PUBLIC_GA_ID** : ID de suivi Google Analytics (optionnel)
  - Exemple: `G-XXXXXXXXXX`
  - Format: `G-` suivi de 10 caractères alphanumériques
  - Si non défini, Google Analytics ne sera pas chargé
  - Pour obtenir un ID : https://analytics.google.com/

## Configuration sur Vercel

1. Allez dans votre projet sur Vercel
2. Cliquez sur **Settings** → **Environment Variables**
3. Ajoutez toutes les variables requises pour les environnements **Production**, **Preview** et **Development**
4. Redéployez votre application pour que les variables soient prises en compte

