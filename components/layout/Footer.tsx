'use client'

import Link from 'next/link'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="bg-brand-deep border-t border-white/10">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">
                ANS<span className="text-brand-pink">Xtra</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              The official extracurricular activities portal for Amnuaysilpa School.
              Discover clubs, join activities, and make the most of your school experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="text-white/60 hover:text-white text-sm transition-colors">
                  Browse Clubs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">School</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Amnuaysilpa School</li>
              <li>Bangkok, Thailand</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} ANSXtra. Amnuaysilpa School.
          </p>
          <p className="text-white/40 text-sm">
            Built for students, by students.
          </p>
        </div>
      </Container>
    </footer>
  )
}
