import { Badge } from '@/components/ui/badge'
import { TeamCard } from '@/components/marketing/team-card'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'

const previewCode = `import { TeamCard } from '@/components/marketing/team-card'

<TeamCard
  name="@suenot"
  role="CEO"
  specialization="Fullstack · DevOps · AI Engineer"
/>`

export default function TeamCardPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Marketing</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Team Card</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Team member card with avatar (or generated initials), name, role, and specialization. Hover glow effect.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="marketing-teamcard--default">
        <TeamCard name="@suenot" role="CEO" specialization="Fullstack · DevOps · AI" />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'name', type: 'string', required: true, description: 'Display name (e.g. "@suenot")' },
        { name: 'role', type: 'string', required: true, description: 'Job title or role' },
        { name: 'specialization', type: 'string', description: 'Secondary line with skills' },
        { name: 'avatar', type: 'string', description: 'Image URL; initials shown if omitted' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
