import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/marketing/section-header'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { SectionHeader } from '@/components/marketing/section-header'

<SectionHeader
  badge="Platform"
  title="Platform Features"
  subtitle="Everything you need for algorithmic trading, in one place."
/>`

export default function SectionHeaderPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Marketing</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Section Header</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Consistent section title component with optional badge, gradient heading, and subtitle. Center or left-aligned.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="marketing-sectionheader--default">
        <SectionHeader
          badge="Platform"
          title="Platform Features"
          subtitle="Everything you need for algorithmic trading."
          className="mb-0"
        />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'title', type: 'string', required: true, description: 'Main heading text' },
        { name: 'badge', type: 'string', description: 'Pill badge above the title' },
        { name: 'subtitle', type: 'string', description: 'Supporting paragraph below the title' },
        { name: 'align', type: "'center' | 'left'", defaultValue: "'center'", description: 'Text alignment' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
