'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import { getContainerById } from '@/data/containers'
import { Container } from '@/types/container'

type PurchaseType = 'achat' | 'location' | ''
type DeliveryType = 'domicile' | 'site' | ''

function ProduitContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [container, setContainer] = useState<Container | undefined>(undefined)
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('')
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('')

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const product = getContainerById(id)
      setContainer(product)
    }
  }, [searchParams])

  if (!container) {
    return (
      <main className="pt-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-neutral-100 min-h-screen flex items-center justify-center">
        <p className="text-lg">Chargement...</p>
      </main>
    )
  }

  // Fonction pour formater le titre
  const formatTitle = (): string => {
    const stateLabels: Record<string, string> = {
      'neuf': 'Neuf',
      'occasion': 'Occasion',
      'premier-voyage': 'Premier voyage'
    }
    
    if (container.type === 'bungalow') {
      return `Bungalow ${stateLabels[container.state] || container.state}`
    }
    
    return `Conteneur Maritime ${container.size}`
  }

  // Fonction pour formater le type
  const formatType = (): string => {
    return container.type === 'conteneur' ? 'Conteneur' : 'Bungalow'
  }

  // Fonction pour formater l'état
  const formatState = (): string => {
    const stateLabels: Record<string, string> = {
      'neuf': 'Neuf',
      'occasion': 'Occasion',
      'premier-voyage': 'Premier voyage'
    }
    return stateLabels[container.state] || container.state
  }

  // Fonction pour formater le prix
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  // Fonction pour formater les dimensions
  const formatDimensions = (): string => {
    return `${container.dimensions.length}m x ${container.dimensions.width}m x ${container.dimensions.height}m`
  }

  // Liste des caractéristiques
  const characteristics = [
    container.characteristic.first,
    container.characteristic.second,
    container.characteristic.third,
    container.characteristic.fourth,
    container.characteristic.fifth,
    container.characteristic.sixth,
  ]

  // Fonction pour gérer le clic sur "Demander un devis"
  const handleRequestQuote = () => {
    if (!purchaseType) return

    const params = new URLSearchParams()
    
    if (purchaseType === 'achat') {
      if (container.type === 'bungalow') {
        params.set('objet', 'achat-bungalow')
      } else {
        params.set('objet', 'achat-conteneur')
        params.set('typeConteneur', 'maritime')
        params.set('taille', container.size.replace(' pieds', 'pieds'))
      }
    } else if (purchaseType === 'location') {
      params.set('objet', 'location-conteneur')
      params.set('taille', container.size.replace(' pieds', 'pieds'))
      if (deliveryType === 'domicile') {
        params.set('service', 'a-domicile')
      } else if (deliveryType === 'site') {
        params.set('service', 'sur-site')
      }
    }

    router.push(`/contact?${params.toString()}`)
  }

  // Vérifier si le bouton est activable
  const canRequestQuote = () => {
    if (!purchaseType) return false
    if (purchaseType === 'location' && !deliveryType) return false
    return true
  }

  // Options disponibles pour ce conteneur
  const canPurchase = container.deliveryOptions.purchaseHomeDelivery
  const canRentHome = container.deliveryOptions.rentalHomeDelivery
  const canRentOnSite = container.deliveryOptions.rentalOnSite
  const canRent = canRentHome || canRentOnSite

  return (
    <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-neutral-100 min-h-screen">
      <section className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
        {/* Image à gauche */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-[24px] md:rounded-[28px] overflow-hidden bg-neutral-200">
            <Image
              src={container.image}
              alt={formatTitle()}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Contenu à droite */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="Inter font-semibold text-xs sm:text-sm py-1.5 px-3 border border-[#E5E5E5] rounded-lg sm:rounded-[8px] bg-white text-black">
              {formatType()}
            </span>
            <span className="Inter font-semibold text-xs sm:text-sm py-1.5 px-3 rounded-lg sm:rounded-[8px] bg-[#1A1A1A] text-white">
              {formatState()}
            </span>
          </div>

          {/* Titre */}
          <h1 className="Inter text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight">
            {formatTitle()}
          </h1>

          {/* Description */}
          <p className="Inter text-sm sm:text-base text-[#727272] leading-relaxed">
            {container.description}
          </p>

          {/* Tarifs */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="Inter text-lg sm:text-xl font-semibold text-black">Tarifs</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Carte Vente */}
              <div className="flex-1 bg-white rounded-lg border border-[#E5E5E5] p-4 sm:p-5">
                <p className="Inter text-xs sm:text-sm font-medium text-[#727272] mb-2">Vente</p>
                <p className="Inter text-xl sm:text-2xl font-medium text-black">
                  {formatPrice(container.purchasePrice)}€
                </p>
              </div>
              
              {/* Carte Location */}
              {canRent && container.rentalPrice !== null ? (
                <div className="flex-1 bg-white rounded-lg border border-[#E5E5E5] p-4 sm:p-5">
                  <p className="Inter text-xs sm:text-sm font-medium text-[#727272] mb-2">Location</p>
                  <p className="Inter text-xl sm:text-2xl font-medium text-black">
                    {formatPrice(container.rentalPrice)}€/mois
                  </p>
                </div>
              ) : canRent ? (
                <div className="flex-1 bg-white rounded-lg border border-[#E5E5E5] p-4 sm:p-5">
                  <p className="Inter text-xs sm:text-sm font-medium text-[#727272] mb-2">Location</p>
                  <p className="Inter text-base sm:text-lg text-[#727272]">Sur devis</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Dimensions */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="Inter text-lg sm:text-xl font-semibold text-black">Dimensions</h2>
            <p className="Inter text-base sm:text-lg text-[#727272]">
              {formatDimensions()}
            </p>
          </div>

          {/* Caractéristiques */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="Inter text-lg sm:text-xl font-semibold text-black">Caractéristiques</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {characteristics.map((characteristic, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="Inter text-sm sm:text-base text-[#727272]">
                    {characteristic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sélection Achat/Location */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-4 pt-4 sm:pt-6 border-t border-[#E5E5E5]">
            <h2 className="Inter text-lg sm:text-xl font-semibold text-black">Choisir une option</h2>
            
            {/* Sélecteur Achat/Location */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {canPurchase && (
                <button
                  onClick={() => {
                    setPurchaseType('achat')
                    setDeliveryType('')
                  }}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg Inter font-semibold text-sm sm:text-base transition ${
                    purchaseType === 'achat'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white border border-[#E5E5E5] text-black hover:bg-gray-50'
                  }`}
                >
                  Achat
                </button>
              )}
              {canRent && (
                <button
                  onClick={() => {
                    setPurchaseType('location')
                    setDeliveryType('')
                  }}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg Inter font-semibold text-sm sm:text-base transition ${
                    purchaseType === 'location'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white border border-[#E5E5E5] text-black hover:bg-gray-50'
                  }`}
                >
                  Location
                </button>
              )}
            </div>

            {/* Sélecteur Domicile/Sur site pour la location */}
            {purchaseType === 'location' && canRent && (
              <div className="flex flex-col gap-2 sm:gap-3">
                <p className="Inter text-xs sm:text-sm font-medium text-[#727272]">Choisir le type de location</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {canRentHome && (
                    <button
                      onClick={() => setDeliveryType('domicile')}
                      className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg Inter font-semibold text-sm sm:text-base transition ${
                        deliveryType === 'domicile'
                          ? 'bg-[#1A1A1A] text-white'
                          : 'bg-white border border-[#E5E5E5] text-black hover:bg-gray-50'
                      }`}
                    >
                      À domicile
                    </button>
                  )}
                  {canRentOnSite && (
                    <button
                      onClick={() => setDeliveryType('site')}
                      className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg Inter font-semibold text-sm sm:text-base transition ${
                        deliveryType === 'site'
                          ? 'bg-[#1A1A1A] text-white'
                          : 'bg-white border border-[#E5E5E5] text-black hover:bg-gray-50'
                      }`}
                    >
                      Sur site
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Bouton Demander un devis */}
            <button
              onClick={handleRequestQuote}
              disabled={!canRequestQuote()}
              className={`w-full py-3 sm:py-3.5 px-6 rounded-lg Inter font-semibold text-sm sm:text-base transition ${
                canRequestQuote()
                  ? 'bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] cursor-pointer active:scale-[0.98]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Demander un devis
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ProduitPage() {
  return (
    <Suspense fallback={
      <main className="pt-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-neutral-100 min-h-screen flex items-center justify-center">
        <p className="text-lg">Chargement...</p>
      </main>
    }>
      <ProduitContent />
    </Suspense>
  )
}
