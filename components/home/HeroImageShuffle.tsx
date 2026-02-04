'use client'

import { useMemo, useEffect, useState } from 'react'

// Predefined hero images: clubs, events, and student activities
const HERO_IMAGES = [
  '/clubs/ANSXtra/Shuffle/3.JPG',
  '/clubs/ANSXtra/Shuffle/4.JPG',
  '/clubs/ANSXtra/Shuffle/5.JPG',
  '/clubs/ANSXtra/Shuffle/7.JPG',
  '/clubs/ANSXtra/Shuffle/8.JPG',
  '/clubs/ANSXtra/Shuffle/9.JPG',
  '/clubs/ANSXtra/Shuffle/10.JPG',
  '/clubs/ANSXtra/Shuffle/11.JPEG',
  '/clubs/ANSXtra/Shuffle/12.JPG',
  '/clubs/ANSXtra/Shuffle/14.JPG',
  '/clubs/ANSXtra/Shuffle/15.JPG',
  '/clubs/ANSXtra/Shuffle/16.JPG',
  '/clubs/ANSXtra/Shuffle/18.JPG',
  '/clubs/ANSXtra/Shuffle/19.JPG',
  '/clubs/ANSXtra/Shuffle/20.JPG',
]

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const INTERVAL_MS = 4500
const FADE_DURATION_MS = 1200

export function HeroImageShuffle() {
  const images = useMemo(() => shuffleArray(HERO_IMAGES), [])
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => s + 1)
    }, INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const index = step % images.length
  const visibleSlot = step % 2
  const slotAImageIndex = step % 2 === 0 ? index : (index + 1) % images.length
  const slotBImageIndex = step % 2 === 0 ? (index + 1) % images.length : index

  const slotAImage = images[slotAImageIndex]
  const slotBImage = images[slotBImageIndex]

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Base gradient - ensures dark fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-brand-navy to-brand-deep" />

      {/* Slot A - key forces remount for zoom restart */}
      <div
        key={`a-${slotAImageIndex}`}
        className="absolute inset-0 transition-opacity ease-out"
        style={{
          opacity: visibleSlot === 0 ? 1 : 0,
          transitionDuration: `${FADE_DURATION_MS}ms`,
        }}
      >
        <img
          src={slotAImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] saturate-[0.75] contrast-[1.05] animate-hero-zoom"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      {/* Slot B */}
      <div
        key={`b-${slotBImageIndex}`}
        className="absolute inset-0 transition-opacity ease-out"
        style={{
          opacity: visibleSlot === 1 ? 1 : 0,
          transitionDuration: `${FADE_DURATION_MS}ms`,
        }}
      >
        <img
          src={slotBImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7] saturate-[0.75] contrast-[1.05] animate-hero-zoom"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      {/* Dark gradient overlay - text and UI dominant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(11, 16, 32, 0.85) 0%, rgba(15, 23, 42, 0.6) 35%, rgba(15, 23, 42, 0.4) 100%),
            radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(11, 16, 32, 0.4) 100%),
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)
          `,
        }}
      />
    </div>
  )
}
