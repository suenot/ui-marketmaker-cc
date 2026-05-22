import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  brand: string
  tagline?: string
  columns?: FooterColumn[]
  copyright?: string
  className?: string
}

export function Footer({ brand, tagline, columns = [], copyright, className }: FooterProps) {
  return (
    <footer className={cn('border-t border-border bg-background py-16', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <p className="text-2xl font-black tracking-tight text-foreground mb-3">{brand}</p>
            {tagline && <p className="text-muted-foreground leading-relaxed font-light">{tagline}</p>}
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-black uppercase tracking-widest text-foreground mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm font-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {copyright && (
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground font-light text-center">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  )
}
