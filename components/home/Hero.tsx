'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { HeroImageShuffle } from './HeroImageShuffle'

// Typewriter effect for the tagline
function TypewriterText() {
  const phrases = [
    'Discover your passion',
    'Build new skills',
    'Make lasting friendships',
    'Lead with purpose',
  ]
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[currentPhrase]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < phrase.length) {
          setDisplayText(phrase.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        }
      }
    }, isDeleting ? 30 : 80)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase, phrases])

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background image slideshow - full bleed, fixed position */}
      <HeroImageShuffle />

      {/* Animated gradient orbs - sit above images */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-brand-purple/20 blur-[150px] z-[1]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-brand-pink/15 blur-[130px] z-[1]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-blue/10 blur-[180px] z-[1]" 
      />

      {/* Left-side scrim - dark gradient behind text area only */}
      <div
        className="absolute left-0 top-0 bottom-0 w-full max-w-[min(100%,42rem)] z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(11, 16, 32, 0.75) 0%, rgba(15, 23, 42, 0.5) 55%, rgba(15, 23, 42, 0) 100%)',
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          {/* Hero content - single column over background */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/90 text-sm font-medium mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Amnuaysilpa School
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]"
            >
              <span className="text-brand-pink" style={{ textShadow: '0 0 24px rgba(217,70,239,0.4), 0 0 48px rgba(217,70,239,0.3)' }}>ANS</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Xtra</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-white/85 font-normal leading-relaxed mb-4"
            >
              Extracurriculars Portal
            </motion.p>

            {/* Typewriter tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg mb-8 h-7"
            >
              <TypewriterText />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button href="/clubs" size="lg">
                Browse Clubs
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button href="#how-it-works" variant="outline" size="lg">
                How It Works
              </Button>
            </motion.div>

            {/* Credits */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/50 text-sm font-medium"
            >
              By Nanon, Eve and Teeoff
            </motion.p>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
