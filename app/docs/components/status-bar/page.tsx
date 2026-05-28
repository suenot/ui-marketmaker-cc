'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { StatusBar } from '@/components/status/status-bar'
import type { ServerStatsData } from '@/components/status/server-stats'

const sampleStats: ServerStatsData = {
  cpu_count: 8,
  load_avg: [1.36, 1.04, 0.88],
  load_percent: [17, 13, 11],
  uptime_seconds: 91 * 86400,
  ram: { total: 32 * 1024 ** 3, used: 3.84 * 1024 ** 3, available: 28.16 * 1024 ** 3, percent: 12 },
  disk: { total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
  network: { bytes_sent: 0, bytes_recv: 0, send_bps: 12 * 1024, recv_bps: 48 * 1024, percent: 0, max_mbits: 1000 },
}

const previewCode = `import { StatusBar } from '@/components/status/status-bar'

// Drop once near the root of your app — it pins itself to the bottom.
export default function Example({ stats, connected }) {
  return (
    <StatusBar
      timezone={{ onChange: (tz) => console.log(tz) }}
      hide={{ onChange: (h) => console.log('investor:', h) }}
      stats={stats}
      connected={connected}
    />
  )
}`

const sourceCode = `'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { TimezoneToggle, type TimezoneToggleProps } from './timezone-toggle'
import { HideToggle, type HideToggleProps } from './hide-toggle'
import { ServerStats, type ServerStatsData } from './server-stats'
import { ConnectionIndicator } from './connection-indicator'

export interface StatusBarProps {
  timezone?: boolean | TimezoneToggleProps
  hide?: boolean | HideToggleProps
  stats?: ServerStatsData | null
  connected?: boolean | null
  fixed?: boolean   // default true: pin to bottom of viewport
  className?: string
}

// Floating bottom bar: timezone + investor toggles bottom-left,
// server-health pill bottom-center, connection dot bottom-right.
// Every piece is optional and individually usable.`

export default function StatusBarPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Status Bar</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Status Bar</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Convenience composition of the four status badges: the timezone and investor toggles bottom-left, the
        server-health pill bottom-center, and the connection dot bottom-right — the layout from the trading dashboards.
        Drop it once near the root of your app. The preview below uses <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">fixed=false</code> to render inline.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <ComponentPreview code={previewCode} storyId="status-status-bar--inline">
        <StatusBar
          fixed={false}
          timezone={{ storageKey: null }}
          hide={{ storageKey: null }}
          stats={sampleStats}
          connected={true}
        />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/status/status-bar.tsx</code> (also copy the four badge components it imports).</p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'timezone', type: 'boolean | TimezoneToggleProps', defaultValue: 'true', description: 'Show/configure the timezone toggle' },
        { name: 'hide', type: 'boolean | HideToggleProps', defaultValue: 'true', description: 'Show/configure the investor toggle' },
        { name: 'stats', type: 'ServerStatsData | null', description: 'Server metrics for the centered pill. Omit to hide.' },
        { name: 'connected', type: 'boolean | null', description: 'Connection state for the right dot. Omit to hide.' },
        { name: 'fixed', type: 'boolean', defaultValue: 'true', description: 'Pin to the bottom of the viewport' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
