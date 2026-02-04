import { CursorTrail } from '@/components/ui/CursorTrail'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ANSXtra - Amnuaysilpa Extracurriculars',
  description: 'Discover and join extracurricular clubs at Amnuaysilpa School. Browse clubs, learn about activities, and sign up instantly.',
  keywords: ['Amnuaysilpa', 'extracurricular', 'clubs', 'school activities', 'ANSXtra'],
  authors: [{ name: 'Amnuaysilpa School' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0B1020',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-brand-deep text-white min-h-screen flex flex-col">
        <CursorTrail />
        <Header />
        <main className="flex-1 bg-gradient-pattern">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
