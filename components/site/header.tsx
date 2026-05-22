import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Github } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-black text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            ui-marketmaker-cc
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              Docs
            </Link>
            <Link href="/docs/components" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
              Components
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/suenot/marketmaker-token"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl hover:bg-accent/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Github size={20} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
