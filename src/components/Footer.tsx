import Link from "next/link"

export default function Footer() {
    return (
        <footer
            className="bg-black text-white px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-16 pb-8 overflow-x-hidden"
            aria-labelledby="pied-de-page"
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Section principale */}
                <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-start mb-10 lg:mb-12">
                    {/* Titre principal */}
                    <div>
                        <h5
                            id="pied-de-page"
                            className="RedHat text-[8vw] sm:text-[7.2vw] lg:text-[3.75vw] xl:text-[3.75vw] uppercase leading-tight tracking-tight break-words"
                        >
                            L'ESPACE À <br className="hidden xl:inline" />
                            VOTRE RYTHME
                        </h5>
                    </div>

                    <div className="flex flex-row justify-between w-full lg:w-auto gap-4 sm:gap-6">
                        {/* Navigation */}
                        <nav aria-label="Navigation pied de page" className="flex-shrink-0">
                            <h3 className="text-base font-medium mb-4 lg:mb-6">Navigation</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li>
                                    <Link className="transition hover:text-white" href="/">
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link className="transition hover:text-white" href="/C
                                    atalogue">
                                        Catalogue
                                    </Link>
                                </li>
                                <li>
                                    <Link className="transition hover:text-white" href="/contact">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Contact */}
                        <div className="flex-shrink-0">
                            <h3 className="text-base font-medium mb-4 lg:mb-6">Contact</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li className="break-words">
                                    <span className="font-normal text-white">Location</span> +33 6 98 24 86 90
                                </li>
                                <li className="break-words">
                                    <span className="font-normal text-white">Achat</span> +33 6 76 81 94 56
                                </li>
                                <li className="break-words">ldstock@orange.fr</li>
                            </ul>
                        </div>
                    </div>

                    {/* Horaires */}
                    <div className="hidden lg:block min-w-[200px]">
                        <h3 className="text-base font-medium mb-4 lg:mb-6">Horaires</h3>
                        <ul className="space-y-3 text-sm text-neutral-300">
                            <li>24h/24 et 7j/7 sur site</li>
                            <li>
                                602 route des Palombes<br />
                                33141 Villegouge
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Séparateur */}
                <div className="w-full h-px bg-neutral-700 mb-6" />

                {/* Copyright */}
                <div className="flex flex-col justify-center items-center gap-1">
                    <p className="RedHat text-[14px] md:text-[16px]">© {new Date().getFullYear()} LD Stock. Tous droits réservés.</p>
                    <p className="RedHat text-[12px] md:text-[16px]">
                        Designed and dev by{" "}
                        <Link 
                            href="https://www.noamiramont.com/" 
                            className="pointer-cursor hover:underline"
                        >
                            Noa Miramont
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}