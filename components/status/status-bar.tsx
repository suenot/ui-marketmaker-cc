'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { TimezoneToggle, type TimezoneToggleProps } from './timezone-toggle'
import { HideToggle, type HideToggleProps } from './hide-toggle'
import { ServerStats, type ServerStatsData, type ServerStatsItem } from './server-stats'
import { ConnectionIndicator } from './connection-indicator'

export interface StatusBarProps {
  /** Show the timezone toggle (bottom-left). Pass props to configure it. */
  timezone?: boolean | TimezoneToggleProps
  /** Show the investor/hide toggle (bottom-left, next to timezone). */
  hide?: boolean | HideToggleProps
  /** Server metrics for the centered health pill. Omit to hide it. */
  stats?: ServerStatsData | null
  /** Multiple servers for the centered pills. Takes precedence over `stats`. */
  servers?: ServerStatsItem[]
  /** Connection state for the bottom-right dot. `undefined` hides it. */
  connected?: boolean | null
  /**
   * Render fixed to the bottom of the viewport (default). Set false to render
   * inline so a parent can position it.
   */
  fixed?: boolean
  className?: string
}

/**
 * Floating status bar that pins the timezone toggle and investor toggle to the
 * bottom-left, the server-health pill to the bottom-center, and the connection
 * dot to the bottom-right — the layout from the trading dashboards.
 *
 * Every piece is optional and individually usable; this is just the convenience
 * composition.
 */
export function StatusBar({
  timezone = true,
  hide = true,
  stats,
  servers,
  connected,
  fixed = true,
  className,
}: StatusBarProps) {
  const hasStats = (servers && servers.length > 0) || stats !== undefined
  const tzProps = typeof timezone === 'object' ? timezone : undefined
  const hideProps = typeof hide === 'object' ? hide : undefined

  const Wrap = ({ children, side }: { children: React.ReactNode; side: 'left' | 'center' | 'right' }) =>
    fixed ? (
      <div
        className={cn(
          'fixed bottom-4 z-50',
          side === 'left' && 'left-4 flex items-center gap-3',
          side === 'center' && 'left-1/2 -translate-x-1/2',
          side === 'right' && 'right-4',
        )}
      >
        {children}
      </div>
    ) : (
      <>{children}</>
    )

  return (
    <div
      className={cn(
        !fixed && 'flex w-full items-center justify-between gap-3',
        className,
      )}
    >
      {(timezone || hide) && (
        <Wrap side="left">
          {timezone && <TimezoneToggle {...tzProps} />}
          {hide && <HideToggle {...hideProps} />}
        </Wrap>
      )}

      {hasStats && (
        <Wrap side="center">
          <ServerStats stats={stats} servers={servers} />
        </Wrap>
      )}

      {connected !== undefined && (
        <Wrap side="right">
          <ConnectionIndicator connected={connected} />
        </Wrap>
      )}
    </div>
  )
}
