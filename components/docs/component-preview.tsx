'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  language?: string
  className?: string
  previewClassName?: string
}

export function ComponentPreview({ children, code, language = 'tsx', className, previewClassName }: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')

  return (
    <div className={cn('rounded-3xl border border-border overflow-hidden', className)}>
      <div className="flex items-center gap-1 px-4 pt-3 bg-card/40 border-b border-border">
        {(['preview', 'code'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2 text-sm font-bold capitalize rounded-t-xl transition-all duration-200 -mb-px',
              tab === t
                ? 'bg-background text-foreground border border-border border-b-background'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'preview' ? (
        <div className={cn('flex min-h-[200px] items-center justify-center p-8 bg-background/50 bg-grid', previewClassName)}>
          {children}
        </div>
      ) : (
        <CodeBlock code={code} language={language} className="rounded-none border-0" />
      )}
    </div>
  )
}
