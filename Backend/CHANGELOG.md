# Changelog

## [1.0.0] - Template Initial

### ✨ Fonctionnalités

- **API Express** moderne et sécurisée
- **Gestion de formulaires** avec validation complète
- **Envoi d'emails** automatisé (Nodemailer + Gmail)
  - Email de notification à l'administrateur
  - Email de confirmation au client
  - Templates HTML professionnels
- **Sécurité renforcée**
  - CORS configurable multi-origines
  - Rate limiting
  - Helmet.js
  - Validation des données (express-validator)
- **Configuration simplifiée**
  - Script de setup interactif
  - Variables d'environnement
- **Architecture propre**
  - Séparation MVC
  - Services dédiés
  - Gestion d'erreurs centralisée

### 📋 Structure du projet

```
backend/
├── config/              # Configuration (mailer)
├── controllers/         # Logique métier
├── middlewares/         # Middlewares personnalisés
├── routes/             # Routes API
├── services/           # Services (mail)
├── utils/              # Utilitaires (validation)
├── scripts/            # Scripts de setup
├── server.js           # Point d'entrée
├── test-api.js         # Tests API
└── .env                # Configuration (à créer)
```

### 🚀 Utilisation

Ce template est prêt à l'emploi pour tout projet nécessitant :
- Un formulaire de contact
- L'envoi d'emails automatisés
- Une API REST sécurisée

### 🔧 Personnalisation

Pour adapter ce template à votre projet, modifiez :
1. Les informations dans `.env`
2. Les types de demandes dans `controllers/formController.js`
3. Les templates d'email dans `config/mailer.js`
4. Les validateurs dans `utils/validator.js`

---

**Note :** Ce template a été créé pour être facilement adaptable à tout type de projet nécessitant l'envoi d'emails automatisés depuis un formulaire de contact.
