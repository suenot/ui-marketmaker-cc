'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { ConnectionIndicator } from '@/components/status/connection-indicator'

const previewCode = `import { useEffect, useState } from 'react'
import { ConnectionIndicator, type ConnectionStatus } from '@/components/status/connection-indicator'

export default function Example() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [ping, setPing] = useState<number | null>(null)

  useEffect(() => {
    const check = async () => {
      const t0 = performance.now()
      try {
        const r = await fetch('/api/health')
        const ms = Math.round(performance.now() - t0)
        setPing(ms)
        setStatus(!r.ok ? 'offline' : ms > 500 ? 'warning' : 'online')
      } catch {
        setStatus('offline')
      }
    }
    check()
    const id = setInterval(check, 5_000)
    return () => clearInterval(id)
  }, [])

  return (
    <ConnectionIndicator
      status={status}
      details={ping != null && <div>Ping: {ping} ms</div>}
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ConnectionStatus = 'online' | 'warning' | 'offline'

export interface ConnectionIndicatorProps {
  status?: ConnectionStatus | null   // takes precedence; null renders nothing
  connected?: boolean | null         // back-compat: true -> online, false -> offline
  onlineLabel?: string
  warningLabel?: string
  offlineLabel?: string
  details?: React.ReactNode          // optional hover-tooltip content
  className?: string
}

// Round status dot: green (online) / orange (warning) / red (offline).
// Pass \`details\` to reveal extra info (ping, last-update ms) on hover.`

export default function ConnectionIndicatorPage() {
  const sampleDetails = (
    <div className="space-y-0.5">
      <div><span className="text-gray-400">Ping: </span><span style={{ color: '#22c55e' }}>42 ms</span></div>
      <div><span className="text-gray-400">Updated: </span><span className="text-gray-300">320 ms ago</span></div>
    </div>
  )
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Status Bar</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Connection Indicator</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Round status dot — green (online), orange (warning / degraded), or red (offline). Drive it from your own
        health-check loop via <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">status</code> (or the legacy
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">connected</code> boolean). Pass
        <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">details</code> to reveal extra info on hover
        (e.g. ping, time since last update).
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <p className="text-muted-foreground font-light mb-4">Three states; hover the first to see the details tooltip.</p>
      <ComponentPreview code={previewCode} storyId="status-connection-indicator--online" previewClassName="min-h-[220px] items-end pb-16">
        <div className="flex items-center gap-4">
          <ConnectionIndicator status="online" onlineLabel="Connected" details={sampleDetails} />
          <ConnectionIndicator status="warning" warningLabel="Slow connection" />
          <ConnectionIndicator status="offline" offlineLabel="Offline" />
        </div>
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/status/connection-indicator.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'status', type: "'online' | 'warning' | 'offline' | null", description: 'Three-state status. Takes precedence; null renders nothing.' },
        { name: 'connected', type: 'boolean | null', description: 'Back-compat boolean: true → online, false → offline.' },
        { name: 'onlineLabel', type: 'string', defaultValue: "'Connected'", description: 'Tooltip when online' },
        { name: 'warningLabel', type: 'string', defaultValue: "'Degraded'", description: 'Tooltip when warning' },
        { name: 'offlineLabel', type: 'string', defaultValue: "'Offline'", description: 'Tooltip when offline' },
        { name: 'details', type: 'React.ReactNode', description: 'Optional rich content shown in a hover tooltip' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
