'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const nav = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'Base UI',
    items: [
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Badge', href: '/docs/components/badge' },
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Input', href: '/docs/components/input' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { title: 'Hero', href: '/docs/components/hero' },
      { title: 'Navbar', href: '/docs/components/navbar' },
      { title: 'Feature Card', href: '/docs/components/feature-card' },
      { title: 'Team Card', href: '/docs/components/team-card' },
      { title: 'Section Header', href: '/docs/components/section-header' },
      { title: 'Footer', href: '/docs/components/footer' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-4 py-8">
        {nav.map((section) => (
          <div key={section.title} className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 px-3">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-xl text-sm transition-all duration-200',
                      pathname === item.href
                        ? 'bg-accent/10 text-accent-darker font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
