import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Produit",
  description: "Découvrez les détails de nos conteneurs maritimes et bungalows. Dimensions, caractéristiques, tarifs de vente et location. Demandez un devis personnalisé pour votre projet.",
  keywords: [
    "conteneur détail",
    "bungalow détail",
    "caractéristiques conteneur",
    "tarif conteneur",
    "prix conteneur",
  ],
  openGraph: {
    title: "Produit - LD Stock | Conteneurs et Bungalows",
    description: "Découvrez les détails de nos conteneurs maritimes et bungalows. Dimensions, caractéristiques, tarifs de vente et location.",
    images: [
      {
        url: "/img/Container_mockup.png",
        width: 1200,
        height: 630,
        alt: "Produit LD Stock",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Produit - LD Stock | Conteneurs et Bungalows",
    description: "Découvrez les détails de nos conteneurs maritimes et bungalows.",
    images: ["/img/Container_mockup.png"],
  },
}

export default function ProduitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
