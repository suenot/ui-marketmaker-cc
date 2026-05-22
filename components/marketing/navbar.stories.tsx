import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Marketing/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand: 'MarketMaker',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Roadmap', href: '#' },
      { label: 'Token', href: '#' },
    ],
    cta: { label: 'Sign In', href: '#' },
  },
  decorators: [
    (S) => (
      <div className="min-h-[200px] bg-background">
        <S />
      </div>
    ),
  ],
}

export const NoLinks: Story = {
  args: {
    brand: 'MarketMaker',
    cta: { label: 'Launch App', href: '#' },
  },
  decorators: [
    (S) => (
      <div className="min-h-[200px] bg-background">
        <S />
      </div>
    ),
  ],
}

export const BrandOnly: Story = {
  args: { brand: 'MarketMaker' },
  decorators: [
    (S) => (
      <div className="min-h-[200px] bg-background">
        <S />
      </div>
    ),
  ],
}
