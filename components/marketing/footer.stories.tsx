import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './footer'

const meta: Meta<typeof Footer> = {
  title: 'Marketing/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'text' },
    tagline: { control: 'text' },
    copyright: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand: 'MarketMaker.cc',
    tagline: 'AI-powered algorithmic trading for everyone.',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#' },
          { label: 'Roadmap', href: '#' },
          { label: 'Whitepaper', href: '#' },
          { label: 'Token', href: '#' },
        ],
      },
      {
        title: 'Community',
        links: [
          { label: 'GitHub', href: '#' },
          { label: 'Twitter', href: '#' },
          { label: 'Telegram', href: '#' },
        ],
      },
    ],
    copyright: '© 2025 MarketMaker.cc. All rights reserved.',
  },
}

export const Minimal: Story = {
  args: {
    brand: 'MarketMaker.cc',
    copyright: '© 2025 MarketMaker.cc',
  },
}
