export default function Footer() {
    return (
        <footer
            className="bg-black text-white px-6 sm:px-10 lg:px-16 xl:px-20 pt-16 pb-8"
            aria-labelledby="pied-de-page"
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Section principale */}
                <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-start mb-10 lg:mb-12">
                    {/* Titre principal */}
                    <div>
                        <h5
                            id="pied-de-page"
                            className="RedHat text-[7.2vw] lg:text-[3.75vw] xl:text-[3.75vw] uppercase leading-tight tracking-tight"
                        >
                            L'ESPACE À <br className="hidden xl:inline" />
                            VOTRE RYTHME
                        </h5>
                    </div>

                    <div className="flex flex-row justify-between w-full lg:w-auto">
                        {/* Navigation */}
                        <nav aria-label="Navigation pied de page" className="min-w-[160px]">
                            <h3 className="text-base font-medium mb-4 lg:mb-6">Navigation</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li>
                                    <a className="transition hover:text-white" href="/">
                                        Accueil
                                    </a>
                                </li>
                                <li>
                                    <a className="transition hover:text-white" href="/catalogue">
                                        Catalogue
                                    </a>
                                </li>
                                <li>
                                    <a className="transition hover:text-white" href="/contact">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* Contact */}
                        <div className="min-w-[240px]">
                            <h3 className="text-base font-medium mb-4 lg:mb-6">Contact</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li>
                                    <span className="font-normal text-white">Location</span> +33 6 98 24 86 90
                                </li>
                                <li>
                                    <span className="font-normal text-white">Achat</span> +33 6 76 81 94 56
                                </li>
                                <li>ldstock@orange.fr</li>
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
                        <a 
                            href="https://www.noamiramont.com/" 
                            className="pointer-cursor hover:underline"
                        >
                            Noa Miramont
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}