import type { Meta, StoryObj } from '@storybook/react'
import { FeatureCard } from './feature-card'
import { Monitor, Bot, BarChart3, BriefcaseIcon, FlaskConical, TrendingUp } from 'lucide-react'

const meta: Meta<typeof FeatureCard> = {
  title: 'Marketing/FeatureCard',
  component: FeatureCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    delay: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Bot size={48} />,
    title: 'AI Strategy Builder',
    description: 'Create, backtest, and deploy algorithmic trading strategies powered by machine learning.',
  },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const TradingTerminal: Story = {
  args: {
    icon: <Monitor size={48} />,
    title: 'Trading Terminal',
    description: 'Real-time market data, advanced charting tools, and one-click order execution.',
  },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <FeatureCard icon={<Monitor size={48} />} title="Trading Terminal" description="Real-time market data and advanced charting." delay={0} />
      <FeatureCard icon={<Bot size={48} />} title="AI Strategy Builder" description="Build and deploy algorithmic strategies." delay={0.1} />
      <FeatureCard icon={<BarChart3 size={48} />} title="Analytics" description="Deep performance analytics and insights." delay={0.2} />
      <FeatureCard icon={<BriefcaseIcon size={48} />} title="Portfolio" description="Multi-exchange portfolio management." delay={0.3} />
      <FeatureCard icon={<FlaskConical size={48} />} title="Backtesting" description="Historical simulation with risk metrics." delay={0.4} />
      <FeatureCard icon={<TrendingUp size={48} />} title="Market Data" description="50+ exchanges, 10,000+ trading pairs." delay={0.5} />
    </div>
  ),
  parameters: { layout: 'fullscreen', padding: '2rem' },
}
