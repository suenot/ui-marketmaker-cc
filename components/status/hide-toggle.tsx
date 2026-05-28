'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A single thing that can be hidden in category mode (e.g. exchanges, coins). */
export interface HideCategory {
  /** Stable id reported back through onChange (e.g. "exchanges"). */
  key: string
  /** Human label shown in the hover menu (e.g. "Exchanges"). */
  label: string
  /** Hidden by default when uncontrolled. */
  defaultHidden?: boolean
}

export interface HideToggleProps {
  // --- Simple mode (no `categories`) ---
  /** Controlled hidden state. Omit to let the component manage its own state. */
  hidden?: boolean
  /** Initial state when uncontrolled. */
  defaultHidden?: boolean
  /** Fired with the master hidden state (true when anything is hidden). */
  onChange?: (hidden: boolean) => void

  // --- Category mode (pass `categories`) ---
  /** Hideable categories. When set, hovering the pill reveals a per-item menu. */
  categories?: HideCategory[]
  /** Controlled set of hidden category keys. */
  hiddenKeys?: string[]
  /** Fired with the full set of hidden category keys. */
  onCategoriesChange?: (hiddenKeys: string[]) => void

  /** localStorage key for persistence when uncontrolled. Pass null to disable. */
  storageKey?: string | null
  className?: string
}

function Pill({
  active,
  label,
  onClick,
  onContextMenu,
  title,
  className,
}: {
  active: boolean
  label: React.ReactNode
  onClick?: () => void
  onContextMenu?: (e: React.MouseEvent) => void
  title?: string
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-sm border text-xs font-medium shadow-lg transition-all cursor-pointer hover:scale-105',
        className,
      )}
      style={{
        background: active ? 'rgba(239,68,68,0.08)' : 'rgba(107,114,128,0.08)',
        borderColor: active ? 'rgba(239,68,68,0.2)' : 'rgba(107,114,128,0.15)',
        color: active ? '#ef4444' : '#6b7280',
      }}
      title={title}
    >
      {active ? <EyeOff size={12} /> : <Eye size={12} />}
      <span className="font-mono">{label}</span>
    </button>
  )
}

/**
 * "Investor / anonymous mode" toggle. In its simplest form it flips between SHOW
 * and HIDE (like the trading dashboards) — wire `onChange` to mask sensitive
 * labels across your app.
 *
 * Pass a `categories` array to make it granular: the master pill still toggles
 * everything at once, but hovering it reveals a menu where each category
 * (exchanges, coins, trade volumes, …) can be hidden independently. Read the
 * current set via `onCategoriesChange`.
 */
export function HideToggle(props: HideToggleProps) {
  if (props.categories && props.categories.length > 0) {
    return <HideToggleCategories {...props} categories={props.categories} />
  }
  return <HideToggleSimple {...props} />
}

function HideToggleSimple({
  hidden,
  defaultHidden = false,
  onChange,
  storageKey = 'hide_mode',
  className,
}: HideToggleProps) {
  const isControlled = hidden !== undefined
  const [internal, setInternal] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined' && storageKey) {
      return localStorage.getItem(storageKey) === 'true'
    }
    return defaultHidden
  })

  const value = isControlled ? (hidden as boolean) : internal

  const toggle = React.useCallback(() => {
    const next = !value
    if (!isControlled) {
      setInternal(next)
      if (typeof window !== 'undefined' && storageKey) localStorage.setItem(storageKey, String(next))
    }
    onChange?.(next)
  }, [value, isControlled, storageKey, onChange])

  return (
    <Pill
      active={value}
      label={value ? 'HIDE' : 'SHOW'}
      onClick={toggle}
      title={
        value
          ? 'Anonymous mode ON — sensitive labels hidden. Click to show.'
          : 'Click to hide sensitive labels (anonymous mode)'
      }
      className={className}
    />
  )
}

function HideToggleCategories({
  categories,
  hiddenKeys,
  onCategoriesChange,
  onChange,
  storageKey = 'hide_mode',
  className,
}: HideToggleProps & { categories: HideCategory[] }) {
  const isControlled = hiddenKeys !== undefined
  const [internal, setInternal] = React.useState<Set<string>>(() => {
    if (typeof window !== 'undefined' && storageKey) {
      try {
        const raw = localStorage.getItem(storageKey)
        if (raw && raw.startsWith('[')) return new Set<string>(JSON.parse(raw))
      } catch {
        /* ignore malformed value */
      }
    }
    return new Set(categories.filter((c) => c.defaultHidden).map((c) => c.key))
  })
  const [open, setOpen] = React.useState(false)

  const current = isControlled ? new Set(hiddenKeys) : internal
  const anyHidden = current.size > 0
  const allHidden = current.size >= categories.length

  const commit = React.useCallback(
    (nextSet: Set<string>) => {
      if (!isControlled) {
        setInternal(nextSet)
        if (typeof window !== 'undefined' && storageKey) {
          localStorage.setItem(storageKey, JSON.stringify([...nextSet]))
        }
      }
      onCategoriesChange?.([...nextSet])
      onChange?.(nextSet.size > 0)
    },
    [isControlled, storageKey, onCategoriesChange, onChange],
  )

  const toggleKey = (key: string) => {
    const nextSet = new Set(current)
    if (nextSet.has(key)) nextSet.delete(key)
    else nextSet.add(key)
    commit(nextSet)
  }

  const toggleAll = () => commit(anyHidden ? new Set() : new Set(categories.map((c) => c.key)))

  // Label: SHOW when nothing hidden, HIDE when all, "HIDE n/N" when partial.
  const label = !anyHidden ? 'SHOW' : allHidden ? 'HIDE' : `HIDE ${current.size}/${categories.length}`

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Hover menu. bottom-full + pb-2 (not margin) keeps the hover area
          continuous between the pill and the menu. */}
      {open && (
        <div className="absolute bottom-full left-0 pb-2 z-10">
          <div
            className="py-1 rounded-lg backdrop-blur-md border shadow-xl min-w-[170px]"
            style={{ background: 'rgba(24,24,23,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between gap-4 px-3 py-1.5 mb-1 border-b border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                Hide
              </span>
              <button
                onClick={toggleAll}
                className="text-[11px] text-gray-400 hover:text-white transition-colors"
              >
                {anyHidden ? 'Show all' : 'Hide all'}
              </button>
            </div>
            {categories.map((c) => {
              const isHidden = current.has(c.key)
              return (
                <button
                  key={c.key}
                  onClick={() => toggleKey(c.key)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors hover:bg-white/5"
                  style={{ color: isHidden ? '#ef4444' : '#9ca3af' }}
                >
                  {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
                  <span className="flex-1">{c.label}</span>
                  <span className="font-mono text-[10px] opacity-70">{isHidden ? 'HIDDEN' : 'shown'}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <Pill
        active={anyHidden}
        label={label}
        onClick={toggleAll}
        title="Click to toggle all · hover to choose what to hide"
      />
    </div>
  )
}
