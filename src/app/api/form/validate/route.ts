import { NextRequest, NextResponse } from 'next/server'
import { validateFormData } from '@/lib/formValidation'

/**
 * POST /api/form/validate - Validation des données sans envoi d'email (debug)
 */
export async function POST(req: NextRequest) {
  try {
    // Parser le body
    const formData = await req.json()

    // Validation des données
    const validation = validateFormData(formData)
    
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        message: 'Validation échouée',
        errors: validation.errors,
        receivedData: formData
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Validation réussie - les données sont valides',
      receivedData: formData
    })
  } catch (error: any) {
    console.error('❌ Erreur validation:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la validation'
      },
      { status: 500 }
    )
  }
}

