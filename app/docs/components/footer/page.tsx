import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { ExternalLink } from 'lucide-react'

const usageCode = `import { Footer } from '@/components/marketing/footer'

<Footer
  brand="MarketMaker.cc"
  tagline="AI-powered algorithmic trading for everyone."
  columns={[
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Roadmap', href: '#roadmap' },
        { label: 'Whitepaper', href: '/whitepaper' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'GitHub', href: 'https://github.com/suenot' },
        { label: 'Twitter', href: 'https://twitter.com/suenot' },
        { label: 'Telegram', href: 'https://t.me/marketmakercc' },
      ],
    },
  ]}
  copyright="© 2025 MarketMaker.cc. All rights reserved."
/>`

export default function FooterPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Marketing</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Footer</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Multi-column site footer with brand name, tagline, navigation columns, and copyright line.
      </p>

      <a
        href="/storybook/?path=/story/marketing-footer--default"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-accent/30 bg-accent/5 text-accent-darker text-sm font-bold hover:bg-accent/10 transition-colors mb-8"
      >
        <ExternalLink size={14} />
        Open in Storybook
      </a>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Usage</h2>
      <CodeBlock code={usageCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'brand', type: 'string', required: true, description: 'Brand name' },
        { name: 'tagline', type: 'string', description: 'Short description below brand' },
        { name: 'columns', type: 'FooterColumn[]', defaultValue: '[]', description: 'Navigation columns ({ title, links }[])' },
        { name: 'copyright', type: 'string', description: 'Copyright line at the bottom' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
