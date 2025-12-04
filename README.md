# LD Stock - Application Next.js

Application web développée avec Next.js pour la gestion et la présentation de produits de stockage.

## 🚀 Démarrage rapide

### Installation

```bash
pnpm install
```

### Développement local

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

### Build de production

```bash
pnpm build
pnpm start
```

## 📋 Configuration

### Variables d'environnement

L'application nécessite des variables d'environnement pour fonctionner correctement. Consultez le fichier [ENV.md](./ENV.md) pour la liste complète des variables requises.

**Variables essentielles:**
- `GMAIL_USER` - Email Gmail pour l'envoi d'emails
- `GMAIL_PASSWORD` - Mot de passe d'application Gmail
- `ADMIN_EMAIL` - Email qui recevra les notifications de formulaires

Créez un fichier `.env.local` à la racine du projet avec ces variables.

## 🌐 Déploiement sur Vercel

Votre application est prête à être déployée sur Vercel. Le backend est intégré via les routes API Next.js (`src/app/api/`).

### Étapes de déploiement

#### 1. Préparer votre projet Git

Assurez-vous que votre projet est sur GitHub, GitLab ou Bitbucket :

```bash
git add .
git commit -m "Préparation pour déploiement Vercel"
git push
```

#### 2. Connecter à Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous
2. Cliquez sur **Add New** → **Project**
3. Importez votre dépôt Git
4. Vercel détectera automatiquement Next.js

#### 3. Configurer les variables d'environnement

**⚠️ IMPORTANT** : Configurez les variables d'environnement avant le premier déploiement :

1. Dans la page d'import du projet Vercel, cliquez sur **Environment Variables**
2. Ajoutez les variables suivantes (consultez [ENV.md](./ENV.md) pour les détails) :

   **Variables requises:**
   - `GMAIL_USER` = votre-email@gmail.com
   - `GMAIL_PASSWORD` = votre-mot-de-passe-application-gmail
   - `ADMIN_EMAIL` = admin@votreentreprise.com

   **Variables optionnelles:**
   - `COMPANY_NAME` = LD Stock (ou votre nom d'entreprise)
   - `COMPANY_PHONE` = votre numéro de téléphone
   - `COMPANY_EMAIL` = votre email de contact

3. Définissez ces variables pour **Production**, **Preview** et **Development**
4. Cliquez sur **Deploy**

#### 4. Configuration Gmail (Mot de passe d'application)

Pour `GMAIL_PASSWORD`, vous devez utiliser un **mot de passe d'application** Gmail :

1. Activez l'authentification à 2 facteurs sur votre compte Google
2. Allez sur [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Créez un nouveau mot de passe d'application pour "Mail"
4. Copiez le mot de passe généré (16 caractères) dans la variable `GMAIL_PASSWORD` sur Vercel

#### 5. Vérifier le déploiement

Après le déploiement :

1. Testez la route de santé : `https://votre-projet.vercel.app/api/health`
2. Testez le formulaire de contact sur votre site
3. Vérifiez les logs Vercel en cas d'erreur

### Routes API disponibles

Le backend expose les routes suivantes :

- `GET /api/health` - Vérification de l'état du serveur
- `POST /api/form/submit` - Soumission du formulaire de contact
- `POST /api/form/validate` - Validation des données du formulaire
- `GET /api/form/types` - Liste des types de demandes
- `GET /api/form/test` - Test de configuration email

### Optimisations Vercel

Le fichier `vercel.json` configure :

- **Durée maximale des fonctions** : 30 secondes (pour l'envoi d'emails)
- **Région** : Europe (Paris - cdg1)
- **Build** : Utilisation de pnpm

### Limitations importantes

1. **Rate limiting** : Le rate limiting utilise un stockage en mémoire qui sera réinitialisé à chaque redéploiement. Pour une production à grande échelle, considérez l'utilisation de Redis (via Vercel KV).

2. **Fonctions serverless** : Les routes API sont déployées en tant que fonctions serverless avec un timeout maximum de 30 secondes.

3. **Variables d'environnement** : N'oubliez pas de configurer toutes les variables d'environnement dans Vercel avant le déploiement.

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Variables d'environnement](./ENV.md)

## 🔧 Technologies utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles
- **Nodemailer** - Envoi d'emails
- **React 19** - Bibliothèque UI

## 📝 Notes

- Le backend est entièrement intégré dans Next.js via les routes API
- Aucun serveur séparé n'est nécessaire
- Les routes API sont automatiquement déployées comme fonctions serverless sur Vercel
