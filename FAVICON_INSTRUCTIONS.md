# Instructions pour ajouter le favicon

Pour compléter l'optimisation SEO, vous devez ajouter les fichiers favicon suivants dans le dossier `/public` :

## Fichiers nécessaires :

1. **favicon.ico** - Icône principale (16x16, 32x32, 48x48 pixels)
2. **favicon-16x16.png** - Version PNG 16x16
3. **favicon-32x32.png** - Version PNG 32x32
4. **apple-touch-icon.png** - Icône Apple Touch (180x180 pixels)

## Génération du favicon :

Vous pouvez utiliser un outil en ligne comme :
- https://realfavicongenerator.net/
- https://favicon.io/
- https://www.favicon-generator.org/

## Instructions :

1. Téléchargez ou créez votre logo en haute résolution
2. Utilisez un générateur de favicon pour créer tous les formats nécessaires
3. Placez les fichiers dans le dossier `/public`
4. Le fichier `site.webmanifest` est déjà configuré dans `/public/site.webmanifest`

Les métadonnées pour le favicon sont déjà configurées dans `src/app/layout.tsx`.
