import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Découvrez notre catalogue complet de conteneurs maritimes et bungalows à Bordeaux et en Aquitaine. Vente et location de conteneurs de 6 à 40 pieds, neufs ou d'occasion. Location conteneur Bordeaux, achat conteneur Bordeaux. Bungalows de chantier, bureaux modulaires et cabines sanitaires. Plus de 100 produits disponibles.",
  keywords: [
    "catalogue conteneur",
    "catalogue bungalow",
    "conteneur maritime",
    "location conteneur Bordeaux",
    "achat conteneur Bordeaux",
    "conteneur Bordeaux",
    "conteneur Aquitaine",
    "conteneur 20 pieds",
    "conteneur 40 pieds",
    "bungalow chantier",
    "bureaux modulaires",
    "vente conteneur",
    "location conteneur",
  ],
  openGraph: {
    title: "Catalogue - LD Stock | Conteneurs et Bungalows",
    description: "Découvrez notre catalogue complet de conteneurs maritimes et bungalows à Bordeaux et en Aquitaine. Location conteneur Bordeaux, achat conteneur Bordeaux. Plus de 100 produits disponibles pour tous vos besoins de stockage modulaire.",
    images: [
      {
        url: "/img/Container_mockup.png",
        width: 1200,
        height: 630,
        alt: "Catalogue conteneurs et bungalows LD Stock",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogue - LD Stock | Conteneurs et Bungalows",
    description: "Découvrez notre catalogue complet de conteneurs maritimes et bungalows à Bordeaux et en Aquitaine.",
    images: ["/img/Container_mockup.png"],
  },
}

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
