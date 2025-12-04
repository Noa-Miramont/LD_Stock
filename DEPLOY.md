# 🚀 Guide de déploiement rapide sur Vercel

## Checklist avant déploiement

- [ ] Projet commité et poussé sur GitHub/GitLab/Bitbucket
- [ ] Mot de passe d'application Gmail créé
- [ ] Variables d'environnement listées et prêtes

## Étapes rapides

### 1. Préparer le projet Git

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. **Add New** → **Project**
3. Importez votre dépôt
4. ⚠️ **AVANT de cliquer sur Deploy**, allez dans **Environment Variables**

### 3. Configurer les variables (OBLIGATOIRE)

Dans **Environment Variables**, ajoutez :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `GMAIL_USER` | votre-email@gmail.com | Production, Preview, Development |
| `GMAIL_PASSWORD` | mot-de-passe-application-gmail | Production, Preview, Development |
| `ADMIN_EMAIL` | admin@votreentreprise.com | Production, Preview, Development |
| `COMPANY_NAME` | LD Stock | Production, Preview, Development (optionnel) |
| `COMPANY_PHONE` | 01 23 45 67 89 | Production, Preview, Development (optionnel) |
| `COMPANY_EMAIL` | contact@votreentreprise.com | Production, Preview, Development (optionnel) |

### 4. Créer un mot de passe d'application Gmail

1. Allez sur [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Sélectionnez "Mail" et votre appareil
3. Cliquez sur "Générer"
4. Copiez le mot de passe de 16 caractères
5. Collez-le dans `GMAIL_PASSWORD` sur Vercel

### 5. Déployer

1. Cliquez sur **Deploy**
2. Attendez la fin du build (2-5 minutes)
3. Votre site sera accessible sur `https://votre-projet.vercel.app`

## Vérification post-déploiement

### Tester les routes API

1. **Route de santé** :
   ```
   https://votre-projet.vercel.app/api/health
   ```
   Devrait retourner : `{"status":"OK",...}`

2. **Test email** :
   ```
   https://votre-projet.vercel.app/api/form/test
   ```
   Vérifie la configuration email

### Tester le formulaire

1. Allez sur votre site déployé
2. Remplissez le formulaire de contact
3. Vérifiez que :
   - Vous recevez un email de confirmation
   - L'admin reçoit une notification

## En cas de problème

### Erreurs de build

- Vérifiez les logs Vercel pour les erreurs de compilation
- Assurez-vous que toutes les dépendances sont dans `package.json`

### Emails non envoyés

- Vérifiez que `GMAIL_PASSWORD` utilise un mot de passe d'application (pas votre mot de passe normal)
- Vérifiez que l'authentification à 2 facteurs est activée sur Gmail
- Consultez les logs Vercel pour les erreurs SMTP

### Variables d'environnement

- Vérifiez que toutes les variables sont définies dans Vercel
- Assurez-vous qu'elles sont activées pour **Production**
- Redéployez après avoir ajouté des variables

## Support

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- Consultez [ENV.md](./ENV.md) pour la liste complète des variables

