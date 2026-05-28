'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { TimezoneToggle } from '@/components/status/timezone-toggle'

const previewCode = `import { TimezoneToggle } from '@/components/status/timezone-toggle'

export default function Example() {
  return (
    <TimezoneToggle
      defaultValue="utc"
      onChange={(tz) => console.log('timezone:', tz)}
    />
  )
}`

const hoverCode = `import { TimezoneToggle } from '@/components/status/timezone-toggle'

export default function Example() {
  // Hover the pill to open the full offset picker (no right-click needed).
  return <TimezoneToggle expandOnHover onChange={(tz) => console.log(tz)} />
}`

const sourceCode = `'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export const TZ_OPTIONS = [
  { value: 'utc', label: 'UTC', offset: 0 },
  { value: 'local', label: 'LOC', offset: null },
  { value: 'utc+3', label: '+3', offset: 3 },
  // ...more offsets
] as const

export type TZValue = (typeof TZ_OPTIONS)[number]['value']

export interface TimezoneToggleProps {
  value?: TZValue
  defaultValue?: TZValue
  onChange?: (tz: TZValue) => void
  expandOnHover?: boolean
  storageKey?: string | null
  className?: string
}

// Pill toggle. Left-click cycles UTC -> Local -> UTC+3.
// Right-click (or hover with expandOnHover) opens the full offset list.
// Persists to localStorage when uncontrolled (storageKey).`

export default function TimezoneTogglePage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Status Bar</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Timezone Toggle</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Compact timezone pill for a dashboard status bar. Left-click cycles
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">UTC → Local → UTC+3</code>; right-click opens a
        dropdown of all offsets. Set <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">expandOnHover</code> to open the full
        list on hover instead. Color-coded blue/purple/green and persisted to localStorage.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <p className="text-muted-foreground font-light mb-4">Left-click to cycle; right-click for the full list.</p>
      <ComponentPreview code={previewCode} storyId="status-timezone-toggle--default">
        <TimezoneToggle storageKey={null} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Expand on hover</h2>
      <p className="text-muted-foreground font-light mb-4">
        With <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">expandOnHover</code>, hovering the pill opens the full
        timezone picker — pick any of the available offsets. Left-click still cycles the common three.
      </p>
      <ComponentPreview code={hoverCode} storyId="status-timezone-toggle--expand-on-hover" previewClassName="min-h-[420px] items-end pb-14">
        <TimezoneToggle expandOnHover storageKey={null} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/status/timezone-toggle.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'value', type: 'TZValue', description: 'Controlled value. Omit for self-managed state.' },
        { name: 'defaultValue', type: 'TZValue', defaultValue: "'utc'", description: 'Initial value when uncontrolled' },
        { name: 'onChange', type: '(tz: TZValue) => void', description: 'Fired whenever the timezone changes' },
        { name: 'expandOnHover', type: 'boolean', defaultValue: 'false', description: 'Open the full timezone picker on hover' },
        { name: 'storageKey', type: 'string | null', defaultValue: "'tz'", description: 'localStorage key; null disables persistence' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
