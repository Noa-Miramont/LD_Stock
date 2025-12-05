'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Form from "../../components/ui/Form"

function ContactContent() {
    const searchParams = useSearchParams()
    
    // Lire les paramètres de l'URL
    const objet = searchParams.get('objet') || ''
    const service = searchParams.get('service') || ''
    const taille = searchParams.get('taille') || ''
    const localisation = searchParams.get('localisation') || ''
    const typeConteneur = searchParams.get('typeConteneur') || ''

    // Préparer les valeurs initiales pour le formulaire
    const initialValues = {
        objet: objet as any,
        service: service as any,
        taille: taille,
        localisation: localisation,
        typeConteneur: typeConteneur as any
    }

    return (
        <main className="pt-30 px-4 sm:px-6 md:px-10 lg:px-20 bg-neutral-100 min-h-screen space-y-16 overflow-x-hidden">
            <header className="flex flex-col justify-start gap-5">
                <h1 className="RedHat font-bold text-3xl sm:text-4xl md:text-5xl uppercase">Contactez-nous</h1>
                <p className="Inter text-base text-[#727272]">Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet</p>
           </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-15 w-full">
            <div className="w-full lg:w-2/3 mb-8 lg:mb-20">
                <Form initialValues={initialValues} />
            </div>

            <div className="space-y-12 w-full lg:w-1/3 pb-14">
                <div className="flex flex-col justify-start rounded-2xl bg-white shadow-lg py-5 px-5 space-y-7">
                    <h3 className="poppins text-lg font-medium ">Information de contact</h3>
                    <div className="space-y-8">
                        <div className="flex flex-row justify-start align-center space-x-3">
                            <img src="/icons/Phone_black.svg" alt="Phone_icon" />
                            <div className="flex flex-col justify center align-start">
                                <h5 className="Inter font-xl text-[#727272]">Téléphone</h5>
                                <p className="Inter font-lg">+33 6 98 24 86 90</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start align-center space-x-3">
                            <img src="/icons/Mail.svg" alt="Mail_icon" />
                            <div className="flex flex-col justify center align-start">
                                <h5 className="Inter font-xl text-[#727272]">Email</h5>
                                <p className="Inter font-lg">ldstock@orange.fr</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start rounded-2xl bg-white shadow-lg py-5 px-5 space-y-7">
                    <h3 className="poppins text-lg font-medium ">Horraire d'ouverture</h3>
                    <div className="space-y-8">
                        <div className="flex flex-row justify-start align-center space-x-3">
                            <img src="/icons/Time_light.svg" alt="Phone_icon" />
                            <div className="flex flex-col justify center align-start">
                                <h5 className="Inter font-xl text-[#727272]">Horraire</h5>
                                <p className="Inter font-lg">24h/24 / 7J/7 sur site</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start align-center space-x-3">
                            <img src="/icons/location.svg" alt="Phone_icon" />
                            <div className="flex flex-col justify center align-start">
                                <h5 className="Inter font-xl text-[#727272]">Adresse du site</h5>
                                <p className="Inter font-lg">602 route des Palombes 33141, Villegouge</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        

       </main>
    )
}

export default function ContactPage() {
    return (
        <Suspense fallback={
            <main className="pt-30 px-4 sm:px-6 md:px-10 lg:px-20 bg-neutral-100 min-h-screen space-y-16 overflow-x-hidden">
                <div className="flex items-center justify-center min-h-screen">
                    <p className="Inter text-base text-[#727272]">Chargement...</p>
                </div>
            </main>
        }>
            <ContactContent />
        </Suspense>
    )
}