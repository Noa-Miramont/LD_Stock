'use client'

import { useState, useEffect } from 'react'

type RequestSubject = 
  | 'location-conteneur'
  | 'achat-conteneur'
  | 'achat-bungalow'
  | 'renseignement'

type ServiceType = 'sur-site' | 'a-domicile' | ''

type ContainerType = 'stockage' | 'maritime' | ''

interface FormInitialValues {
  objet?: RequestSubject | ''
  service?: ServiceType
  taille?: string
  localisation?: string
  typeConteneur?: ContainerType
}

interface FormProps {
  initialValues?: FormInitialValues
}

export default function Form({ initialValues }: FormProps = {}) {
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    telephone: '',
    objet: (initialValues?.objet || '') as RequestSubject | '',
    message: '',
    service: (initialValues?.service || '') as ServiceType,
    taille: initialValues?.taille || '',
    localisation: initialValues?.localisation || '',
    typeConteneur: (initialValues?.typeConteneur || '') as ContainerType
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | 'warning' | null, message: string }>({ type: null, message: '' })

  // Mettre à jour le formulaire si les valeurs initiales changent
  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        objet: (initialValues.objet || prev.objet) as RequestSubject | '',
        service: (initialValues.service || prev.service) as ServiceType,
        taille: initialValues.taille || prev.taille,
        localisation: initialValues.localisation || prev.localisation,
        typeConteneur: (initialValues.typeConteneur || prev.typeConteneur) as ContainerType
      }))
    }
  }, [initialValues])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Réinitialiser les champs dépendants quand l'objet change
    if (name === 'objet') {
      setFormData(prev => ({
        ...prev,
        service: '',
        taille: '',
        localisation: '',
        typeConteneur: ''
      }))
    }
    // Réinitialiser la taille quand le service change
    if (name === 'service') {
      setFormData(prev => ({
        ...prev,
        taille: ''
      }))
    }
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nomComplet.trim()) {
      newErrors.nomComplet = 'Le nom complet est obligatoire'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est obligatoire'
    }

    if (!formData.objet) {
      newErrors.objet = 'L\'objet de la demande est obligatoire'
    }

    // Validation conditionnelle selon l'objet
    if (formData.objet === 'location-conteneur') {
      if (!formData.service) {
        newErrors.service = 'Veuillez choisir un service'
      } else if (formData.service === 'sur-site') {
        if (!formData.taille || !['10pieds', '20pieds'].includes(formData.taille)) {
          newErrors.taille = 'Veuillez choisir une taille (10 ou 20 pieds)'
        }
      } else if (formData.service === 'a-domicile') {
        if (!formData.taille || !['6pieds', '8pieds', '10pieds', '20pieds'].includes(formData.taille)) {
          newErrors.taille = 'Veuillez choisir une taille'
        }
        if (!formData.localisation.trim()) {
          newErrors.localisation = 'Veuillez indiquer votre localisation'
        }
      }
    }

    if (formData.objet === 'achat-conteneur') {
      if (!formData.typeConteneur) {
        newErrors.typeConteneur = 'Veuillez choisir le type de conteneur'
      }
      if (!formData.taille || !['6pieds', '8pieds', '10pieds', '20pieds', '40pieds'].includes(formData.taille)) {
        newErrors.taille = 'Veuillez choisir une taille'
      }
      if (!formData.localisation.trim()) {
        newErrors.localisation = 'Veuillez indiquer votre localisation'
      }
    }

    if (formData.objet === 'renseignement') {
      if (!formData.message.trim()) {
        newErrors.message = 'Le message est obligatoire pour une demande de renseignement'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Mapper les données du formulaire vers le format attendu par le backend
      const objetMapping: Record<string, string> = {
        'location-conteneur': 'Location de conteneur',
        'achat-conteneur': 'Achat de conteneur',
        'achat-bungalow': 'Achat de bungalow',
        'renseignement': 'Je souhaite juste obtenir un renseignement'
      }

      const tailleMapping: Record<string, string> = {
        '6pieds': '6 pieds',
        '8pieds': '8 pieds',
        '10pieds': '10 pieds',
        '20pieds': '20 pieds',
        '40pieds': '40 pieds'
      }

      const serviceMapping: Record<string, string> = {
        'sur-site': 'Location sur site',
        'a-domicile': 'Location à domicile avec livraison'
      }

      const typeConteneurMapping: Record<string, string> = {
        'stockage': 'Conteneur de stockage',
        'maritime': 'Conteneur maritime'
      }

      // Construire le message avec tous les détails
      let messageComplet = formData.message || ''
      
      if (formData.objet === 'location-conteneur') {
        messageComplet += `\n\nDétails de la location:\n`
        messageComplet += `- Service: ${serviceMapping[formData.service] || formData.service}\n`
        messageComplet += `- Taille: ${tailleMapping[formData.taille] || formData.taille}\n`
        if (formData.service === 'a-domicile' && formData.localisation) {
          messageComplet += `- Localisation: ${formData.localisation}\n`
          messageComplet += `- Note: Livraison uniquement en France métropolitaine\n`
        }
      } else if (formData.objet === 'achat-conteneur') {
        messageComplet += `\n\nDétails de l'achat:\n`
        messageComplet += `- Type de conteneur: ${typeConteneurMapping[formData.typeConteneur] || formData.typeConteneur}\n`
        messageComplet += `- Taille: ${tailleMapping[formData.taille] || formData.taille}\n`
        if (formData.localisation) {
          messageComplet += `- Localisation: ${formData.localisation}\n`
          messageComplet += `- Note: Livraison uniquement en France métropolitaine\n`
        }
      }

      const payload = {
        nom: formData.nomComplet,
        email: formData.email,
        telephone: formData.telephone,
        typedemande: objetMapping[formData.objet] || formData.objet,
        message: messageComplet.trim(),
        // Champs supplémentaires pour le template email
        service: formData.service ? serviceMapping[formData.service] : undefined,
        taille: formData.taille ? tailleMapping[formData.taille] : undefined,
        localisation: formData.localisation || undefined,
        typeConteneur: formData.typeConteneur ? typeConteneurMapping[formData.typeConteneur] : undefined
      }

      // Utilisation des routes API Next.js
      const response = await fetch('/api/form/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      // Gérer les erreurs de parsing JSON
      let data
      try {
        const text = await response.text()
        if (!text) {
          throw new Error('Réponse vide du serveur')
        }
        data = JSON.parse(text)
      } catch (parseError) {
        console.error('Erreur de parsing JSON:', parseError)
        throw new Error('Erreur de communication avec le serveur. Veuillez vérifier que le backend est démarré.')
      }

      if (!response.ok) {
        // Gérer les erreurs de validation (400)
        if (response.status === 400 && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          const errorMessages = data.errors.map((err: any) => {
            const field = err.param || err.path || err.field || ''
            const message = err.msg || err.message || 'Erreur de validation'
            return field ? `${field}: ${message}` : message
          }).join('\n')
          throw new Error(`Erreurs de validation:\n${errorMessages}`)
        }
        
        // Gérer les erreurs serveur (500)
        if (response.status === 500) {
          const errorMsg = data.error || data.message || 'Erreur interne du serveur'
          const details = data.details || data.stack ? `\n\nDétails: ${data.details || data.stack}` : ''
          throw new Error(`Erreur serveur: ${errorMsg}${details}`)
        }
        
        throw new Error(data.error || data.message || `Erreur ${response.status}: ${response.statusText}`)
      }

      if (data.success) {
        // Gérer les warnings (email non configuré en développement)
        if (data.warning) {
          setSubmitStatus({
            type: 'warning',
            message: `${data.message || 'Votre demande a été reçue.'}\n\n⚠️ ${data.warning}`
          })
        } else {
          setSubmitStatus({
            type: 'success',
            message: data.message || 'Votre demande a été envoyée avec succès !'
          })
        }
        // Réinitialiser le formulaire après succès
        setFormData({
          nomComplet: '',
          email: '',
          telephone: '',
          objet: '' as RequestSubject | '',
          message: '',
          service: '' as ServiceType,
          taille: '',
          localisation: '',
          typeConteneur: '' as ContainerType
        })
      } else {
        throw new Error(data.message || 'Erreur lors de l\'envoi du formulaire')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      
      let errorMessage = 'Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.'
      
      if (error instanceof Error) {
        // Gérer les erreurs de réseau
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré sur le port 3001.'
        } else if (error.message.includes('communication avec le serveur')) {
          errorMessage = error.message
        } else {
          errorMessage = error.message
        }
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isMessageRequired = formData.objet === 'renseignement'
  const showLocationFields = 
    (formData.objet === 'location-conteneur' && formData.service === 'a-domicile') ||
    formData.objet === 'achat-conteneur'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col justify-start rounded-2xl bg-white shadow-lg py-8 px-8 space-y-7">
        <h3 className="poppins text-xl font-medium">Envoyer nous un message</h3>
        
        {/* Nom complet */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="nomComplet" className="Inter text-sm font-medium">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nomComplet"
            name="nomComplet"
            value={formData.nomComplet}
            onChange={handleChange}
            placeholder="Nom prenom"
            className={`Inter rounded-lg border px-4 py-3 text-base ${
              errors.nomComplet ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
          />
          {errors.nomComplet && (
            <p className="Inter text-sm text-red-500">{errors.nomComplet}</p>
          )}
        </div>

        {/* Téléphone */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="telephone" className="Inter text-sm font-medium">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="+33 1 23 45 67 89"
            className={`Inter rounded-lg border px-4 py-3 text-base ${
              errors.telephone ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
          />
          {errors.telephone && (
            <p className="Inter text-sm text-red-500">{errors.telephone}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="Inter text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="NomPrenom@exemple.fr"
            className={`Inter rounded-lg border px-4 py-3 text-base ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
          />
          {errors.email && (
            <p className="Inter text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Objet de la demande */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="objet" className="Inter text-sm font-medium">
            Objet de la demande <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="objet"
              name="objet"
              value={formData.objet}
              onChange={handleChange}
              className={`Inter w-full rounded-lg border px-4 py-3 text-base appearance-none bg-white ${
                errors.objet ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
            >
              <option value="">sélectionnez un sujet</option>
              <option value="location-conteneur">Location de conteneur</option>
              <option value="achat-conteneur">Achat de conteneur</option>
              <option value="achat-bungalow">Achat de bungalow</option>
              <option value="renseignement">Je souhaite juste obtenir un renseignement</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.objet && (
            <p className="Inter text-sm text-red-500">{errors.objet}</p>
          )}
        </div>

        {/* Champs conditionnels pour Location de conteneur */}
        {formData.objet === 'location-conteneur' && (
          <>
            {/* Choix du service */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="service" className="Inter text-sm font-medium">
                Choisir un service <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`Inter w-full rounded-lg border px-4 py-3 text-base appearance-none bg-white ${
                    errors.service ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
                >
                  <option value="">sélectionnez un service</option>
                  <option value="sur-site">Location sur site</option>
                  <option value="a-domicile">Location à domicile avec livraison</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.service && (
                <p className="Inter text-sm text-red-500">{errors.service}</p>
              )}
            </div>

            {/* Taille selon le service */}
            {formData.service && (
              <div className="flex flex-col space-y-2">
                <label htmlFor="taille" className="Inter text-sm font-medium">
                  Choisir une taille <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="taille"
                    name="taille"
                    value={formData.taille}
                    onChange={handleChange}
                    className={`Inter w-full rounded-lg border px-4 py-3 text-base appearance-none bg-white ${
                      errors.taille ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
                  >
                    <option value="">sélectionnez une taille</option>
                    {formData.service === 'sur-site' ? (
                      <>
                        <option value="10pieds">10 pieds</option>
                        <option value="20pieds">20 pieds</option>
                      </>
                    ) : (
                      <>
                        <option value="6pieds">6 pieds</option>
                        <option value="8pieds">8 pieds</option>
                        <option value="10pieds">10 pieds</option>
                        <option value="20pieds">20 pieds</option>
                      </>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.taille && (
                  <p className="Inter text-sm text-red-500">{errors.taille}</p>
                )}
              </div>
            )}
          </>
        )}

        {/* Champs conditionnels pour Achat de conteneur */}
        {formData.objet === 'achat-conteneur' && (
          <>
            {/* Type de conteneur */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="typeConteneur" className="Inter text-sm font-medium">
                Choisir le type de conteneur <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="typeConteneur"
                  name="typeConteneur"
                  value={formData.typeConteneur}
                  onChange={handleChange}
                  className={`Inter w-full rounded-lg border px-4 py-3 text-base appearance-none bg-white ${
                    errors.typeConteneur ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
                >
                  <option value="">sélectionnez un type</option>
                  <option value="stockage">Conteneur de stockage</option>
                  <option value="maritime">Conteneur maritime</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.typeConteneur && (
                <p className="Inter text-sm text-red-500">{errors.typeConteneur}</p>
              )}
            </div>

            {/* Taille */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="taille" className="Inter text-sm font-medium">
                Choisir une taille <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="taille"
                  name="taille"
                  value={formData.taille}
                  onChange={handleChange}
                  className={`Inter w-full rounded-lg border px-4 py-3 text-base appearance-none bg-white ${
                    errors.taille ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
                >
                  <option value="">sélectionnez une taille</option>
                  <option value="6pieds">6 pieds</option>
                  <option value="8pieds">8 pieds</option>
                  <option value="10pieds">10 pieds</option>
                  <option value="20pieds">20 pieds</option>
                  <option value="40pieds">40 pieds</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.taille && (
                <p className="Inter text-sm text-red-500">{errors.taille}</p>
              )}
            </div>
          </>
        )}

        {/* Localisation (pour location à domicile ou achat de conteneur) */}
        {showLocationFields && (
          <div className="flex flex-col space-y-2">
            <label htmlFor="localisation" className="Inter text-sm font-medium">
              Où vous situez-vous <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="localisation"
              name="localisation"
              value={formData.localisation}
              onChange={handleChange}
              placeholder="Nom de votre ville"
              className={`Inter rounded-lg border px-4 py-3 text-base ${
                errors.localisation ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
            />
            {errors.localisation && (
              <p className="Inter text-sm text-red-500">{errors.localisation}</p>
            )}
            <p className="Inter text-xs text-gray-500 italic">
              Livraison uniquement en France métropolitaine
            </p>
          </div>
        )}

        {/* Message */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="Inter text-sm font-medium">
            Message {isMessageRequired && <span className="text-red-500">*</span>}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre projet ou votre demande"
            rows={5}
            className={`Inter rounded-lg border px-4 py-3 text-base resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:border-transparent`}
          />
          {errors.message && (
            <p className="Inter text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Messages de statut */}
        {submitStatus.type && (
          <div
            className={`Inter rounded-lg px-4 py-3 text-sm whitespace-pre-line ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : submitStatus.type === 'warning'
                ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`Inter flex items-center justify-center gap-3 rounded-xl bg-[#FF8905] px-6 py-3 text-base font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-[#FF8905] focus:ring-offset-2 ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#e67a04]'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Envoyer le message
            </>
          )}
        </button>
      </div>
    </form>
  )
}

