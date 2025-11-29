# Backend Form Template

Template backend Express moderne et minimaliste pour formulaires de contact avec envoi d'emails automatisés.

## 🚀 Fonctionnalités

- **API REST** sécurisée avec Express.js
- **Formulaire de contact** avec validation complète
- **Envoi d'emails automatisés** via Nodemailer (Gmail)
  - Email de notification à l'administrateur
  - Email de confirmation au client
  - Templates HTML professionnels
- **Sécurité renforcée**
  - CORS configurable multi-origines
  - Rate limiting (protection anti-spam)
  - Helmet.js (en-têtes de sécurité)
  - Validation stricte des données (express-validator)
- **Configuration simplifiée**
  - Script de setup interactif
  - Variables d'environnement

## 📋 Prérequis

- Node.js >= 16.0.0
- npm ou yarn
- Compte Gmail avec authentification à 2 facteurs (pour l'envoi d'emails)

## 🛠️ Installation

### 1. Cloner ou télécharger le template

```bash
git clone <votre-repo>
cd backendFormTemplate
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

#### Option A : Configuration automatique (recommandé)

```bash
npm run setup
```

Le script interactif vous guidera à travers toutes les étapes de configuration.

#### Option B : Configuration manuelle

```bash
cp env.example .env
```

Puis éditez le fichier `.env` avec vos informations :

```env
# Configuration serveur
PORT=3001
NODE_ENV=development

# Gmail SMTP
GMAIL_USER=votre.email@gmail.com
GMAIL_PASSWORD=votre_mot_de_passe_application

# Email de réception
ADMIN_EMAIL=admin@votreentreprise.com

# URLs frontend (CORS)
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_PROD=https://votre-site.fr
FRONTEND_URL_PROD_WWW=https://www.votre-site.fr

# Informations entreprise
COMPANY_NAME=Votre Entreprise
COMPANY_PHONE=01 23 45 67 89
COMPANY_EMAIL=contact@votreentreprise.com
```

### 4. Configuration Gmail

Pour envoyer des emails via Gmail :

1. Activez l'authentification à 2 facteurs sur votre compte Gmail
2. Allez dans "Gérer votre compte Google" → Sécurité
3. Sous "Se connecter à Google", sélectionnez "Mots de passe d'application"
4. Générez un mot de passe pour "Mail"
5. Utilisez ce mot de passe dans `GMAIL_PASSWORD`

💡 **Conseil** : Utilisez le même Gmail pour l'envoi ET la réception (plus simple).

## 🚀 Démarrage

### Mode développement (avec rechargement automatique)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarre sur `http://localhost:3001` (ou le port configuré dans `.env`).

## 🧪 Tests

### Tester l'API

```bash
npm test
```

Ce script teste tous les endpoints de l'API.

## 📡 Endpoints API

### Santé du serveur

```
GET /health
```

Vérifie que le serveur fonctionne.

### Formulaire de contact

```
POST /api/form/submit
Content-Type: application/json

{
  "nom": "Jean Dupont",
  "email": "jean@example.com",
  "telephone": "01 23 45 67 89",
  "typedemande": "Demande de devis",
  "message": "Votre message ici",
  "ville": "Paris",
  "codepostal": "75001"
}
```

### Types de demandes disponibles

```
GET /api/form/types
```

Retourne la liste des types de demandes configurés.

### Test du service formulaire

```
GET /api/form/test
```

Vérifie la configuration du service d'envoi d'emails.

## 📁 Structure du projet

```
backend/
├── config/              # Configuration
│   └── mailer.js       # Configuration Nodemailer
├── controllers/         # Logique métier
│   └── formController.js
├── middlewares/         # Middlewares personnalisés
│   └── errorHandler.js
├── routes/             # Routes API
│   └── formRoutes.js
├── services/           # Services
│   └── mailService.js
├── utils/              # Utilitaires
│   └── validator.js
├── scripts/            # Scripts utiles
│   └── setup.js        # Configuration interactive
├── server.js           # Point d'entrée
├── test-api.js         # Tests API
├── package.json
├── env.example         # Template de configuration
├── README.md           # Cette documentation
└── QUICKSTART.txt      # Guide de démarrage rapide
```

## 🎨 Personnalisation

### 1. Modifier les types de demandes

Éditez les fichiers suivants pour adapter les types de demandes à votre activité :

- `controllers/formController.js` (méthode `getFormTypes`)
- `routes/formRoutes.js` (validation)
- `utils/validator.js` (validation)

### 2. Personnaliser les templates d'emails

Éditez `config/mailer.js` pour modifier :
- L'apparence des emails (HTML/CSS)
- Le contenu des messages
- Les couleurs et le style

### 3. Ajouter des champs au formulaire

1. Ajoutez la validation dans `routes/formRoutes.js`
2. Ajoutez la logique dans `utils/validator.js`
3. Mettez à jour les templates d'emails dans `config/mailer.js`

### 4. Configurer CORS pour votre domaine

Modifiez `server.js` pour ajouter vos domaines autorisés, ou utilisez les variables d'environnement :
- `FRONTEND_URL`
- `FRONTEND_URL_PROD`
- `FRONTEND_URL_PROD_WWW`

## 🔒 Sécurité

- **Rate limiting** : 100 requêtes/15min par IP (5 pour les formulaires)
- **CORS** : Origines autorisées uniquement
- **Helmet.js** : En-têtes de sécurité HTTP
- **Validation stricte** : Toutes les entrées sont validées
- **Protection anti-spam** : Honeypot et vérification des mots-clés
- **Sanitisation** : Nettoyage automatique des données

## 🐛 Dépannage

### Les emails ne sont pas envoyés

- Vérifiez que `GMAIL_USER` et `GMAIL_PASSWORD` sont correctement configurés
- Assurez-vous d'utiliser un mot de passe d'application Gmail (pas votre mot de passe habituel)
- Vérifiez que l'authentification à 2 facteurs est activée sur Gmail

### Erreur CORS

- Vérifiez que votre domaine frontend est dans la liste des origines autorisées
- Modifiez les variables `FRONTEND_URL*` dans `.env`
- Redémarrez le serveur après modification

## 📝 Scripts disponibles

- `npm start` - Démarrer en production
- `npm run dev` - Démarrer en développement (auto-reload)
- `npm run setup` - Configuration interactive
- `npm test` - Tester l'API

## 🚢 Déploiement

### Variables d'environnement à configurer

Assurez-vous de configurer toutes les variables d'environnement sur votre plateforme d'hébergement (Heroku, Vercel, Railway, etc.).

### Configuration CORS

N'oubliez pas d'ajouter vos domaines de production dans les variables `FRONTEND_URL_PROD` et `FRONTEND_URL_PROD_WWW`.

## 📄 Licence

ISC - Libre d'utilisation et de modification

## 🤝 Contribution

Ce template est conçu pour être facilement adaptable. N'hésitez pas à le personnaliser selon vos besoins !

## 📞 Support

Pour toute question ou problème :
1. Consultez la documentation
2. Vérifiez le fichier QUICKSTART.txt pour un guide rapide
3. Testez l'API avec `npm test`

---

**Note** : Ce template est prêt à l'emploi et peut être adapté à tout type de projet nécessitant un formulaire de contact avec envoi d'emails automatisés.
