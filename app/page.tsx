import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FeatureCard } from '@/components/marketing/feature-card'
import { TeamCard } from '@/components/marketing/team-card'
import { SectionHeader } from '@/components/marketing/section-header'
import { Header } from '@/components/site/header'
import { BarChart3, Bot, BriefcaseIcon, Monitor, FlaskConical, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(90,76,228,0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6">New Components Available</Badge>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.2] pb-4 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
            ui-marketmaker-cc
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Copy-paste ready React components for building AI trading platform interfaces. Built with Tailwind CSS and TypeScript.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs/components">Browse Components</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border py-12 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Components', value: '10+' },
              { label: 'TypeScript', value: '100%' },
              { label: 'Dark mode', value: 'Built-in' },
              { label: 'Copy-paste', value: 'Ready' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-light mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Marketing"
            title="Feature Cards"
            subtitle="Showcase your platform capabilities with animated feature cards."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <FeatureCard icon={<Monitor size={48} />} title="Trading Terminal" description="Real-time market data, advanced charting tools, and order management in a single interface." delay={0} />
            <FeatureCard icon={<BriefcaseIcon size={48} />} title="Portfolio Management" description="Track your positions, analyze P&L, and manage risk across multiple exchanges." delay={0.1} />
            <FeatureCard icon={<Bot size={48} />} title="AI Strategy Builder" description="Create, backtest, and deploy algorithmic trading strategies powered by AI." delay={0.2} />
            <FeatureCard icon={<BarChart3 size={48} />} title="Analytics" description="Deep performance analytics, trade journaling, and actionable market insights." delay={0.3} />
            <FeatureCard icon={<FlaskConical size={48} />} title="Strategy Testing" description="Historical backtesting with advanced simulation and risk metrics." delay={0.4} />
            <FeatureCard icon={<TrendingUp size={48} />} title="Market Data" description="Access to historical OHLCV data across 50+ exchanges and 10,000+ trading pairs." delay={0.5} />
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/docs/components/feature-card">View Component →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Base UI preview */}
      <section className="py-24 bg-muted/5 border-y border-border">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Base UI" title="Primitive Components" subtitle="Buttons, badges, cards, and inputs with consistent styling." />
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Buttons */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Button</p>
              <div className="flex flex-wrap gap-4">
                <Button>Get Started</Button>
                <Button variant="outline">Read Whitepaper</Button>
                <Button variant="ghost">Learn More</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            {/* Badges */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Badge</p>
              <div className="flex flex-wrap gap-3">
                <Badge>AI & Fintech</Badge>
                <Badge variant="outline">Open Source</Badge>
                <Badge variant="solid">New</Badge>
                <Badge variant="muted">Beta</Badge>
              </div>
            </div>
            {/* Cards */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Card</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trading Signal</CardTitle>
                    <CardDescription>AI-generated market signal based on technical analysis and sentiment data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant="solid">BUY</Badge>
                      <span className="text-sm text-muted-foreground">BTC/USDT · Confidence 87%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Summary</CardTitle>
                    <CardDescription>Total portfolio value across all connected exchanges.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-foreground">$24,501.00</p>
                    <p className="text-sm text-green-400 font-bold mt-1">↑ +12.4% this month</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Input */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Input</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                <Input placeholder="Search markets..." />
                <Input placeholder="Enter API key..." type="password" />
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/docs/components">View All Components →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Marketing" title="Team Cards" subtitle="Introduce your team with clean, animated team member cards." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12 max-w-3xl mx-auto">
            <TeamCard name="@suenot" role="CEO" specialization="Fullstack · DevOps · AI" />
            <TeamCard name="@markolofsen" role="CTO" specialization="Fullstack" />
            <TeamCard name="@timax" role="Head of Quant" specialization="Fullstack · AI" />
            <TeamCard name="@your_name" role="Join Us" specialization="Open position" />
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/docs/components/team-card">View Component →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/5">
        <div className="container mx-auto px-4 text-center">
          <p className="font-black text-lg text-foreground mb-2">ui-marketmaker-cc</p>
          <p className="text-muted-foreground font-light text-sm">
            Open source component library for{' '}
            <a href="https://marketmaker.cc" className="text-accent-darker hover:underline">
              marketmaker.cc
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
