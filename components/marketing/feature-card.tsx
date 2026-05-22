import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
  delay?: number
}

export function FeatureCard({ icon, title, description, className, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className={cn('group relative h-full', className)}
      style={{ '--fade-delay': `${delay}s` } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative h-full glass p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-xl flex flex-col transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5">
        <div className="text-5xl mb-8 p-4 inline-flex w-fit rounded-2xl bg-accent/5 transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-110 group-hover:rotate-3 shadow-inner text-accent">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight group-hover:text-accent transition-colors duration-500">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-lg font-light flex-grow">{description}</p>
        <div className="absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-accent/20 rounded-br-2xl group-hover:border-accent/40 transition-colors" />
      </div>
    </div>
  )
}
