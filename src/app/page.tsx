import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Accueil",
  description: "LD Stock, votre partenaire en conteneurs maritimes et bungalows à Bordeaux et en Aquitaine. Vente et location de solutions modulaires pour professionnels et particuliers. Location conteneur Bordeaux, achat conteneur Bordeaux. Stock permanent, livraison rapide dans toute la France. Plus de 5 ans d'expérience, 500+ clients satisfaits.",
  keywords: [
    "conteneur maritime",
    "location conteneur Bordeaux",
    "achat conteneur Bordeaux",
    "conteneur Bordeaux",
    "conteneur Aquitaine",
    "bungalow",
    "conteneur vente",
    "conteneur location",
    "solution modulaire",
    "stockage modulaire",
    "livraison conteneur France",
  ],
  openGraph: {
    title: "LD Stock - Votre partenaire en conteneurs et bungalows",
    description: "Vente et location de conteneurs maritimes et bungalows à Bordeaux et en Aquitaine. Location conteneur Bordeaux, achat conteneur Bordeaux. Solutions modulaires pour professionnels et particuliers. Stock permanent, livraison rapide dans toute la France.",
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
    title: "LD Stock - Votre partenaire en conteneurs et bungalows",
    description: "Vente et location de conteneurs maritimes et bungalows à Bordeaux et en Aquitaine. Location conteneur Bordeaux, achat conteneur Bordeaux.",
    images: ["/img/Main_bg_image.png"],
  },
}

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "LD Stock - Conteneurs et Bungalows",
  description: "Vente et location de conteneurs maritimes et bungalows à Bordeaux et en Aquitaine",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ldstock.fr",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "LD Stock",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ldstock.fr"}/logo/logo.png`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "602 route des Palombes",
      addressLocality: "Villegouge",
      addressRegion: "Aquitaine",
      postalCode: "33141",
      addressCountry: "FR",
    },
    telephone: "+33-6-98-24-86-90",
    openingHours: "Mo-Su 00:00-23:59",
  },
}

export default function Home() {
  return (
    <>
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />
      <main className="text-primary-900">
      <section id="hero-section" className="relative isolate overflow-hidden pt-20 bg-[#F8FAFB]">
        <div className="absolute inset-0">
          <Image
            src="/img/Main_bg_image.png"
            alt="Parc de conteneurs maritimes à Bordeaux, Aquitaine - LD Stock"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
          />
        </div>
        <div className="relative flex flex-col justify-center items-between xl:flex-row gap-6 px-4 sm:px-10 md:px-14 lg:px-18 pb-24 pt-18">
          <div className="max-w-2xl text-white">
            <h1 className="RedHat uppercase mt-6 text-4xl sm:text-6xl font-black leading-tight lg:text-6xl xl:text-6xl">
              Votre partenaire en <span className="text-[#FF8905]">conteneurs</span> et <span className="text-[#FF8905]">bungalows</span> à <span className="text-[#FF8905]">Bordeaux</span>
            </h1>
            <p className="RedHat mt-5 text-xs sm:text-sm font-light">
              Location et achat de conteneurs maritimes à Bordeaux et en Aquitaine. Solutions modulaires pour professionnels et particuliers.<br className="hidden sm:block" />Stock permanent, livraison rapide dans toute la France.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/Catalogue" className="Lato inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-[#FF8905] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold tracking-wide text-white transition hover:bg-[#e67804]">
                Voir notre catalogue
              </Link>
              <Link href="/contact" className="Lato inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-transparent border border-white pl-3 sm:pl-4 pr-4 sm:pr-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold tracking-wide text-white">
                  <Image src="/icons/Phone_white.svg" alt="Icône téléphone" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                  Nous contacter
              </Link>
            </div>
            <dl className="flex flex-row sm:flex-row gap-6 sm:gap-8 mt-10 sm:mt-12 text-sm">
              <div className="border-l border-[#FF8905] pl-3 sm:w-[150px]">
                <dd className="RedHat text-2xl sm:text-3xl font-bold text-white">5+</dd>
                <dt className="text-neutral-200 text-xs sm:text-sm">Année d'expérience</dt>
              </div>
              <div className="border-l border-[#FF8905] pl-3 sm:w-[150px]">                
                <dd className="RedHat text-2xl sm:text-3xl font-bold text-white">500+</dd>
                <dt className="text-neutral-200 text-xs sm:text-sm">Clients satisfaits</dt>
              </div>
              <div className="border-l border-[#FF8905] pl-3 sm:w-[150px]">
                <dd className="RedHat text-2xl sm:text-3xl font-bold text-white">100+</dd>
                <dt className="text-neutral-200 text-xs sm:text-sm">Produits livrés</dt>
              </div>
            </dl>
          </div>
          <div className="relative h-145 w-full overflow-hidden rounded-[32px] hidden xl:block">
            <Image
              src="/img/conteneurs.png"
              alt="Conteneurs maritimes orange empilés - Location et achat à Bordeaux"
              fill
              className="object-cover h-[0px] w-[0px] sm:h-full sm:w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-5 sm:px-6 lg:px-6 lg:max-w-fit lg:mx-auto py-10 overflow-visible">
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-8 [1340px]:px-16 h-min rounded-2xl shadow-xl">
          <Image src="/icons/Desk.svg" alt="Icône large gamme" width={48} height={48} />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Large gamme</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Bungalow et conteneur pour <br />tout vos besoin</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-8 [1340px]:px-16 h-min rounded-2xl shadow-xl">
          <Image src="/icons/package.svg" alt="Icône livraison rapide" width={48} height={48} />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Livraison rapide</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Service de livraison dans tout <br />la France et en Aquitaine</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-8 [1340px]:px-16 h-min rounded-2xl shadow-xl">
          <Image src="/icons/Chield.svg" alt="Icône qualité garantie" width={48} height={48} />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Qualité garantie</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Produit neuf et d'occasion <br />vérifié</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-8 [1340px]:px-16 h-min rounded-2xl shadow-xl">
          <Image src="/icons/Time.svg" alt="Icône location flexible" width={48} height={48} />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Location flexible</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Option de location courte ou <br />longue durée</p>
          </div>
        </div>
      </section>

      <section id="catalogue" className="mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-60 pb-24 pt-24 overflow-x-hidden" aria-labelledby="produits">
        <header className="text-center">
          <h2 className="RedHat uppercase tracking-[0.35em] text-3xl font-semibold text-black">Nos produits</h2>
        </header>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
            { label: "À partir de 1250€", title: "Conteneurs maritimes", description: "De 10 à 40 pieds, neuf ou d'occasion", image: "/img/conteneur_sombre.png", link:"/Catalogue?type=conteneur", alt:"Location et achat de conteneurs maritimes à Bordeaux, Aquitaine"},
            { label: "À partir de 3000€", title: "Bungalow", description: "Entièrement modulable", image: "/img/Bungalow_sombre.jpg", link:"/Catalogue?type=bungalow", alt:"Bungalows modulaires à Bordeaux et en Aquitaine" },
            { label: "Sur devis", title: "Solution sur mesure", description: "Envoyer nous un message et Détaillé nous votre demande", image: "/img/Sur_mesure.png", link:"/contact", alt:"Solutions sur mesure pour conteneurs à Bordeaux" },
          ].map(item => (
            <article key={item.title} className="group relative overflow-hidden rounded-[28px] bg-primary-950 text-white shadow-lg cursor-pointer">
              <Link href={item.link}>
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  width={680}
                  height={520}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  unoptimized={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent" />
                <div className="absolute inset-x-0 top-6 flex justify-end px-6">
                  <span className="rounded-full bg-[#FF8905] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">{item.label}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
                  <h3 className="RedHat text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-neutral-200">{item.description}</p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-accent-300 transition hover:text-accent-200">
                    Découvrir →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {[
            { title: "Conteneurs maritimes", description: "De 10 à 40 pieds, neuf ou d'occasion", image: "/img/Container_mockup.png", alt:"Conteneurs maritimes disponibles à Bordeaux et en Aquitaine" },
            { title: "Bungalow", description: "Bungalow de chantier, bureaux modulaires et cabines sanitaires", image: "/img/Bungalow_mockup.png", alt:"Bungalows modulaires à Bordeaux et en Aquitaine" },
          ].map(item => (
            <article key={item.title} className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-lg">
              <div className="relative h-80 w-full bg-neutral-200 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-6 mt-6">
                <h3 className="Lato text-xl font-semibold text-primary-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{item.description}</p>
                <Link href="/Catalogue" className="mt-5 inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold tracking-wide text-white transition hover:bg-primary-800">
                  Découvrir
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="bg-[#FF8905] text-primary-950 overflow-x-hidden" aria-labelledby="cta">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 py-25 px-4 sm:px-6 md:px-12 text-center">
          <h2 id="cta-title" className="RedHat text-[6vw] sm:text-5xl font-bold uppercase text-white">Un projet en tête ?</h2>
          <p className="max-w-2xl text-sm sm:text-base text-white">
            Notre équipe d’experts est à votre disposition pour vous conseiller et vous proposer la solution la mieux adaptée à vos besoins.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="Lato inline-flex items-center justify-center gap-3 rounded-xl bg-white pl-4 pr-6 py-3 text-base font-bold tracking-wide text-[#FF8905] transition hover:bg-gray-50">
              <Image src="/icons/Phone.svg" alt="Icône téléphone" width={20} height={20} />
              Nous contacter
            </Link>
            <Link href="/Catalogue" className="Lato inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 text-base font-bold tracking-wide text-white transition hover:bg-white hover:text-[#FF8905]">
              Voir notre catalogue
            </Link>
          </div>
        </div>
      </section>
      
    </main>
    </>
  )
}