#!/usr/bin/env node

/**
 * Script de configuration initiale pour Backend Form Template
 * Aide à la configuration des variables d'environnement
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration par défaut
const defaultConfig = {
  PORT: '3001',
  NODE_ENV: 'development',
  FRONTEND_URL: 'http://localhost:3000',
  COMPANY_NAME: 'Votre Entreprise',
  COMPANY_PHONE: '01 23 45 67 89',
  COMPANY_EMAIL: 'contact@votreentreprise.com'
};

async function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEnvironment() {
  console.log('🔧 Configuration initiale du backend\n');
  
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  
  // Vérifier si .env existe déjà
  if (fs.existsSync(envPath)) {
    const overwrite = await question('Un fichier .env existe déjà. Le remplacer ? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Configuration annulée.');
      rl.close();
      return;
    }
  }
  
  console.log('📝 Configuration des variables d\'environnement...\n');
  
  const config = { ...defaultConfig };
  
  // Configuration du serveur
  console.log('🖥️  Configuration du serveur:');
  const port = await question(`Port du serveur (${defaultConfig.PORT}): `);
  if (port) config.PORT = port;
  
  const env = await question('Environnement (development/production) [development]: ');
  if (env) config.NODE_ENV = env;
  
  // Configuration Gmail
  console.log('\n📧 Configuration Gmail SMTP:');
  console.log('(Nécessite un compte Gmail avec authentification à 2 facteurs)');
  console.log('💡 Conseil : Utilisez le même Gmail pour l\'envoi ET la réception (plus simple)');
  
  const gmailUser = await question('Email Gmail pour l\'envoi: ');
  if (gmailUser) config.GMAIL_USER = gmailUser;
  
  const gmailPassword = await question('Mot de passe d\'application Gmail: ');
  if (gmailPassword) config.GMAIL_PASSWORD = gmailPassword;
  
  const sameEmail = await question(`Utiliser le même email (${gmailUser || 'Gmail'}) pour la réception ? (Y/n): `);
  if (sameEmail.toLowerCase() !== 'n') {
    config.ADMIN_EMAIL = gmailUser || config.ADMIN_EMAIL;
  } else {
    const adminEmail = await question('Email de réception des formulaires: ');
    if (adminEmail) config.ADMIN_EMAIL = adminEmail;
  }
  
  // Configuration de l'entreprise
  console.log('\n🏢 Configuration de l\'entreprise:');
  const companyName = await question(`Nom de l'entreprise (${defaultConfig.COMPANY_NAME}): `);
  if (companyName) config.COMPANY_NAME = companyName;
  
  const companyPhone = await question(`Téléphone (${defaultConfig.COMPANY_PHONE}): `);
  if (companyPhone) config.COMPANY_PHONE = companyPhone;
  
  const companyEmail = await question(`Email contact (${defaultConfig.COMPANY_EMAIL}): `);
  if (companyEmail) config.COMPANY_EMAIL = companyEmail;
  
  // Configuration CORS
  const frontendUrl = await question(`URL du frontend (${defaultConfig.FRONTEND_URL}): `);
  if (frontendUrl) config.FRONTEND_URL = frontendUrl;
  
  // Générer le fichier .env
  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  const fullEnvContent = `# Configuration serveur
PORT=${config.PORT}
NODE_ENV=${config.NODE_ENV}

# Configuration Gmail SMTP
GMAIL_USER=${config.GMAIL_USER || 'votre.email@gmail.com'}
GMAIL_PASSWORD=${config.GMAIL_PASSWORD || 'votre_mot_de_passe_application'}

# Email de réception des formulaires
ADMIN_EMAIL=${config.ADMIN_EMAIL || 'admin@votreentreprise.com'}

# URLs autorisées (CORS)
FRONTEND_URL=${config.FRONTEND_URL}

# Configuration emails
COMPANY_NAME=${config.COMPANY_NAME}
COMPANY_PHONE=${config.COMPANY_PHONE}
COMPANY_EMAIL=${config.COMPANY_EMAIL}
`;
  
  try {
    fs.writeFileSync(envPath, fullEnvContent);
    console.log('\n✅ Fichier .env créé avec succès !');
    
    // Afficher un résumé
    console.log('\n📋 Résumé de la configuration:');
    console.log(`   Serveur: http://localhost:${config.PORT}`);
    console.log(`   Environnement: ${config.NODE_ENV}`);
    console.log(`   Email Gmail: ${config.GMAIL_USER || 'Non configuré'}`);
    console.log(`   Email admin: ${config.ADMIN_EMAIL || 'Non configuré'}`);
    console.log(`   Frontend: ${config.FRONTEND_URL}`);
    
    console.log('\n🚀 Prochaines étapes:');
    console.log('   1. Vérifiez la configuration dans .env');
    console.log('   2. Installez les dépendances: npm install');
    console.log('   3. Démarrez le serveur: npm run dev');
    console.log('   4. Testez l\'API: node test-api.js');
    
  } catch (error) {
    console.error('\n❌ Erreur lors de la création du fichier .env:', error.message);
  }
  
  rl.close();
}

// Fonction d'aide pour la configuration Gmail
function showGmailHelp() {
  console.log('\n📧 Aide pour la configuration Gmail:');
  console.log('1. Connectez-vous à votre compte Gmail');
  console.log('2. Activez l\'authentification à 2 facteurs');
  console.log('3. Allez dans "Gérer votre compte Google" > Sécurité');
  console.log('4. Sous "Se connecter à Google", sélectionnez "Mots de passe d\'application"');
  console.log('5. Générez un nouveau mot de passe pour "Mail"');
  console.log('6. Utilisez ce mot de passe (pas votre mot de passe Gmail normal)\n');
}


// Interface en ligne de commande
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('🔧 Script de configuration Backend Form Template\n');
    console.log('Usage:');
    console.log('  node setup.js              - Configuration interactive');
    console.log('  node setup.js --gmail-help - Aide pour Gmail');
    console.log('  node setup.js --help       - Afficher cette aide');
    return;
  }
  
  if (args.includes('--gmail-help')) {
    showGmailHelp();
    return;
  }
  
  await setupEnvironment();
}

main().catch(console.error);
