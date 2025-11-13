import Image from "next/image"

export default function Home() {
  return (
    <main className="bg-neutral-100 text-primary-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/Main_bg_image.png"
            alt="Parc de conteneurs industriels"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative flex flex-col gap-6 px-30 pb-24 pt-32 lg:flex-row lg:items-center lg:justify-center">
          <div className="max-w-2xl text-white">
            <h1 className="RedHat uppercase mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Votre partenaire en <span className="text-[#FF8905]">conteneurs</span> et <span className="text-[#FF8905]">bungalows</span>
            </h1>
            <p className="RedHat mt-5 text-sm font-light sm:text-sm">
              Vente et location de solutions modulaires pour professionnels et particuliers.<br />Stock permanent, livraison rapide dans toute la France.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a className="Lato inline-flex items-center justify-center gap-3 rounded-xl bg-transparent border border-white pl-4 pr-6 py-3 text-base font-bold tracking-wide text-white" href="#contact">
                <img src="/icons/Phone_white.svg" alt="" />
                Nous contacter
            </a>
            <a className="Lato inline-flex items-center justify-center gap-3 rounded-xl bg-[#FF8905] px-6 py-3 text-base font-bold tracking-wide text-white transition" href="#contact">
              Voir notre catalogue
            </a>
            </div>
            <dl className="flex flex-row gap-8 mt-12 text-sm sm:grid-cols-3">
              <div className="border-l border-[#FF8905] pl-3 w-[150px]">
                <dd className="RedHat text-3xl font-bold text-white">5+</dd>
                <dt className="text-neutral-200">Année d’expérience</dt>
              </div>
              <div className="border-l border-[#FF8905] pl-3 w-[150px]">                
                <dd className="RedHat text-3xl font-bold text-white">500+</dd>
                <dt className="text-neutral-200">Clients satisfaits</dt>
              </div>
              <div className="border-l border-[#FF8905] pl-3 w-[150px]">
                <dd className="RedHat text-3xl font-bold text-white">100+</dd>
                <dt className="text-neutral-200">Produits livrés</dt>
              </div>
            </dl>
          </div>
          <div className="relative h-145 w-full overflow-hidden rounded-[32px]">
            <Image
              src="/img/conteneurs.png"
              alt="Conteneurs orange empilés"
              fill
              className="object-cover h-full w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

    <section className="flex flex-row justify-center align-center gap-6 mt-10">
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-16 h-min rounded-2xl shadow-lg">
          <img src="/icons/Desk_alt.svg" alt="" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Large gamme</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Bungalow et conteneur pour <br />tout vos besoin</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-16 h-min rounded-2xl shadow-lg">
          <img src="/icons/package.svg" alt="" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Livraison rapide</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Service de livraison dans tout <br />la france</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-16 h-min rounded-2xl shadow-lg">
          <img src="/icons/Chield.svg" alt="" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Qualité garentie</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Produit neuf et d’occasion <br />vérifié</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 bg-white py-8 px-16 h-min rounded-2xl shadow-lg">
          <img src="/icons/Time.svg" alt="" />
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="inter font-medium text-base text-black">Location flexible</h2>
            <p className="Inter font-light text-xs text-[#727272] text-center">Option de location courte ou <br />longue durée</p>
          </div>
        </div>
      </section>

      <section id="catalogue" className="mx-auto px-6 pb-24 pt-24 lg:px-60" aria-labelledby="produits">
        <header className="text-center">
          <h3 className="RedHat uppercase tracking-[0.35em] text-3xl font-semibold text-black">Nos produits</h3>
        </header>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            { label: "À partir de 200€", title: "Conteneurs maritimes", description: "De 10 à 40 pieds, neuf ou d'occasion", image: "/img/conteneur_sombre.png" },
            { label: "À partir de 200€", title: "Bungalow", description: "Entièrement modulable", image: "/img/bungalow_sombre.jpg" },
            { label: "Sur devis", title: "Solution sur mesure", description: "Adaptée à vos besoins", image: "/img/Sur_mesure.png" },
          ].map(item => (
            <article key={item.title} className="group relative overflow-hidden rounded-[28px] bg-primary-950 text-white">
              <Image
                src={item.image}
                alt={item.title}
                width={680}
                height={520}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent" />
              <div className="absolute inset-x-0 top-6 flex justify-end px-6">
                <span className="rounded-full bg-[#FF8905] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">{item.label}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-16">
                <h3 className="RedHat text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-neutral-200">{item.description}</p>
                <a className="mt-6 inline-flex items-center text-sm font-semibold text-accent-300 transition hover:text-accent-200" href="#contact">
                  Découvrir →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {[
            { title: "Conteneurs maritimes", description: "De 10 à 40 pieds, neuf ou d'occasion", image: "/img/Container_mockup.png" },
            { title: "Bungalow", description: "Bungalow de chantier, bureaux modulaires et cabines sanitaires", image: "/img/Bungalow_mockup.png" },
          ].map(item => (
            <article key={item.title} className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-lg">
              <div className="relative h-80 w-full bg-neutral-200 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-6 mt-6">
                <h3 className="Lato text-lg font-semibold text-primary-900">{item.title}</h3>
                <p className="mt-3 text-sm text-neutral-500">{item.description}</p>
                <a className="mt-3 inline-flex items-center rounded-md bg-black px-3 py-2 text-xs font-semibold  tracking-wide text-white transition hover:bg-primary-800" href="#contact">
                  Découvrir
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="bg-[#FF8905] text-primary-950" aria-labelledby="cta">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 py-25 text-center lg:px-12">
          <h2 id="cta" className="RedHat text-5xl font-bold uppercase text-white">Un projet en tête ?</h2>
          <p className="max-w-2xl text-sm sm:text-base text-white">
            Notre équipe d’experts est à votre disposition pour vous conseiller et vous proposer la solution la mieux adaptée à vos besoins.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a className="Lato inline-flex items-center justify-center gap-3 rounded-xl bg-white pl-4 pr-6 py-3 text-base font-bold tracking-wide text-[#FF8905] transition hover:bg-" href="#contact">
              <img src="/icons/Phone.svg" alt="" />
              Nous contacter
            </a>
            <a className="Lato inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 text-base font-bold tracking-wide text-white transition hover:bg-white hover:text-[#FF8905]" href="#catalogue">
              Voir notre catalogue
            </a>
          </div>
        </div>
      </section>
      
    </main>
  )
}