'use client'

import { cn } from '@/lib/utils'

interface HeroProps {
  badge?: string
  title: string
  highlightedTitle?: string
  subtitle: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

export function Hero({ badge, title, highlightedTitle, subtitle, primaryCta, secondaryCta, className }: HeroProps) {
  return (
    <div className={cn('relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-background', className)}>
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute left-[-5%] top-[20%]">
          <div style={{ width: 600, height: 140 }} className="relative animate-[shape-float_12s_ease-in-out_infinite]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/[0.12] to-transparent border border-white/[0.08]" />
          </div>
        </div>
        <div className="absolute right-[0%] top-[75%]">
          <div style={{ width: 500, height: 120 }} className="relative animate-[shape-float_12s_ease-in-out_infinite_2s]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/[0.12] to-transparent border border-white/[0.08]" />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.05] border border-accent/[0.1] mb-10">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold text-accent-darker uppercase tracking-[0.2em]">{badge}</span>
            </div>
          )}

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-10 tracking-tight leading-[1.2] pb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">{title}</span>
            {highlightedTitle && (
              <>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-foreground/90 to-accent/80">{highlightedTitle}</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
            {subtitle}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="w-full sm:w-auto bg-accent text-accent-foreground px-10 py-4 rounded-2xl shadow-xl hover:bg-accent/90 transition-all duration-500 hover:shadow-accent/40 font-bold text-lg hover:-translate-y-1"
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="w-full sm:w-auto bg-card/50 border border-border text-foreground px-10 py-4 rounded-2xl shadow-xl hover:bg-muted transition-all duration-500 font-bold text-lg hover:-translate-y-1"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
