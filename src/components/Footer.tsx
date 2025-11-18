export default function Header() {
    return (
        <footer className="flex flex-col justify-center items-center bg-black text-neutral-200 px-[80px] pt-[70px] pb-[30px] bg-radial-[at_80%_0%] from-[#181818] to-black" aria-labelledby="pied-de-page">
            <div className="flex flex-row justify-between w-full ">
                <div className="w-2/3">
                    <h5 id="pied-de-page" className="RedHat text-6xl text-white uppercase">L’espace à <br />votre rythme</h5>
                </div>

                <div className="flex flex-row justify-between w-full">
                    <nav aria-label="Navigation pied de page">
                        <h3 className="Inter text-sm font-semibold uppercase tracking-wide text-white">Navigation</h3>
                        <ul className="Inter mt-4 space-y-3 text-sm font-extralight">
                            <li><a className="transition hover:text-accent-300" href="/">Accueil</a></li>
                            <li><a className="transition hover:text-accent-300" href="/catalogue">Catalogue</a></li>
                            <li><a className="transition hover:text-accent-300" href="/">Contact</a></li>
                        </ul>
                    </nav>
                    <div>
                    <h3 className="RedHat text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
                    <ul className="Inter mt-4 space-y-3 text-sm font-extralight">
                        <li><span className="font-normal">Location</span> +33 6 98 24 86 90</li>
                        <li><span className="font-normal">Achat</span> +33 6 76 81 94 56</li>
                        <li>ldstock@orange.fr</li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="RedHat text-sm font-semibold uppercase tracking-wide text-white">Horaires</h3>
                    <ul className="Inter mt-4 space-y-3 text-sm font-extralight">
                        <li>24h/24 et 7j/7 sur site</li>
                        <li>602 route des Palombes<br />33141 Villegouge</li>
                    </ul>

                </div>

                </div>
            </div>

                <div className="w-full h-px bg-white opacity-40 mt-8"/>
                <p className="Lato mt-4 text-xs text-neutral-400">© {new Date().getFullYear()} LD Stock. Tous droits réservés.</p>
                <span className="Lato text-xs text-neutral-400">Designed and dev by <a href="https://www.noamiramont.com/" className="hover:underline cursor">Noa Miramont</a></span>
        </footer>
    );
}