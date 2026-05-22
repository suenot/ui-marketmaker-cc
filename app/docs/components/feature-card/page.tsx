import { Badge } from '@/components/ui/badge'
import { FeatureCard } from '@/components/marketing/feature-card'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { Bot } from 'lucide-react'

const previewCode = `import { FeatureCard } from '@/components/marketing/feature-card'
import { Bot } from 'lucide-react'

<FeatureCard
  icon={<Bot size={48} />}
  title="AI Strategy Builder"
  description="Create, backtest, and deploy algorithmic trading strategies powered by AI."
/>`

export default function FeatureCardPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Marketing</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Feature Card</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Animated feature highlight card with glassmorphism styling, hover effects, icon, title, and description.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="marketing-featurecard--default">
        <div className="w-full max-w-xs">
          <FeatureCard
            icon={<Bot size={48} />}
            title="AI Strategy Builder"
            description="Create, backtest, and deploy algorithmic trading strategies powered by AI."
          />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'icon', type: 'ReactNode', required: true, description: 'Icon element (use lucide-react)' },
        { name: 'title', type: 'string', required: true, description: 'Card heading' },
        { name: 'description', type: 'string', required: true, description: 'Card body text' },
        { name: 'delay', type: 'number', defaultValue: '0', description: 'Animation delay in seconds for staggered grids' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
