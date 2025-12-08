import type { Metadata } from "next"
import { Inter, Red_Hat_Display, Poppins, Lato } from "next/font/google"
import Script from "next/script"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SmoothScroll from "../components/SmoothScroll"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "900"],
  variable: "--font-red-hat",
  display: "swap",
  preload: true,
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "900"],
  variable: "--font-lato",
  display: "swap",
  preload: true,
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ldstock.fr"
const siteName = "LD Stock - Conteneurs et Bungalows"
const defaultDescription = "Vente et location de conteneurs maritimes et bungalows en France. Solutions modulaires pour professionnels et particuliers. Stock permanent, livraison rapide dans toute la France."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "conteneur maritime",
    "conteneur vente",
    "conteneur location",
    "bungalow",
    "bungalow chantier",
    "stockage modulaire",
    "conteneur 20 pieds",
    "conteneur 40 pieds",
    "bureaux modulaires",
    "cabine sanitaire",
    "solution modulaire",
    "conteneur France",
    "livraison conteneur",
  ],
  authors: [{ name: "LD Stock" }],
  creator: "LD Stock",
  publisher: "LD Stock",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: "/img/Main_bg_image.png",
        width: 1200,
        height: 630,
        alt: "LD Stock - Conteneurs et Bungalows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/img/Main_bg_image.png"],
    creator: "@ldstock",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LD Stock",
  url: siteUrl,
  logo: `${siteUrl}/logo/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33-6-98-24-86-90",
    contactType: "customer service",
    areaServed: "FR",
    availableLanguage: "French",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "602 route des Palombes",
    addressLocality: "Villegouge",
    postalCode: "33141",
    addressCountry: "FR",
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} ${redHat.variable} ${lato.variable} ${poppins.variable} antialiased overflow-x-hidden`}>
        <SmoothScroll>
          <Header/>
          {children}
          <Footer/>
        </SmoothScroll>
      </body>
    </html>
  )
}
