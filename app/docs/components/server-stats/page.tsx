'use client'

import { Badge } from '@/components/ui/badge'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { ServerStats, type ServerStatsData } from '@/components/status/server-stats'

const sampleStats: ServerStatsData = {
  cpu_count: 8,
  load_avg: [1.36, 1.04, 0.88],
  load_percent: [17, 13, 11],
  uptime_seconds: 91 * 86400,
  ram: { total: 32 * 1024 ** 3, used: 3.84 * 1024 ** 3, available: 28.16 * 1024 ** 3, percent: 12 },
  disk: { total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
  network: { bytes_sent: 0, bytes_recv: 0, send_bps: 12 * 1024, recv_bps: 48 * 1024, percent: 0, max_mbits: 1000 },
}

const busyStats: ServerStatsData = {
  ...sampleStats,
  load_avg: [7.2, 6.8, 5.1],
  load_percent: [90, 85, 64],
  ram: { ...sampleStats.ram, used: 27 * 1024 ** 3, percent: 84 },
  network: { ...sampleStats.network, send_bps: 80 * 1024 ** 2, recv_bps: 120 * 1024 ** 2, percent: 65 },
}

const multiDiskStats: ServerStatsData = {
  ...sampleStats,
  disk: { name: '/', total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
  disks: [
    { name: '/', total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
    { name: '/data', total: 4 * 1024 ** 4, used: 1.6 * 1024 ** 4, free: 2.4 * 1024 ** 4, percent: 40 },
    { name: '/backup', total: 8 * 1024 ** 4, used: 5.2 * 1024 ** 4, free: 2.8 * 1024 ** 4, percent: 65 },
  ],
}

const diskCode = `import { ServerStats } from '@/components/status/server-stats'

// The first entry in \`disks\` is the primary (system) disk.
export default function Example({ stats }) {
  return (
    <ServerStats
      stats={{
        ...stats,
        disks: [
          { name: '/', total: 500e9, used: 475e9, free: 25e9, percent: 95 },
          { name: '/data', total: 4e12, used: 1.6e12, free: 2.4e12, percent: 40 },
        ],
      }}
    />
  )
}`

const multiCode = `import { ServerStats } from '@/components/status/server-stats'

export default function Example({ webStats, dbStats }) {
  return (
    <ServerStats
      servers={[
        { label: 'web-1', stats: webStats },
        { label: 'db-1', stats: dbStats },
      ]}
    />
  )
}`

const previewCode = `import { useEffect, useState } from 'react'
import { ServerStats, type ServerStatsData } from '@/components/status/server-stats'

export default function Example() {
  const [stats, setStats] = useState<ServerStatsData | null>(null)

  useEffect(() => {
    const load = () =>
      fetch('/api/server-stats').then((r) => r.json()).then(setStats).catch(() => {})
    load()
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [])

  return <ServerStats stats={stats} />
}`

const sourceCode = `'use client'

import * as React from 'react'
import { Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DiskStats {
  name?: string            // mount/label, e.g. "/", "/data", "C:"
  total: number; used: number; free: number; percent: number
}

export interface ServerStatsData {
  cpu_count: number
  load_avg: number[]        // [1m, 5m, 15m]
  load_percent: number[]    // [1m, 5m, 15m] as % of capacity
  uptime_seconds: number
  ram: { total: number; used: number; available: number; percent: number }
  disk: DiskStats           // primary disk (single-disk case)
  disks?: DiskStats[]       // all disks; first = primary (wins over disk)
  network: { bytes_sent: number; bytes_recv: number; send_bps: number; recv_bps: number; percent: number; max_mbits: number }
}

export interface ServerStatsItem {
  label?: string
  stats: ServerStatsData
}

export interface ServerStatsProps {
  stats?: ServerStatsData | null   // single server
  servers?: ServerStatsItem[]      // 2+ servers (wins over stats)
  copyable?: boolean               // tooltip "Copy" button (default true)
  className?: string
}

// Compact health pill(s): Load / RAM / HDD / Net / Up, color-coded
// green < 50% < amber < 80% < red, with a full-detail hover tooltip.
// The tooltip has a Copy button that dumps every metric as text.
// Presentational: feed it stats from your own polling loop.`

export default function ServerStatsPage() {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4">Status Bar</Badge>
      <h1 className="text-4xl font-black tracking-tight mb-4">Server Stats</h1>
      <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
        Compact server-health pill — <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">Load / RAM / HDD / Net / Up</code> —
        color-coded green/amber/red, with a full-detail tooltip on hover. The tooltip carries a <strong>Copy</strong> button
        that puts every metric on the clipboard, and you can pass a <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">servers</code> array
        for <strong>2+ machines</strong> — the pill shows one server at a time and its name becomes a switcher.
        For machines with several drives, pass a <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">disks</code> array (first = primary).
        Presentational: feed it data from your own polling loop.
      </p>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Preview</h2>
      <p className="text-muted-foreground font-light mb-4">Hover the pill to see the detailed breakdown and the Copy button.</p>
      <ComponentPreview code={previewCode} storyId="status-server-stats--default" previewClassName="min-h-[340px] items-end pb-14">
        <ServerStats stats={sampleStats} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Multiple servers</h2>
      <p className="text-muted-foreground font-light mb-4">
        Pass a <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">servers</code> array of <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">{'{ label, stats }'}</code> entries.
        The pill shows one server at a time — click the server name (with the ⟷ icon) to switch to the next machine.
        Copy still grabs every server at once. With a single server, no name is shown.
      </p>
      <ComponentPreview code={multiCode} storyId="status-server-stats--multiple-servers" previewClassName="min-h-[340px] items-end pb-14">
        <ServerStats
          servers={[
            { label: 'web-1', stats: sampleStats },
            { label: 'web-2', stats: busyStats },
          ]}
        />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Multiple disks</h2>
      <p className="text-muted-foreground font-light mb-4">
        Pass a <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">disks</code> array — the <strong>first entry is the primary</strong> (system) disk.
        The pill shows the primary's usage with a <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">·N</code> badge for the disk count;
        hover to see every disk broken out by name. The single <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">disk</code> field still works for one-disk machines.
      </p>
      <ComponentPreview code={diskCode} storyId="status-server-stats--multiple-disks" previewClassName="min-h-[360px] items-end pb-14">
        <ServerStats stats={multiDiskStats} />
      </ComponentPreview>

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Source</h2>
      <p className="text-muted-foreground font-light mb-4">Copy this file to <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">components/status/server-stats.tsx</code></p>
      <CodeBlock code={sourceCode} language="tsx" />

      <h2 className="text-xl font-black tracking-tight mb-4 mt-10">Props</h2>
      <PropsTable props={[
        { name: 'stats', type: 'ServerStatsData | null', description: 'Single server (convenience). Renders nothing when null/undefined.' },
        { name: 'servers', type: 'ServerStatsItem[]', description: 'Multiple servers: { label?, stats }[]. Takes precedence over stats.' },
        { name: 'copyable', type: 'boolean', defaultValue: 'true', description: 'Show the "copy all metrics" button in the tooltip' },
        { name: 'className', type: 'string', description: 'Additional CSS classes' },
      ]} />
    </div>
  )
}
