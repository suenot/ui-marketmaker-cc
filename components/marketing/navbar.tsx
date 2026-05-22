'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  brand: string
  links?: NavLink[]
  cta?: { label: string; href: string }
  className?: string
}

export function Navbar({ brand, links = [], cta, className }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-3 bg-background/70 backdrop-blur-xl border-b border-border shadow-soft'
          : 'py-5 bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hover:scale-105 transition-transform">
          {brand}
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/40 active:scale-95"
            >
              {cta.label}
            </Link>
          )}
        </div>

        <button
          className="lg:hidden p-2 rounded-xl hover:bg-accent/10 transition-colors text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-t border-border p-6 flex flex-col gap-4 shadow-2xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-full text-center py-4 text-xl font-black uppercase tracking-widest border-b border-border/50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              className="w-full py-4 rounded-2xl text-center bg-accent text-white font-black uppercase tracking-widest shadow-xl"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
