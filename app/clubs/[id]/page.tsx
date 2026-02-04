'use client'

import { ImageLightbox } from '@/components/clubs/ImageLightbox'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import {
  getClubTintHex,
  getClubTintRgb,
} from '@/lib/clubHues'
import {
  getClubCategory,
  getCategoryLayout,
  PERSONALIZATION_TITLE_BY_CATEGORY,
} from '@/lib/clubCategory'
import { getClubType } from '@/lib/clubTypes'
import {
  getShortSummaryTwoLines,
  getWhatWeDoBullets,
} from '@/lib/descriptionHighlights'
import { getClubById } from '@/lib/data'
import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

const MEETING_ICONS = {
  day: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  time: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  location: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3  0 016 0z" />
    </>
  ),
  year: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  ),
}

export default function ClubDetailPage() {
  const params = useParams()
  const clubId = params.id as string
  const club = getClubById(clubId)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  if (!club) notFound()

  const category = getClubCategory(club.id)
  const layout = getCategoryLayout(category)
  const tintRgb = getClubTintRgb(club.id)
  const tintHex = getClubTintHex(club.id)
  const clubType = getClubType(club.id)

  const mainImage = club.image || (club.images && club.images[0]) || ''
  const galleryImages = club.images && club.images.length > 0 ? club.images : mainImage ? [mainImage] : []

  const taglineOneSentence = club.tagline
    ? (() => {
        const t = club.tagline.trim()
        const match = t.match(/^[^.!?]*[.!?]?/)
        const first = (match ? match[0] : t.slice(0, 80)).trim()
        return first.endsWith('.') || first.endsWith('!') || first.endsWith('?') ? first : first + '.'
      })()
    : ''

  const shortSummary = useMemo(
    () => getShortSummaryTwoLines(club.description || '', 120),
    [club.description]
  )
  const isLongDescription = club.description && club.description.length > 120
  const descriptionToShow = descriptionExpanded || !isLongDescription ? club.description : shortSummary

  const whatWeDo = useMemo(
    () => getWhatWeDoBullets(club.description || '', club.tagline),
    [club.description, club.tagline]
  )

  const personalizationTitle = PERSONALIZATION_TITLE_BY_CATEGORY[category]

  const heroGradientOverlay = `linear-gradient(to right, ${tintHex}40 0%, ${tintHex}20 40%, transparent 70%)`

  return (
    <div className="pt-20 pb-24 md:pb-16 min-h-screen bg-brand-deep">
      {/* Hero: compact, max 45vh, split left text / right image */}
      <section
        className="relative max-h-[45vh] min-h-[240px] flex flex-col md:flex-row"
        style={{
          background: `linear-gradient(135deg, rgba(${tintRgb.r},${tintRgb.g},${tintRgb.b},0.12) 0%, rgba(11,16,32,0.98) 50%)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: heroGradientOverlay }}
          aria-hidden
        />
        <Container className="relative flex-1 flex flex-col md:flex-row md:items-center gap-6 py-6 md:py-8">
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <Link
              href="/clubs"
              className="inline-flex items-center text-white/70 hover:text-white text-sm font-medium mb-4 transition-colors w-fit"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Clubs
            </Link>
            <h1 className={cn('font-bold text-white mb-2', layout.titleSize)}>
              {club.name}
            </h1>
            {taglineOneSentence && (
              <p className="text-white/85 text-sm md:text-base line-clamp-2 mb-4 max-w-xl">
                {taglineOneSentence}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {club.yearGroup && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/10 text-white/90 text-xs font-medium border border-white/10">
                  {club.yearGroup}
                </span>
              )}
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-white/85 text-xs border"
                style={{ borderColor: `${tintHex}50` }}
              >
                {clubType}
              </span>
              {club.accepting && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/25 text-emerald-400 border border-emerald-500/40">
                  Now Accepting Members
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-[45%] max-w-md flex items-center justify-center">
            {mainImage ? (
              <motion.div
                className="relative w-full aspect-video max-h-[180px] md:max-h-[200px] rounded-xl overflow-hidden border border-white/15 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={mainImage}
                  alt={club.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </motion.div>
            ) : (
              <div className="w-full aspect-video max-h-[180px] md:max-h-[200px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-sm">
                No image
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Compact image strip below hero — 4–6 thumbnails, click → lightbox */}
      {galleryImages.length > 1 && (
        <Container className="mt-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {galleryImages.slice(0, 8).map((src, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setLightboxSrc(src)}
                className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 border-white/15 hover:border-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-deep"
                style={{
                  boxShadow: 'none',
                  ['--tw-ring-color' as string]: tintHex,
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${tintHex}40` }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </motion.button>
            ))}
          </div>
        </Container>
      )}

      <ImageLightbox
        src={lightboxSrc || ''}
        alt={club.name}
        open={!!lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />

      <Container className="mt-8 md:mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Short description — max 2 lines, Read more if long */}
            {club.description && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-bold text-white mb-2">About</h2>
                <p className="text-white/75 text-sm leading-relaxed line-clamp-2 whitespace-pre-line">
                  {descriptionToShow}
                </p>
                {isLongDescription && (
                  <button
                    type="button"
                    onClick={() => setDescriptionExpanded((e) => !e)}
                    className="mt-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {descriptionExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </motion.section>
            )}

            {/* Personalization section — one per club type */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3 }}
              className={cn('rounded-xl p-5 border', layout.cardRounding)}
              style={{
                backgroundColor: `${tintHex}12`,
                borderColor: `${tintHex}30`,
              }}
            >
              <h2 className="text-lg font-bold text-white mb-3">{personalizationTitle}</h2>
              {whatWeDo.length > 0 ? (
                <ul className="space-y-2">
                  {whatWeDo.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/85 text-sm">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: tintHex }}
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/70 text-sm">Learn more at your first meeting.</p>
              )}
            </motion.section>

            {club.roles.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-bold text-white mb-2">Available roles</h2>
                <div className="flex flex-wrap gap-2">
                  {club.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-white/90 text-sm border"
                      style={{ borderColor: `${tintHex}40`, backgroundColor: `${tintHex}15` }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {club.specialConditions && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3 }}
                className="rounded-xl p-5 border border-amber-500/20 bg-amber-500/5"
              >
                <h3 className="text-white font-semibold mb-2">Special notice</h3>
                <p className="text-white/75 text-sm whitespace-pre-line leading-relaxed">
                  {club.specialConditions}
                </p>
              </motion.section>
            )}
          </div>

          {/* Right: stat-style meeting cards + How to join */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3 }}
              className="lg:sticky lg:top-24 space-y-6"
            >
              {/* Stat-style cards — 2×2 grid, glassmorphism, accent, hover lift */}
              <div className="grid grid-cols-2 gap-3">
                {club.meetingDay && (
                  <StatCard
                    label="Day"
                    value={club.meetingDay}
                    icon={MEETING_ICONS.day}
                    tintHex={tintHex}
                  />
                )}
                {club.meetingTime && (
                  <StatCard
                    label="Time"
                    value={club.meetingTime}
                    icon={MEETING_ICONS.time}
                    tintHex={tintHex}
                  />
                )}
                {club.location && (
                  <StatCard
                    label="Location"
                    value={club.location}
                    icon={MEETING_ICONS.location}
                    tintHex={tintHex}
                  />
                )}
                {club.yearGroup && (
                  <StatCard
                    label="Year group"
                    value={club.yearGroup}
                    icon={MEETING_ICONS.year}
                    tintHex={tintHex}
                  />
                )}
              </div>

              {/* How to join */}
              <div
                className={cn('rounded-xl p-5 border border-white/10 bg-white/[0.04]', layout.cardRounding)}
              >
                <h3 className="text-lg font-bold text-white mb-4">How to join</h3>
                {club.accepting ? (
                  <>
                    <p className="text-white/70 text-sm mb-4">
                      Click Join to apply.
                    </p>
                    <JoinButton href={`/join/${club.id}`} tintHex={tintHex} />
                  </>
                ) : (
                  <p className="text-white/60 text-sm">
                    Not currently accepting. Check back later or contact the club.
                  </p>
                )}
                <div className="mt-5 pt-5 border-t border-white/10">
                  <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-2">Contact</h4>
                  {club.leaders.length > 0 && (
                    <div className="mb-2">
                      {club.leaders.map((leader, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                            style={{ backgroundColor: `${tintHex}50` }}
                          >
                            {leader.name[0]}
                          </span>
                          {leader.name}
                          {leader.year && ` (${leader.year})`}
                        </div>
                      ))}
                    </div>
                  )}
                  {club.teachers.length > 0 && (
                    <div className="mb-2 text-white/80 text-sm">
                      {club.teachers.map((t, i) => <div key={i}>{t.name}</div>)}
                    </div>
                  )}
                  {club.contact && (
                    <p className="text-white/75 text-sm whitespace-pre-line">{club.contact}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Mobile sticky join bar */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 lg:hidden',
          'bg-brand-deep/95 backdrop-blur-xl border-t border-white/10 p-4 safe-area-inset-bottom'
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">{club.name}</p>
            <p className="text-white/60 text-sm">
              {club.accepting ? 'Open for registration' : 'Not accepting'}
            </p>
          </div>
          {club.accepting ? (
            <Button href={`/join/${club.id}`} size="lg" style={{ backgroundColor: tintHex, color: '#fff' }}>
              Join
            </Button>
          ) : (
            <Button disabled size="lg">Closed</Button>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
  tintHex,
}: {
  label: string
  value: string
  icon: React.ReactNode
  tintHex: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      className={cn(
        'rounded-xl border p-4 bg-white/[0.04] backdrop-blur-sm transition-shadow',
        'border-white/10'
      )}
      style={{
        borderLeftWidth: 3,
        borderLeftColor: hovered ? tintHex : 'rgba(255,255,255,0.1)',
        boxShadow: hovered ? `0 8px 24px ${tintHex}20` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
        style={{ backgroundColor: `${tintHex}20` }}
      >
        <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <p className="text-white/50 text-[10px] uppercase tracking-wide font-medium">{label}</p>
      <p className="text-white font-bold text-base mt-0.5 whitespace-pre-line leading-snug">{value}</p>
    </motion.div>
  )
}

function JoinButton({ href, tintHex }: { href: string; tintHex: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white transition-all min-h-[44px] overflow-hidden"
      style={{
        backgroundColor: tintHex,
        boxShadow: hovered ? `0 0 24px ${tintHex}50` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Join club
      <span className="inline-block" aria-hidden>→</span>
    </Link>
  )
}
