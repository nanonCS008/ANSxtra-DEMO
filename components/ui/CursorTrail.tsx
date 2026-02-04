'use client'

import { useEffect, useRef, useState } from 'react'

interface TrailPoint {
  id: number
  x: number
  y: number
}

const TRAIL_LENGTH = 8
const THROTTLE_MS = 50
const DOT_SIZE = 6

export function CursorTrail() {
  const [points, setPoints] = useState<TrailPoint[]>([])
  const [visible, setVisible] = useState(false)
  const idRef = useRef(0)
  const lastAddRef = useRef(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(hover: none)').matches === false
    if (!isDesktop) return

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const now = Date.now()
        if (now - lastAddRef.current < THROTTLE_MS) return
        lastAddRef.current = now

        setVisible(true)
        setPoints((prev) => {
          const next = [...prev, { id: idRef.current++, x: e.clientX, y: e.clientY }]
          return next.slice(-TRAIL_LENGTH)
        })
      })
    }

    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (points.length === 0) return
    const idToRemove = points[0].id
    const timer = setTimeout(() => {
      setPoints((prev) => prev.filter((p) => p.id !== idToRemove))
    }, 350)
    return () => clearTimeout(timer)
  }, [points])

  if (!visible || points.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {points.map((point, i) => (
        <div
          key={point.id}
          className="absolute rounded-full animate-cursor-trail-fade"
          style={{
            left: point.x,
            top: point.y,
            width: DOT_SIZE,
            height: DOT_SIZE,
            marginLeft: -DOT_SIZE / 2,
            marginTop: -DOT_SIZE / 2,
            background: `radial-gradient(circle, rgba(217,70,239,0.4) 0%, rgba(124,58,237,0.2) 50%, transparent 70%)`,
            opacity: 0.45 - (i / points.length) * 0.4,
          }}
        />
      ))}
    </div>
  )
}
