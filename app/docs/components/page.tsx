import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const components = [
  { title: 'Button', href: '/docs/components/button', category: 'Base UI', description: 'Primary interaction element with multiple variants.' },
  { title: 'Badge', href: '/docs/components/badge', category: 'Base UI', description: 'Small label for status, tags, or categories.' },
  { title: 'Card', href: '/docs/components/card', category: 'Base UI', description: 'Glassmorphism container with header, content, and footer.' },
  { title: 'Input', href: '/docs/components/input', category: 'Base UI', description: 'Styled text input for forms and search.' },
  { title: 'Hero', href: '/docs/components/hero', category: 'Marketing', description: 'Full-screen hero section with animated shapes.' },
  { title: 'Navbar', href: '/docs/components/navbar', category: 'Marketing', description: 'Sticky navigation with scroll effect and mobile menu.' },
  { title: 'Feature Card', href: '/docs/components/feature-card', category: 'Marketing', description: 'Animated feature highlight card with icon.' },
  { title: 'Team Card', href: '/docs/components/team-card', category: 'Marketing', description: 'Team member card with avatar and role.' },
  { title: 'Section Header', href: '/docs/components/section-header', category: 'Marketing', description: 'Consistent section title with badge and subtitle.' },
  { title: 'Footer', href: '/docs/components/footer', category: 'Marketing', description: 'Multi-column footer with links and copyright.' },
]

export default function ComponentsPage() {
  return (
    <div className="max-w-4xl">
      <Badge className="mb-4">Reference</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Components</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
        All components are copy-paste ready. Click any component to see usage examples, props, and source code.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((c) => (
          <Link key={c.href} href={c.href} className="group block">
            <Card className="h-full transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">{c.title}</CardTitle>
                  <Badge variant="muted" className="shrink-0 text-xs">{c.category}</Badge>
                </div>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
