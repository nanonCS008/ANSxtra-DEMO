'use client'

import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, fullWidth, children, disabled, style, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:ring-offset-2 focus:ring-offset-brand-deep',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      // iOS tap target minimum
      'min-h-[44px]',
      // Variants
      variant === 'primary' && [
        'bg-gradient-to-r from-brand-pink to-brand-purple text-white',
        'hover:shadow-glow-sm hover:-translate-y-0.5',
        'active:translate-y-0',
      ],
      variant === 'secondary' && [
        'bg-white/[0.04] text-white border border-white/10 backdrop-blur-md',
        'hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5',
        'active:translate-y-0',
      ],
      variant === 'outline' && [
        'bg-white/[0.04] text-white border border-white/20 backdrop-blur-md',
        'hover:bg-white/[0.08] hover:border-brand-purple/30 hover:shadow-glow-sm hover:-translate-y-0.5',
        'active:translate-y-0',
      ],
      variant === 'ghost' && [
        'bg-transparent text-white/70',
        'hover:text-white hover:bg-white/5',
      ],
      // Sizes
      size === 'sm' && 'px-4 py-2 text-sm',
      size === 'md' && 'px-6 py-3 text-base',
      size === 'lg' && 'px-8 py-4 text-lg',
      // Full width
      fullWidth && 'w-full',
      className
    )

    if (href && !disabled) {
      return (
        <Link href={href} className={baseStyles} style={style}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={baseStyles} disabled={disabled} style={style} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
