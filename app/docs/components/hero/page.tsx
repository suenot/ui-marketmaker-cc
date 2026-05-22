import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { ExternalLink } from 'lucide-react'

const usageCode = `import { Hero } from '@/components/marketing/hero'

export default function Page() {
  return (
    <Hero
      badge="AI & Fintech"
      title="AI Trading."
      highlightedTitle="A New Level"
      subtitle="Next-generation AI-powered algorithmic trading platform."
      primaryCta={{ label: 'Read Whitepaper', href: '/whitepaper' }}
      secondaryCta={{ label: 'Invest', href: '#investment' }}
    />
  )
}`

export default function HeroPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Marketing</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Hero</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Full-screen hero section with animated floating shapes, gradient headline, badge, subtitle, and CTA buttons.
        Dark-first with radial gradient background.
      </p>

      <a
        href="/storybook/?path=/story/marketing-hero--default"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-accent/30 bg-accent/5 text-accent-darker text-sm font-bold hover:bg-accent/10 transition-colors mb-8"
      >
        <ExternalLink size={14} />
        Open in Storybook
      </a>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Usage</h2>
      <CodeBlock code={usageCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'badge', type: 'string', description: 'Small pill label above the title' },
        { name: 'title', type: 'string', required: true, description: 'Main headline text (gradient from-foreground)' },
        { name: 'highlightedTitle', type: 'string', description: 'Second line with accent gradient' },
        { name: 'subtitle', type: 'string', required: true, description: 'Supporting paragraph text' },
        { name: 'primaryCta', type: '{ label: string; href: string }', description: 'Primary CTA button' },
        { name: 'secondaryCta', type: '{ label: string; href: string }', description: 'Secondary CTA button' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
