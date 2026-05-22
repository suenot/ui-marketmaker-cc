import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './hero'

const meta: Meta<typeof Hero> = {
  title: 'Marketing/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    badge: { control: 'text' },
    title: { control: 'text' },
    highlightedTitle: { control: 'text' },
    subtitle: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    badge: 'AI & Fintech',
    title: 'AI Trading.',
    highlightedTitle: 'A New Level',
    subtitle: 'Next-generation AI-powered algorithmic trading platform for professional traders.',
    primaryCta: { label: 'Read Whitepaper', href: '#' },
    secondaryCta: { label: 'Invest', href: '#' },
  },
}

export const NoCta: Story = {
  args: {
    badge: 'AI & Fintech',
    title: 'AI Trading.',
    highlightedTitle: 'A New Level',
    subtitle: 'Next-generation AI-powered algorithmic trading platform.',
  },
}

export const MinimalHero: Story = {
  args: {
    title: 'MarketMaker',
    subtitle: 'Algorithmic trading for everyone.',
    primaryCta: { label: 'Get Started', href: '#' },
  },
}
