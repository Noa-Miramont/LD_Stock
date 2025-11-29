# Guide de configuration Gmail pour l'envoi d'emails

## Problème actuel

Vous voyez cette erreur :
```
❌ Erreur de configuration Nodemailer: Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

Cela signifie que les identifiants Gmail ne sont pas corrects ou que vous n'utilisez pas un "Mot de passe d'application".

## Solution : Créer un mot de passe d'application Gmail

### Étape 1 : Activer l'authentification à 2 facteurs

1. Allez sur https://myaccount.google.com/security
2. Dans la section "Connexion à Google", cliquez sur "Validation en deux étapes"
3. Suivez les instructions pour activer l'authentification à 2 facteurs

### Étape 2 : Créer un mot de passe d'application

1. Allez sur https://myaccount.google.com/apppasswords
2. Sélectionnez "Application" : **Mail**
3. Sélectionnez "Appareil" : **Autre (nom personnalisé)**
4. Entrez un nom : **LD Stock Backend**
5. Cliquez sur "Générer"
6. **Copiez le mot de passe généré** (16 caractères, espacés en groupes de 4)

### Étape 3 : Configurer le fichier .env

Dans votre fichier `Backend/.env`, configurez :

```env
GMAIL_USER=votre.email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=ldstock@orange.fr
```

**Important** :
- Utilisez le **mot de passe d'application** (16 caractères) dans `GMAIL_PASSWORD`, **PAS** votre mot de passe Gmail habituel
- Vous pouvez supprimer les espaces du mot de passe d'application si vous préférez

### Étape 4 : Redémarrer le backend

```bash
cd Backend
npm start
```

Vous devriez voir :
```
✅ Serveur SMTP Gmail connecté et prêt
```

## Alternative : Tester sans email (développement)

Si vous voulez tester le formulaire sans configurer Gmail, le formulaire fonctionnera quand même en mode développement. Vous verrez un message d'avertissement mais la soumission sera acceptée.

## Vérification

Pour tester si la configuration fonctionne :

1. Remplissez le formulaire sur le site
2. Soumettez-le
3. Vérifiez que vous recevez un email à `ldstock@orange.fr`
4. Vérifiez que le client reçoit un email de confirmation

## Dépannage

### Erreur "Invalid login"
- Vérifiez que vous utilisez un **mot de passe d'application**, pas votre mot de passe Gmail
- Vérifiez que l'authentification à 2 facteurs est activée
- Vérifiez que le mot de passe d'application n'a pas expiré

### Erreur "Less secure app access"
- Cette option n'est plus disponible depuis 2022
- Vous **devez** utiliser un mot de passe d'application

### Le formulaire fonctionne mais les emails ne partent pas
- Vérifiez les logs du backend pour voir l'erreur exacte
- En mode développement, le formulaire accepte la soumission même si l'email échoue
- Vérifiez que `ADMIN_EMAIL` est bien configuré à `ldstock@orange.fr`

