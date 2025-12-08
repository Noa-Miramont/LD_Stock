# Configuration du favicon

Le favicon du site est maintenant configuré pour utiliser le logo existant (`/public/logo/logo.png`).

## ✅ Configuration actuelle

Les fichiers suivants sont déjà en place :
- ✅ `src/app/favicon.ico` - Favicon principal pour Next.js 13+ (copie du logo)
- ✅ `public/favicon.ico` - Favicon principal (lien vers le logo)
- ✅ `public/favicon-16x16.png` - Version 16x16 (copie du logo)
- ✅ `public/favicon-32x32.png` - Version 32x32 (copie du logo)
- ✅ `public/apple-touch-icon.png` - Icône Apple Touch (copie du logo)
- ✅ `public/site.webmanifest` - Manifest PWA configuré

Les métadonnées pour le favicon sont configurées dans `src/app/layout.tsx`.

## 📝 Note d'optimisation

Le logo actuel (`logo.png`) mesure 3581 x 1497 pixels, ce qui est très grand pour un favicon. Les navigateurs redimensionneront automatiquement l'image, mais pour une meilleure performance, vous pourriez :

1. Créer des versions optimisées du logo aux bonnes tailles :
   - 16x16 pixels pour favicon-16x16.png
   - 32x32 pixels pour favicon-32x32.png
   - 180x180 pixels pour apple-touch-icon.png

2. Utiliser un outil en ligne pour optimiser :
   - https://realfavicongenerator.net/
   - https://favicon.io/
   - https://www.favicon-generator.org/

Cependant, la configuration actuelle fonctionne parfaitement - les navigateurs géreront le redimensionnement automatiquement.
