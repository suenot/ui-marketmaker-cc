'use client'

import * as React from 'react'
import { Activity, Check, ChevronsLeftRight, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DiskStats {
  /** Mount point or label, e.g. "/", "/data", "C:". Optional. */
  name?: string
  total: number
  used: number
  free: number
  percent: number
}

export interface ServerStatsData {
  cpu_count: number
  /** [1m, 5m, 15m] load averages. */
  load_avg: number[]
  /** [1m, 5m, 15m] load as a percentage of capacity. */
  load_percent: number[]
  uptime_seconds: number
  ram: { total: number; used: number; available: number; percent: number }
  /** Primary disk. Kept for the single-disk case. */
  disk: DiskStats
  /** All disks; the first entry is the primary. Overrides `disk` when present. */
  disks?: DiskStats[]
  network: {
    bytes_sent: number
    bytes_recv: number
    send_bps: number
    recv_bps: number
    percent: number
    max_mbits: number
  }
}

/** All disks for a server, first = primary. Falls back to the single `disk`. */
function getDisks(s: ServerStatsData): DiskStats[] {
  return s.disks && s.disks.length > 0 ? s.disks : [s.disk]
}

/** One server entry when rendering more than one machine. */
export interface ServerStatsItem {
  /** Short name shown on the pill and in copied text (e.g. "web-1"). */
  label?: string
  stats: ServerStatsData
}

export interface ServerStatsProps {
  /** Single server (convenience). Render nothing when undefined/null. */
  stats?: ServerStatsData | null
  /** Multiple servers — takes precedence over `stats` when non-empty. */
  servers?: ServerStatsItem[]
  /** Show the "copy all metrics" button in the tooltip. */
  copyable?: boolean
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  if (days > 0) return `${days}d ${hours}h`
  const mins = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${mins}m`
}

function formatUptimeShort(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  if (days > 0) return `${days}d`
  return `${Math.floor(seconds / 3600)}h`
}

function formatBytesPerSec(bps: number): string {
  if (bps === 0) return '0 B/s'
  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s']
  const i = Math.floor(Math.log(bps) / Math.log(1024))
  return `${(bps / Math.pow(1024, i)).toFixed(1)} ${units[Math.min(i, units.length - 1)]}`
}

function colorForPercent(pct: number): string {
  if (pct < 50) return '#22c55e'
  if (pct < 80) return '#f59e0b'
  return '#ef4444'
}

/** Plain-text dump of one server's metrics, for the clipboard. */
function statsToText(item: ServerStatsItem): string {
  const s = item.stats
  const disks = getDisks(s)
  const diskLines =
    disks.length === 1
      ? [`Disk: ${formatBytes(disks[0].used)} / ${formatBytes(disks[0].total)} (${disks[0].percent}%)`]
      : disks.map(
          (d, i) =>
            `Disk ${d.name ?? `#${i + 1}`}${i === 0 ? ' (primary)' : ''}: ${formatBytes(d.used)} / ${formatBytes(d.total)} (${d.percent}%)`,
        )
  const lines = [
    item.label ? `Server: ${item.label}` : null,
    `Load: ${s.load_avg[0].toFixed(2)} / ${s.load_avg[1].toFixed(2)} / ${s.load_avg[2].toFixed(2)} (${s.cpu_count} cores)`,
    `RAM: ${formatBytes(s.ram.used)} / ${formatBytes(s.ram.total)} (${s.ram.percent}%)`,
    ...diskLines,
    `Net: ↑${formatBytesPerSec(s.network.send_bps)} ↓${formatBytesPerSec(s.network.recv_bps)} (${s.network.percent}% of ${s.network.max_mbits} Mbit/s)`,
    `Uptime: ${formatUptime(s.uptime_seconds)}`,
  ]
  return lines.filter(Boolean).join('\n')
}

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText())
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      onClick={onCopy}
      className="flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-white/10 text-[11px] text-gray-300 hover:text-white hover:border-white/25 transition-colors"
      title="Copy all metrics to clipboard"
    >
      {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

/** Detailed tooltip body for a single server. */
function StatsDetail({ stats: s }: { stats: ServerStatsData }) {
  const loadColor = colorForPercent(s.load_percent[0])
  const ramColor = colorForPercent(s.ram.percent)
  const netColor = colorForPercent(s.network.percent)
  const disks = getDisks(s)
  const multiDisk = disks.length > 1
  return (
    <div className="space-y-1.5">
      <div>
        <span className="text-gray-400">Load: </span>
        <span style={{ color: loadColor }}>
          {s.load_avg[0].toFixed(2)} / {s.load_avg[1].toFixed(2)} / {s.load_avg[2].toFixed(2)}
        </span>
        <span className="text-gray-500"> ({s.cpu_count} cores)</span>
      </div>
      <div>
        <span className="text-gray-400">RAM: </span>
        <span style={{ color: ramColor }}>{formatBytes(s.ram.used)} / {formatBytes(s.ram.total)}</span>
        <span className="text-gray-500"> ({s.ram.percent}%)</span>
      </div>
      {disks.map((d, i) => (
        <div key={d.name ?? i}>
          <span className="text-gray-400">
            {multiDisk ? `Disk ${d.name ?? `#${i + 1}`}: ` : 'Disk: '}
          </span>
          <span style={{ color: colorForPercent(d.percent) }}>
            {formatBytes(d.used)} / {formatBytes(d.total)}
          </span>
          <span className="text-gray-500"> ({d.percent}%)</span>
          {multiDisk && i === 0 && <span className="text-gray-600"> · primary</span>}
        </div>
      ))}
      <div>
        <span className="text-gray-400">Net: </span>
        <span style={{ color: netColor }}>
          {'↑'}{formatBytesPerSec(s.network.send_bps)} {'↓'}{formatBytesPerSec(s.network.recv_bps)}
        </span>
        <span className="text-gray-500"> ({s.network.percent}% of {s.network.max_mbits} Mbit/s)</span>
      </div>
      <div>
        <span className="text-gray-400">Uptime: </span>
        <span className="text-gray-300">{formatUptime(s.uptime_seconds)}</span>
      </div>
    </div>
  )
}

/**
 * Compact server-health pill (Load / RAM / HDD / Net / Up) with a hover tooltip.
 * Pass a single `stats` object, or a `servers` array for 2+ machines — then the
 * pill shows one server at a time and its name becomes a switcher (click to cycle
 * to the next machine). With a single server no name is shown. The tooltip carries
 * a "Copy" button that puts every server's metrics on the clipboard as plain text.
 * Fully presentational — feed it data from your own polling loop.
 */
export function ServerStats({ stats, servers, copyable = true, className }: ServerStatsProps) {
  const items: ServerStatsItem[] =
    servers && servers.length > 0 ? servers : stats ? [{ stats }] : []

  const [selected, setSelected] = React.useState(0)
  const [showTooltip, setShowTooltip] = React.useState(false)

  const copyAllText = React.useCallback(() => items.map(statsToText).join('\n\n'), [items])

  if (items.length === 0) return null

  const multiple = items.length > 1
  const idx = selected % items.length
  const item = items[idx]
  const s = item.stats
  const next = () => setSelected((v) => (v + 1) % items.length)

  const loadColor = colorForPercent(s.load_percent[0])
  const ramColor = colorForPercent(s.ram.percent)
  const disks = getDisks(s)
  const primaryDisk = disks[0]
  const diskColor = colorForPercent(primaryDisk.percent)
  const netColor = colorForPercent(s.network.percent)

  const label = item.label ?? (multiple ? `srv ${idx + 1}` : null)

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip. The wrapper uses bottom-full + pb-2 (not margin) so its hit area
          touches the pill — keeping hover continuous as the mouse moves up to the
          Copy button. */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-10">
          <div
            className="px-4 py-3 rounded-lg backdrop-blur-md border shadow-xl text-xs font-mono whitespace-nowrap"
            style={{ background: 'rgba(24,24,23,0.95)', borderColor: 'rgba(255,255,255,0.1)', color: '#ece8e1' }}
          >
            {(label || copyable) && (
              <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-white/10">
                <span className="text-gray-300 font-semibold">
                  {label ?? 'Server'}
                  {multiple && <span className="text-gray-500 font-normal"> · {idx + 1}/{items.length}</span>}
                </span>
                {copyable && <CopyButton getText={copyAllText} />}
              </div>
            )}
            <StatsDetail stats={s} />
          </div>
        </div>
      )}

      {/* Compact bar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border text-xs font-mono shadow-lg transition-all cursor-default select-none"
        style={{ background: 'rgba(24,24,23,0.6)', borderColor: 'rgba(255,255,255,0.08)', color: '#ece8e1' }}
      >
        {multiple && (
          <>
            <button
              onClick={next}
              className="flex items-center gap-1 -ml-1 pl-1.5 pr-1 py-0.5 rounded-full text-gray-300 font-semibold hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title={`Server ${idx + 1} of ${items.length} — click to switch`}
            >
              <span>{label}</span>
              <ChevronsLeftRight size={10} className="text-gray-500" />
            </button>
            <span className="text-gray-600">|</span>
          </>
        )}

        <Activity size={11} className="text-gray-500 flex-shrink-0" />

        <span>
          <span className="text-gray-500">Load </span>
          <span style={{ color: loadColor }}>{Math.round(s.load_percent[0])}%</span>
          <span className="text-gray-600"> {Math.round(s.load_percent[1])}% {Math.round(s.load_percent[2])}%</span>
        </span>

        <span className="text-gray-600">|</span>

        <span>
          <span className="text-gray-500">RAM </span>
          <span style={{ color: ramColor }}>{Math.round(s.ram.percent)}%</span>
        </span>

        <span className="text-gray-600">|</span>

        <span>
          <span className="text-gray-500">HDD </span>
          <span style={{ color: diskColor }}>{Math.round(primaryDisk.percent)}%</span>
          {disks.length > 1 && <span className="text-gray-600"> ·{disks.length}</span>}
        </span>

        <span className="text-gray-600">|</span>

        <span>
          <span className="text-gray-500">Net </span>
          <span style={{ color: netColor }}>{Math.round(s.network.percent)}%</span>
        </span>

        <span className="text-gray-600">|</span>

        <span>
          <span className="text-gray-500">Up </span>
          <span className="text-gray-300">{formatUptimeShort(s.uptime_seconds)}</span>
        </span>
      </div>
    </div>
  )
}
