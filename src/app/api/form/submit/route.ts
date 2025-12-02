import { NextRequest, NextResponse } from 'next/server'
import { mailService } from '@/lib/mailService'
import { validateFormData } from '@/lib/formValidation'
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit'
import { handleError } from '@/lib/errorHandler'

/**
 * POST /api/form/submit - Soumission du formulaire de contact
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limiting spécifique pour les formulaires (5 requêtes par 15 minutes)
    const clientId = getClientIdentifier(req)
    const rateLimit = checkRateLimit(clientId, 15 * 60 * 1000, 5)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trop de soumissions de formulaire, veuillez patienter.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Parser le body
    const formData = await req.json()

    // Validation des données
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données de formulaire invalides',
          errors: validation.errors
        },
        { status: 400 }
      )
    }
    
    // Log de la réception du formulaire (sans données sensibles)
    console.log(`📝 Nouveau formulaire reçu de: ${formData.email || 'email non fourni'}`)
    console.log(`📋 Type de demande: ${formData.typedemande || 'non spécifié'}`)

    // Vérifier si le service mail est configuré
    const isMailConfigured = process.env.GMAIL_USER && process.env.GMAIL_PASSWORD && process.env.ADMIN_EMAIL
    
    if (!isMailConfigured) {
      console.warn('⚠️ Service mail non configuré - les emails ne seront pas envoyés')
      console.warn('⚠️ Variables requises: GMAIL_USER, GMAIL_PASSWORD, ADMIN_EMAIL')
      
      // En mode développement, retourner un succès même sans email
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Votre demande a été reçue avec succès. (Mode développement: emails non configurés)',
          warning: 'Le service email n\'est pas configuré. Configurez GMAIL_USER, GMAIL_PASSWORD et ADMIN_EMAIL dans le fichier .env',
          data: {
            adminEmailSent: false,
            confirmationEmailSent: false,
            submittedAt: new Date().toISOString(),
            formData: {
              nom: formData.nom,
              email: formData.email,
              typedemande: formData.typedemande
            }
          }
        })
      } else {
        // En production, c'est une erreur critique
        throw new Error('Service email non configuré. Veuillez contacter l\'administrateur.')
      }
    }

    // Envoi des emails en parallèle pour optimiser les performances
    const emailPromises = [
      mailService.sendAdminNotification(formData),
      mailService.sendClientConfirmation(formData)
    ]

    const emailResults = await Promise.allSettled(emailPromises)
    
    // Vérification des résultats d'envoi
    const adminEmailSuccess = emailResults[0].status === 'fulfilled'
    const clientEmailSuccess = emailResults[1].status === 'fulfilled'

    // Log des erreurs d'email si nécessaire
    if (!adminEmailSuccess && emailResults[0].status === 'rejected') {
      const error = emailResults[0].reason
      console.error('❌ Erreur envoi email admin:', error)
      console.error('❌ Détails:', (error as any)?.message || error)
    }
    if (!clientEmailSuccess && emailResults[1].status === 'rejected') {
      const error = emailResults[1].reason
      console.error('❌ Erreur envoi email client:', error)
      console.error('❌ Détails:', (error as any)?.message || error)
    }

    // Réponse selon le succès des envois
    if (adminEmailSuccess && clientEmailSuccess) {
      // Succès complet
      return NextResponse.json({
        success: true,
        message: 'Votre demande a été envoyée avec succès. Vous allez recevoir un email de confirmation.',
        data: {
          adminEmailSent: true,
          confirmationEmailSent: true,
          submittedAt: new Date().toISOString()
        }
      })
    } else if (adminEmailSuccess) {
      // Seul l'email admin a réussi
      return NextResponse.json({
        success: true,
        message: 'Votre demande a été envoyée avec succès.',
        warning: 'L\'email de confirmation n\'a pas pu être envoyé.',
        data: {
          adminEmailSent: true,
          confirmationEmailSent: false,
          submittedAt: new Date().toISOString()
        }
      })
    } else {
      // Échec des envois d'emails - mais on retourne quand même un succès avec un avertissement
      let errorMessage = 'Erreur lors de l\'envoi des emails'
      if (!adminEmailSuccess && emailResults[0].status === 'rejected') {
        const error = emailResults[0].reason
        errorMessage = (error as any)?.message || 'Erreur inconnue'
      } else if (!clientEmailSuccess && emailResults[1].status === 'rejected') {
        const error = emailResults[1].reason
        errorMessage = (error as any)?.message || 'Erreur inconnue'
      }
      
      console.error('❌ Échec envoi emails:', errorMessage)
      
      // En développement, on accepte quand même la soumission
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Votre demande a été reçue. (Erreur lors de l\'envoi des emails)',
          warning: `Erreur email: ${errorMessage}. Vérifiez la configuration Gmail.`,
          data: {
            adminEmailSent: false,
            confirmationEmailSent: false,
            submittedAt: new Date().toISOString()
          }
        })
      } else {
        // En production, on lance une erreur
        throw new Error(`Impossible d'envoyer les emails: ${errorMessage}`)
      }
    }

  } catch (error: any) {
    console.error('❌ Erreur lors du traitement du formulaire:', error)
    return handleError(error, req)
  }
}

