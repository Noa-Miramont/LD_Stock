"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isOverHero, setIsOverHero] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(href)
  }

  useEffect(() => {
    // Uniquement sur la page d'accueil
    if (pathname !== "/") {
      setIsOverHero(false)
      return
    }

    let cleanup: (() => void) | null = null

    // Attendre que le DOM soit complètement chargé
    const checkHeroSection = () => {
      const heroSection = document.getElementById("hero-section")
      if (!heroSection) {
        // Réessayer après un court délai si la section n'est pas encore disponible
        setTimeout(checkHeroSection, 100)
        return
      }

      // Écouter le scroll pour détecter quand on est au-dessus de la section hero
      const handleScroll = () => {
        if (!heroSection) return
        const rect = heroSection.getBoundingClientRect()
        const headerHeight = 80
        
        // Si on est au-dessus de la section hero (le bas de la section est encore visible)
        if (rect.bottom > headerHeight) {
          setIsOverHero(true)
        } else {
          setIsOverHero(false)
        }
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      // Vérifier l'état initial après un court délai pour s'assurer que le layout est calculé
      setTimeout(handleScroll, 0)
      requestAnimationFrame(handleScroll)

      cleanup = () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }

    checkHeroSection()

    return () => {
      if (cleanup) cleanup()
    }
  }, [pathname])

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 overflow-x-hidden ${
      isOverHero && pathname === "/" 
        ? "bg-white md:bg-transparent" 
        : "bg-white"
    }`}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/logo/logo.png" 
              alt="LD Stock" 
              width={120} 
              height={48} 
              className={`h-12 w-auto transition-all duration-300 ${
                isOverHero && pathname === "/"
                  ? "drop-shadow-lg brightness-110"
                  : ""
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors relative ${
                  isActive(item.href)
                    ? isOverHero && pathname === "/"
                      ? "text-white font-semibold"
                      : "text-slate-900 font-semibold"
                    : isOverHero && pathname === "/"
                      ? "text-white hover:text-white/80"
                      : "text-slate-600 hover:text-slate-900"
                } ${
                  isActive(item.href) ? "border-b border-[#FF8905]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="Lato inline-flex items-center justify-center rounded-xl bg-[#FF8905] px-6 py-2.5 text-sm font-bold tracking-wide text-white transition hover:bg-[#e67804]"
            >
              Demander un devis
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              isOverHero && pathname === "/"
                ? "text-white hover:text-white/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className={`md:hidden pb-4 space-y-2 ${
            isOverHero && pathname === "/" ? "bg-white rounded-lg mt-2" : ""
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-2 rounded transition-colors relative ${
                  isActive(item.href)
                    ? "bg-slate-100 text-slate-900 font-semibold border-l-4 border-[#FF8905]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="Lato inline-flex items-center justify-center w-full rounded-xl bg-[#FF8905] px-6 py-2.5 text-sm font-bold tracking-wide text-white transition hover:bg-[#e67804]"
              >
                Demander un devis
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}