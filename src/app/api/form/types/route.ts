import { NextResponse } from 'next/server'

/**
 * GET /api/form/types - Récupération des types de demandes disponibles
 */
export async function GET() {
  try {
    // Types de demandes génériques - À personnaliser selon votre activité
    const formTypes = [
      'Location de conteneur',
      'Achat de conteneur',
      'Achat de bungalow',
      'Je souhaite juste obtenir un renseignement',
      'Demande d\'information',
      'Demande de devis',
      'Question technique',
      'Support client',
      'Rendez-vous',
      'Partenariat',
      'Autre demande'
    ]

    return NextResponse.json({
      success: true,
      data: formTypes
    })
  } catch (error: any) {
    console.error('❌ Erreur récupération types:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération des types de demande'
      },
      { status: 500 }
    )
  }
}

