#!/usr/bin/env node

/**
 * Script de test pour l'API Backend
 * Utilisation: node test-api.js
 */

const BASE_URL = 'http://localhost:3001';

// Fonction utilitaire pour faire des requêtes HTTP
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { error: error.message };
  }
}

// Tests des endpoints
async function runTests() {
  console.log('🧪 Tests de l\'API Backend\n');
  
  // Test 1: Health Check
  console.log('1. Test du health check...');
  const health = await makeRequest(`${BASE_URL}/health`);
  if (health.status === 200) {
    console.log('✅ Health check OK');
    console.log(`   Statut: ${health.data.status}`);
    console.log(`   Environnement: ${health.data.environment}\n`);
  } else {
    console.log('❌ Health check échoué');
    console.log(`   Erreur: ${health.error || health.data.error}\n`);
  }
  
  // Test 2: Service de formulaire
  console.log('2. Test du service formulaire...');
  const formTest = await makeRequest(`${BASE_URL}/api/form/test`);
  if (formTest.status === 200) {
    console.log('✅ Service formulaire OK');
    console.log(`   Configuration SMTP: ${formTest.data.config.smtpConfig}`);
    console.log(`   Email admin: ${formTest.data.config.adminEmail}\n`);
  } else {
    console.log('❌ Service formulaire échoué');
    console.log(`   Erreur: ${formTest.error || formTest.data.error}\n`);
  }
  
  // Test 3: Types de formulaire
  console.log('3. Test des types de demande...');
  const formTypes = await makeRequest(`${BASE_URL}/api/form/types`);
  if (formTypes.status === 200) {
    console.log('✅ Types de demande récupérés');
    console.log(`   Nombre de types: ${formTypes.data.data.length}`);
    console.log(`   Types: ${formTypes.data.data.join(', ')}\n`);
  } else {
    console.log('❌ Récupération des types échouée');
    console.log(`   Erreur: ${formTypes.error || formTypes.data.error}\n`);
  }
  
  // Test 4: Soumission de formulaire de test
  console.log('4. Test de soumission de formulaire...');
  const formData = {
    nom: 'Test User',
    email: 'test@example.com',
    telephone: '01 23 45 67 89',
    typedemande: 'Demande de devis',
    message: 'Ceci est un message de test pour vérifier le fonctionnement du formulaire.',
    ville: 'Paris',
    codepostal: '75001'
  };
  
  const formSubmit = await makeRequest(`${BASE_URL}/api/form/submit`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  
  if (formSubmit.status === 200) {
    console.log('✅ Formulaire soumis avec succès');
    console.log(`   Email admin envoyé: ${formSubmit.data.data.adminEmailSent}`);
    console.log(`   Email confirmation envoyé: ${formSubmit.data.data.confirmationEmailSent}`);
  } else {
    console.log('❌ Soumission du formulaire échouée');
    console.log(`   Statut: ${formSubmit.status}`);
    console.log(`   Erreur: ${formSubmit.error || formSubmit.data.error}`);
  }
  
  console.log('\n🎯 Tests terminés !');
  console.log('\n📝 Note:');
  console.log('- Les erreurs d\'email sont normales si Gmail n\'est pas configuré');
  console.log('- Configurez le fichier .env pour des tests complets');
}

// Vérification que le serveur est démarré
async function checkServer() {
  try {
    const response = await makeRequest(`${BASE_URL}/health`);
    if (response.status === 200) {
      await runTests();
    } else {
      console.log('❌ Le serveur ne répond pas sur http://localhost:3001');
      console.log('🚀 Démarrez le serveur avec: npm run dev');
    }
  } catch (error) {
    console.log('❌ Impossible de se connecter au serveur');
    console.log('🚀 Assurez-vous que le serveur est démarré sur le port 3001');
    console.log('   Commande: npm run dev');
  }
}

// Point d'entrée
if (typeof fetch === 'undefined') {
  console.log('❌ Ce script nécessite Node.js 18+ ou l\'installation de node-fetch');
  console.log('   Avec Node.js < 18: npm install node-fetch');
  process.exit(1);
}

checkServer();
