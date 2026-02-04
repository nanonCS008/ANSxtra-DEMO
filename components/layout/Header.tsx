'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const LOGOS = [
  { src: '/clubs/ANSXtra/Logos/IMG_6913.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6914.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6915.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6916.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6917.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6918.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6919.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6920.PNG', alt: '' },
  { src: '/clubs/ANSXtra/Logos/IMG_6921.WEBP', alt: '' },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/clubs', label: 'Clubs' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'
  const headerVisible = scrolled || !isHome

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        headerVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none',
        headerVisible && 'bg-brand-deep/90 backdrop-blur-xl border-b border-white/10'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logos section */}
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            <Link href="/" className="relative flex h-9 flex-shrink-0 items-center md:h-11">
              <Image
                src="/clubs/ANSXtra/School%20logo/amnuaysilpa-white%20(1).png"
                alt="Amnuaysilpa School"
                width={130}
                height={44}
                className="h-full w-auto max-h-full object-contain object-left rounded-sm"
              />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-white/15 flex-shrink-0" />
            <div className="relative min-w-0 flex-1 overflow-hidden py-1">
              <div className="logo-marquee flex w-max shrink-0 items-center gap-3">
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                  <div
                    key={i}
                    className="relative h-6 w-7 flex-shrink-0 sm:h-7 sm:w-9 md:h-8 md:w-10 flex items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10 p-1"
                  >
                    <Image
                      src={logo.src}
                      alt=""
                      width={40}
                      height={24}
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            <span className="hidden sm:inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/10 whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple font-semibold">9+</span>
              clubs
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  'border border-transparent backdrop-blur-md',
                  pathname === link.href
                    ? 'text-white bg-white/10 border-white/10'
                    : 'text-white/75 hover:text-white hover:bg-white/[0.06] hover:border-white/5 hover:-translate-y-0.5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/clubs"
              className={cn(
                'ml-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                'bg-gradient-to-r from-brand-pink to-brand-purple text-white',
                'hover:shadow-glow-sm hover:-translate-y-0.5'
              )}
            >
              Browse Clubs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-brand-deep/95 backdrop-blur-xl border-b border-white/10"
        >
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-white bg-white/10'
                    : 'text-white/75 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/clubs"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block text-center mt-4 px-5 py-3 rounded-xl text-base font-semibold',
                'bg-gradient-to-r from-brand-pink to-brand-purple text-white transition-all duration-200'
              )}
            >
              Browse Clubs
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
