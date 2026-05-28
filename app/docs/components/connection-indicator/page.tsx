'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { ConnectionIndicator } from '@/components/status/connection-indicator'

const previewCode = `import { useEffect, useState } from 'react'
import { ConnectionIndicator } from '@/components/status/connection-indicator'

export default function Example() {
  const [connected, setConnected] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () =>
      fetch('/api/health').then((r) => setConnected(r.ok)).catch(() => setConnected(false))
    check()
    const id = setInterval(check, 5_000)
    return () => clearInterval(id)
  }, [])

  return <ConnectionIndicator connected={connected} onlineLabel="Connected" />
}`

const sourceCode = `'use client'

import * as React from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ConnectionIndicatorProps {
  connected?: boolean | null
  onlineLabel?: string
  offlineLabel?: string
  className?: string
}

// Tiny round dot: green wifi when connected, red when offline.
// Renders nothing while connected is null (before first check).`

export default function ConnectionIndicatorPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Status Bar</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Connection Indicator</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Tiny round status dot — green wifi when connected, red when offline. Drive
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">connected</code> from your own health-check loop;
        it renders nothing until the first result.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="status-connection-indicator--online">
        <div className="flex items-center gap-4">
          <ConnectionIndicator connected={true} onlineLabel="Connected" />
          <ConnectionIndicator connected={false} offlineLabel="Offline" />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/status/connection-indicator.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'connected', type: 'boolean | null', description: 'Connection state. null renders nothing.' },
        { name: 'onlineLabel', type: 'string', defaultValue: "'Connected'", description: 'Tooltip when connected' },
        { name: 'offlineLabel', type: 'string', defaultValue: "'Offline'", description: 'Tooltip when disconnected' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
