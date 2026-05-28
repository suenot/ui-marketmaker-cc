'use client'

import * as React from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ConnectionIndicatorProps {
  /** Connection state. `null` renders nothing (e.g. before the first check). */
  connected?: boolean | null
  /** Tooltip when connected. */
  onlineLabel?: string
  /** Tooltip when disconnected. */
  offlineLabel?: string
  className?: string
}

/**
 * Tiny round status dot — green wifi when connected, red when offline. Drive the
 * `connected` prop from your own health-check polling loop.
 */
export function ConnectionIndicator({
  connected,
  onlineLabel = 'Connected',
  offlineLabel = 'Offline',
  className,
}: ConnectionIndicatorProps) {
  if (connected === null || connected === undefined) return null

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-sm border text-xs font-medium shadow-lg transition-all',
        className,
      )}
      style={{
        background: connected ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
        borderColor: connected ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
        color: connected ? '#22c55e' : '#ef4444',
      }}
      title={connected ? onlineLabel : offlineLabel}
    >
      {connected ? <Wifi size={12} /> : <WifiOff size={12} />}
    </div>
  )
}
