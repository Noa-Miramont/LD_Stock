import { NextResponse } from 'next/server'

/**
 * GET /api/form/test - Test du service de formulaire
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Service de formulaire opérationnel',
      timestamp: new Date().toISOString(),
      config: {
        adminEmail: process.env.ADMIN_EMAIL ? 'configuré' : 'non configuré',
        smtpConfig: process.env.GMAIL_USER ? 'configuré' : 'non configuré'
      }
    })
  } catch (error: any) {
    console.error('❌ Erreur test formulaire:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors du test du service'
      },
      { status: 500 }
    )
  }
}

