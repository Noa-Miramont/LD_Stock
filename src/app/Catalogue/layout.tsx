// Force dynamic rendering for this route to prevent 404 errors in production
// This prevents Next.js from trying to statically generate this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
