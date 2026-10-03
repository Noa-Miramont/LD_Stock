'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const BungalowScene = dynamic(
  () => import('@/components/BungalowScene').then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-500">
        Chargement 3D...
      </div>
    ),
  }
)

type GalleryPhoto = { src: string, alt: string }

const photoSets: Record<'neuf' | 'occasion', GalleryPhoto[]> = {
  neuf: [
    { src: '/img/Bungalow_neuf_exterieur_1.jpeg', alt: 'Bungalow neuf, vue extérieure 1' },
    { src: '/img/Bungalow_neuf_exterieur_2.jpeg', alt: 'Bungalow neuf, vue extérieure 2' },
    { src: '/img/Bungalow_neuf_exterieur_3.jpeg', alt: 'Bungalow neuf, vue extérieure 3' },
    { src: '/img/Bungalow_neuf_interieur_1.jpeg', alt: 'Bungalow neuf, vue intérieure 1' },
    { src: '/img/Bungalow_neuf_interieur_2.jpeg', alt: 'Bungalow neuf, vue intérieure 2' },
  ],
  occasion: [
    { src: '/img/Bungalow_occasion_exterieur_1.jpeg', alt: "Bungalow d'occasion 6 m x 3 m, vue extérieure 1" },
    { src: '/img/Bungalow_occasion_exterieur_2.jpeg', alt: "Bungalow d'occasion 6 m x 3 m, vue extérieure 2" },
    { src: '/img/Bungalow_occasion_exterieur_3.jpeg', alt: "Bungalow d'occasion 6 m x 3 m, vue extérieure 3" },
    { src: '/img/Bungalow_occasion_interieur_1.jpeg', alt: "Bungalow d'occasion 6 m x 3 m, vue intérieure 1" },
    { src: '/img/Bungalow_occasion_interieur_2.jpeg', alt: "Bungalow d'occasion 6 m x 3 m, vue intérieure 2" },
  ],
}

type Slide =
  | { kind: 'model' }
  | { kind: 'photo', src: string, alt: string }

const SWIPE_RATIO = 0.18

export default function BungalowGallery({ variant = 'neuf' }: { variant?: 'neuf' | 'occasion' }) {
  const slides: Slide[] = [
    { kind: 'model' },
    ...photoSets[variant].map((photo) => ({ kind: 'photo' as const, src: photo.src, alt: photo.alt })),
  ]
  const total = slides.length
  const viewportRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const dragging = useRef(false)
  const [index, setIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const [moving, setMoving] = useState(false)

  const wrap = (value: number) => (value + total) % total

  const settle = (direction: -1 | 0 | 1) => {
    if (direction === 0) {
      if (offset === 0) {
        setMoving(false)
        return
      }
      setMoving(true)
      setOffset(0)
      return
    }
    const width = viewportRef.current?.clientWidth || 1
    setMoving(true)
    setOffset(direction * -width)
  }

  const onTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
    const width = viewportRef.current?.clientWidth || 1
    if (Math.abs(offset) < width * 0.5) {
      setMoving(false)
      setOffset(0)
      return
    }
    const direction = offset < 0 ? 1 : -1
    setMoving(false)
    setIndex((current) => wrap(current + direction))
    setOffset(0)
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || moving) return
    if ((event.target as HTMLElement).closest('button')) return
    dragging.current = true
    startX.current = event.clientX
    setMoving(false)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Le geste reste suivi via les événements du viewport.
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    setOffset(event.clientX - startX.current)
  }

  const finishDrag = (clientX: number) => {
    if (!dragging.current) return
    dragging.current = false
    const width = viewportRef.current?.clientWidth || 1
    const delta = clientX - startX.current
    if (delta <= -width * SWIPE_RATIO) settle(1)
    else if (delta >= width * SWIPE_RATIO) settle(-1)
    else settle(0)
  }

  const goTo = (nextIndex: number) => {
    if (moving || nextIndex === index) return
    const forward = wrap(nextIndex - index)
    const backward = wrap(index - nextIndex)
    if (forward === 1) settle(1)
    else if (backward === 1) settle(-1)
    else {
      setMoving(false)
      setIndex(nextIndex)
      setOffset(0)
    }
  }

  const windowSlides = [wrap(index - 1), index, wrap(index + 1)]

  return (
    <div
      ref={viewportRef}
      className="relative h-full w-full touch-pan-y select-none"
      role="region"
      aria-label="Carrousel du bungalow"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(event) => finishDrag(event.clientX)}
      onPointerCancel={() => finishDrag(startX.current)}
    >
      <div className="h-full overflow-hidden">
        <div
          className="flex h-full"
          style={{
            width: '300%',
            transform: `translateX(calc(-33.333333% + ${offset}px))`,
            transition: moving ? 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {windowSlides.map((slideIndex) => {
            const slide = slides[slideIndex]
            return (
              <div key={slideIndex} className="relative h-full w-1/3 shrink-0">
                {slide.kind === 'model' ? (
                  <div className="absolute inset-0 [&_canvas]:pointer-events-none">
                    <BungalowScene />
                  </div>
                ) : (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={slideIndex === 1}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Vue précédente"
        onClick={() => goTo(wrap(index - 1))}
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Vue suivante"
        onClick={() => goTo(wrap(index + 1))}
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((slide, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            aria-label={slide.kind === 'model' ? 'Vue 3D' : `Photo ${dotIndex}`}
            aria-current={index === dotIndex ? 'true' : undefined}
            onClick={() => goTo(dotIndex)}
            className={`h-2.5 w-2.5 cursor-pointer rounded-full ${index === dotIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
