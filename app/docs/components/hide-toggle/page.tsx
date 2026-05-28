'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { HideToggle } from '@/components/status/hide-toggle'

const previewCode = `import { HideToggle } from '@/components/status/hide-toggle'

export default function Example() {
  return (
    <HideToggle onChange={(hidden) => console.log('anonymous mode:', hidden)} />
  )
}`

const categoriesCode = `import { HideToggle } from '@/components/status/hide-toggle'

export default function Example() {
  return (
    <HideToggle
      categories={[
        { key: 'exchanges', label: 'Exchanges' },
        { key: 'coins', label: 'Coins' },
        { key: 'volumes', label: 'Trade volumes' },
      ]}
      onCategoriesChange={(keys) => console.log('hidden:', keys)}
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HideCategory {
  key: string            // reported back through onChange, e.g. "exchanges"
  label: string          // shown in the hover menu, e.g. "Exchanges"
  defaultHidden?: boolean
}

export interface HideToggleProps {
  // Simple mode
  hidden?: boolean
  defaultHidden?: boolean
  onChange?: (hidden: boolean) => void
  // Category mode (pass \`categories\`)
  categories?: HideCategory[]
  hiddenKeys?: string[]
  onCategoriesChange?: (hiddenKeys: string[]) => void
  storageKey?: string | null
  className?: string
}

// "Investor / anonymous mode" pill. Simple form flips SHOW <-> HIDE.
// Pass \`categories\` to make it granular: the pill toggles everything,
// hovering reveals a per-item menu (exchanges, coins, volumes, ...).
// Persists to localStorage when uncontrolled (storageKey).`

export default function HideTogglePage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Status Bar</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Hide Toggle</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        "Investor / anonymous mode" pill that flips between <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">SHOW</code> and
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">HIDE</code> to mask sensitive labels when sharing your screen.
        Pass a <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">categories</code> array to make it granular — the pill still
        toggles everything, but hovering reveals a menu to hide each category independently.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="status-hide-toggle--show">
        <HideToggle storageKey={null} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Custom categories</h2>
      <p className="text-muted-foreground font-light mb-4">
        Hover the pill to choose what to hide. The master click toggles all at once; the label shows
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">HIDE n/N</code> when only some are hidden.
        Categories are fully custom — pass whatever keys your app understands.
      </p>
      <ComponentPreview code={categoriesCode} storyId="status-hide-toggle--categories" previewClassName="min-h-[260px] items-end pb-14">
        <HideToggle
          storageKey={null}
          categories={[
            { key: 'exchanges', label: 'Exchanges' },
            { key: 'coins', label: 'Coins' },
            { key: 'volumes', label: 'Trade volumes' },
          ]}
        />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/status/hide-toggle.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'hidden', type: 'boolean', description: 'Simple mode: controlled state. Omit for self-managed state.' },
        { name: 'defaultHidden', type: 'boolean', defaultValue: 'false', description: 'Simple mode: initial state when uncontrolled' },
        { name: 'onChange', type: '(hidden: boolean) => void', description: 'Master hidden state (true when anything is hidden)' },
        { name: 'categories', type: 'HideCategory[]', description: 'Hideable items: { key, label, defaultHidden? }. Enables the hover menu.' },
        { name: 'hiddenKeys', type: 'string[]', description: 'Category mode: controlled set of hidden keys' },
        { name: 'onCategoriesChange', type: '(hiddenKeys: string[]) => void', description: 'Category mode: full set of hidden keys' },
        { name: 'storageKey', type: 'string | null', defaultValue: "'hide_mode'", description: 'localStorage key; null disables persistence' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
