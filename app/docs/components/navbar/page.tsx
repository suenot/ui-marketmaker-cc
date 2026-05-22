import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'

const usageCode = `import { Navbar } from '@/components/marketing/navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar
        brand="MarketMaker"
        links={[
          { label: 'Blog', href: '/blog' },
          { label: 'Roadmap', href: '#roadmap' },
          { label: 'Token', href: '#token' },
        ]}
        cta={{ label: 'Sign In', href: '/login' }}
      />
      {children}
    </>
  )
}`

export default function NavbarPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Marketing</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Navbar</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Sticky navigation bar with scroll-aware background blur, desktop nav links, CTA button, and responsive mobile hamburger menu.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Usage</h2>
      <CodeBlock code={usageCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'brand', type: 'string', required: true, description: 'Brand name displayed on the left' },
        { name: 'links', type: 'NavLink[]', defaultValue: '[]', description: 'Navigation links ({ label, href }[])' },
        { name: 'cta', type: '{ label: string; href: string }', description: 'CTA button on the right' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
