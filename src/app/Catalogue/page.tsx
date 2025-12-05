import { Suspense } from "react"
import CatalogueContent from "./CatalogueContent"

export default function CataloguePage() {
  return (
    <Suspense fallback={
      <main className="pt-30 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-24 bg-neutral-100 overflow-x-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <p className="Inter text-base text-[#727272]">Chargement...</p>
        </div>
      </main>
    }>
      <CatalogueContent />
    </Suspense>
  )
}