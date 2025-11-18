'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getContainerById } from '@/data/containers'
import { Container } from '@/types/container'

export default function ProduitPage() {
  const searchParams = useSearchParams()
  const [container, setContainer] = useState<Container | undefined>(undefined)

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const product = getContainerById(id)
      setContainer(product)
    }
  }, [searchParams])

  if (!container) {
    return (
      <main className="pt-32 px-30 bg-neutral-100 min-h-screen flex items-center justify-center">
        <p className="text-lg">Laoding</p>
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

  return (
    <main className="pt-32 px-30 bg-neutral-100 min-h-screen pb-20">
      <section className="flex flex-col lg:flex-row gap-10">
        {/* Image à gauche */}
        <div className="lg:w-1/2">
          <div className="relative w-full h-[600px] rounded-[28px] overflow-hidden bg-neutral-200">
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
        <div className="lg:w-1/2 flex flex-col gap-6">
          {/* Tags */}
          <div className="flex gap-3">
            <span className="Inter font-semibold text-xs py-1.5 px-3 border border-[#E5E5E5] rounded-[8px] bg-white text-black">
              {formatType()}
            </span>
            <span className="Inter font-semibold text-xs py-1.5 px-3 rounded-[8px] bg-[#1A1A1A] text-white">
              {formatState()}
            </span>
          </div>

          {/* Titre */}
          <h1 className="Inter text-4xl font-bold text-black">
            {formatTitle()}
          </h1>

          {/* Description */}
          <p className="Inter text-base text-[#727272] leading-relaxed">
            {container.description}
          </p>

          {/* Tarifs */}
          <div className="flex flex-col gap-4">
            <h2 className="Inter text-xl font-semibold text-black">Tarifs</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Carte Vente */}
              <div className="flex-1 bg-white rounded-lg border border-[#E5E5E5] p-4">
                <p className="Inter text-sm font-medium text-[#727272] mb-2">Vente</p>
                <p className="Inter text-2xl font-medium text-black">
                  {formatPrice(container.purchasePrice)}€
                </p>
              </div>
              
              {/* Carte Location */}
              {container.rentalPrice !== null ? (
                <div className="flex-1 bg-white rounded-lg border border-[#E5E5E5] p-4">
                  <p className="Inter text-sm font-medium text-[#727272] mb-2">Location</p>
                  <p className="Inter text-2xl font-medium text-black">
                    {formatPrice(container.rentalPrice)}€/mois
                  </p>
                </div>
              ) : (
                <div className="flex-1 bg-white rounded-lg border border-[#E5E5E5] p-4 opacity-50">
                  <p className="Inter text-sm font-medium text-[#727272] mb-2">Location</p>
                  <p className="Inter text-lg text-[#727272]">Non disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Dimensions */}
          <div className="flex flex-col gap-3">
            <h2 className="Inter text-xl font-semibold text-black">Dimensions</h2>
            <p className="Inter text-lg text-[#727272]">
              {formatDimensions()}
            </p>
          </div>

          {/* Caractéristiques */}
          <div className="flex flex-col gap-4">
            <h2 className="Inter text-xl font-semibold text-black">Caractéristiques</h2>
            <ul className="grid grid-cols-2 gap-3">
              {characteristics.map((characteristic, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
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
                  <span className="Inter text-base text-[#727272]">
                    {characteristic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutons */}
          <div className="flex flex-col gap-4 mt-4">
            <button className="w-full bg-[#1A1A1A] text-white py-3 px-6 rounded-lg Inter font-semibold text-base transition hover:bg-[#2A2A2A]">
              Demander un devis
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
