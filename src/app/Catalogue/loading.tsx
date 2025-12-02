export default function Loading() {
  return (
    <main className="pt-30 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-24 bg-neutral-100 overflow-x-hidden">
      <header className="flex flex-col justify-start gap-5">
        <h1 className="RedHat font-bold text-5xl uppercase">Notre catalogue</h1>
        <p className="Inter text-base text-[#727272]">Découvrez notre gamme complète de bungalows et conteneurs disponibles à la vente et à la location</p>
      </header>
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="Inter text-base text-[#727272]">Chargement...</p>
      </div>
    </main>
  )
}

