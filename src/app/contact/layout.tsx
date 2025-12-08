import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez LD Stock à Bordeaux pour toute demande de devis ou d'information sur nos conteneurs maritimes et bungalows. Location conteneur Bordeaux, achat conteneur Bordeaux. Notre équipe est disponible 24h/24 et 7j/7. Téléphone : +33 6 98 24 86 90 - Email : ldstock@orange.fr",
  keywords: [
    "contact LD Stock",
    "contact conteneur Bordeaux",
    "devis conteneur Bordeaux",
    "devis conteneur",
    "devis bungalow",
    "demande devis",
    "conseil conteneur",
    "conteneur Aquitaine",
  ],
  openGraph: {
    title: "Contact - LD Stock | Conteneurs et Bungalows",
    description: "Contactez notre équipe à Bordeaux pour toute demande de devis ou d'information sur location et achat de conteneurs. Disponible 24h/24 et 7j/7.",
    images: [
      {
        url: "/img/Main_bg_image.png",
        width: 1200,
        height: 630,
        alt: "Contact LD Stock",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - LD Stock | Conteneurs et Bungalows",
    description: "Contactez notre équipe à Bordeaux pour toute demande de devis ou d'information sur conteneurs et bungalows.",
    images: ["/img/Main_bg_image.png"],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
