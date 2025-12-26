"use client"

import { useEffect, useState } from "react"

const ShieldIcon = () => (
  <svg
    className="h-5 w-5 text-[#FF8905]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3 4.5 6v6.5c0 3.9 3 7.4 7.5 8.5 4.5-1.1 7.5-4.6 7.5-8.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const CloseIcon = () => (
  <svg
    className="h-5 w-5 text-white/80 hover:text-white transition"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

export default function SecurityNotice() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem("ldstock-security-notice") === "hidden"
    if (!dismissed) setVisible(true)
    setMounted(true)
  }, [])

  const handleClose = () => {
    setVisible(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("ldstock-security-notice", "hidden")
    }
  }

  if (!mounted || !visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] sm:max-w-sm drop-shadow-2xl">
      <div className="overflow-hidden rounded-2xl border border-[#FF8905] bg-white">
        <div className="flex items-center justify-between bg-[#0b1120] px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <p className="text-sm font-semibold">Ateention</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer l'alerte"
            className="p-1 -m-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8905]"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-3 px-4 py-4 text-sm text-slate-800">
          <p className="font-semibold text-[#0b1120]">
            ldstock.fr est le seul site officiel de notre entreprise.
          </p>
          <p className="leading-relaxed text-slate-700">
            LD Stock ne vous demandera jamais de payer en ligne quelque service.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#FF8905] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e67804] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8905]"
          >
            J&apos;ai compris
          </button>
        </div>
      </div>
    </div>
  )
}
