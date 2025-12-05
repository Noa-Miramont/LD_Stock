'use client'

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ProductCard from "../../components/ui/Product_card"
import { containers } from "../../data/containers"
import { ProductType, ContainerState } from "../../types/container"

export default function CatalogueContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Initialiser depuis l'URL ou valeurs par défaut
  const getInitialType = (): ProductType | 'tous' => {
    const type = searchParams.get('type')
    if (type === 'conteneur' || type === 'bungalow') {
      return type
    }
    return 'tous'
  }

  const getInitialState = (): ContainerState | 'tout' => {
    const state = searchParams.get('state')
    if (state === 'neuf' || state === 'occasion' || state === 'premier-voyage') {
      return state
    }
    return 'tout'
  }

  const [selectedType, setSelectedType] = useState<ProductType | 'tous'>(getInitialType)
  const [selectedState, setSelectedState] = useState<ContainerState | 'tout'>(getInitialState)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Synchroniser avec l'URL au chargement initial (une seule fois)
  useEffect(() => {
    const type = searchParams.get('type')
    const state = searchParams.get('state')
    
    if (type === 'conteneur' || type === 'bungalow') {
      setSelectedType(type)
    }
    
    if (state === 'neuf' || state === 'occasion' || state === 'premier-voyage') {
      setSelectedState(state)
    }
    
    setIsInitialized(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Mettre à jour l'URL quand les filtres changent (seulement après l'initialisation)
  useEffect(() => {
    if (!isInitialized) return
    
    const params = new URLSearchParams()
    
    if (selectedType !== 'tous') {
      params.set('type', selectedType)
    }
    
    if (selectedState !== 'tout') {
      params.set('state', selectedState)
    }
    
    const queryString = params.toString()
    const currentQuery = searchParams.toString()
    
    // Éviter les mises à jour inutiles
    if (queryString !== currentQuery) {
      const newUrl = queryString ? `?${queryString}` : window.location.pathname
      router.replace(newUrl, { scroll: false })
    }
  }, [selectedType, selectedState, router, isInitialized, searchParams])
  // Fonction pour formater le titre à partir de size et state
  const formatTitle = (size: string, state: string, type: string): string => {
    const stateLabels: Record<string, string> = {
      'neuf': 'Neuf',
      'occasion': 'Occasion',
      'premier-voyage': 'Premier voyage'
    };
    
    if (type === 'bungalow') {
      return `Bungalow ${stateLabels[state] || state}`;
    }
    
    return `Conteneur ${size} ${stateLabels[state] || state}`;
  };

  // Fonction pour formater les dimensions
  const formatDimensions = (dimensions: { length: number; width: number; height: number }): string => {
    return `${dimensions.length}m x ${dimensions.width}m x ${dimensions.height}m`;
  };

  // Fonction pour formater le prix
  const formatPrice = (price: number): string => {
    return `${price}€ HT`;
  };

  // Fonction pour formater le prix de location
  const formatRentalPrice = (price: number | null): string | null => {
    if (price === null) return null
    return `${price}€ HT/mois`
  }

  // Filtrer les containers selon les sélections
  const filteredContainers = containers.filter((container) => {
    const typeMatch = selectedType === 'tous' || container.type === selectedType
    const stateMatch = selectedState === 'tout' || container.state === selectedState
    return typeMatch && stateMatch
  })

  return (
    <main className="pt-30 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-24 bg-neutral-100 overflow-x-hidden">
      <header className="flex flex-col justify-start gap-5">
        <h1 className="RedHat font-bold text-5xl uppercase">Notre catalogue</h1>
        <p className="Inter text-base text-[#727272]">Découvrez notre gamme complète de bungalows et conteneurs disponibles à la vente et à la location</p>
        
        {/* Filtres */}
        <div className="mt-3">
          {/* Bouton pour ouvrir les filtres sur mobile */}
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="sm:hidden w-full bg-neutral-200 rounded-full px-4 py-2.5 flex items-center justify-between text-sm font-medium"
          >
            <span>Filtres</span>
            <svg
              className={`w-5 h-5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Panneau de filtres */}
          <div className={`${isFiltersOpen ? 'block' : 'hidden'} sm:block`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-0">
              {/* Filtre par type */}
              <div className="flex gap-1 bg-neutral-200 rounded-full p-1 w-full sm:w-fit overflow-x-auto sm:overflow-visible">
                <button
                  onClick={() => setSelectedType('tous')}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedType === 'tous'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-black hover:bg-neutral-300'
                  }`}
                >
                  Tous les produits
                </button>
                <button
                  onClick={() => setSelectedType('conteneur')}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedType === 'conteneur'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-black hover:bg-neutral-300'
                  }`}
                >
                  Conteneurs
                </button>
                <button
                  onClick={() => setSelectedType('bungalow')}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedType === 'bungalow'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-black hover:bg-neutral-300'
                  }`}
                >
                  Bungalows
                </button>
              </div>

              {/* Filtre par état */}
              <div className="flex gap-1 bg-neutral-200 rounded-full p-1 w-full sm:w-fit overflow-x-auto sm:overflow-visible">
                <button
                  onClick={() => setSelectedState('tout')}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedState === 'tout'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-black hover:bg-neutral-300'
                  }`}
                >
                  Tout
                </button>
                <button
                  onClick={() => setSelectedState('neuf')}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedState === 'neuf'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-black hover:bg-neutral-300'
                  }`}
                >
                  Neuf
                </button>
                <button
                  onClick={() => setSelectedState('occasion')}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedState === 'occasion'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-black hover:bg-neutral-300'
                  }`}
                >
                  Occasion
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-20">
        {filteredContainers.map((container) => (
          <ProductCard
            key={container.id}
            id={container.id}
            image={container.image}
            title={formatTitle(container.size, container.state, container.type)}
            description={container.description}
            littleDescription={container.littleDescription}
            price={formatPrice(container.purchasePrice)}
            rentalPrice={formatRentalPrice(container.rentalPrice)}
            productType={container.type}
            dimensions={container.dimensions}
          />
        ))}
      </section>
      
    </main>
  )
}
