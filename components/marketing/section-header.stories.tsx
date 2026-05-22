import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from './section-header'

const meta: Meta<typeof SectionHeader> = {
  title: 'Marketing/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    badge: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    align: {
      control: 'radio',
      options: ['center', 'left'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    badge: 'Platform',
    title: 'Platform Features',
    subtitle: 'Everything you need for algorithmic trading, in one place.',
  },
  decorators: [(S) => <div className="w-[600px]"><S /></div>],
}

export const LeftAligned: Story = {
  args: {
    badge: 'Team',
    title: 'Our Team',
    subtitle: 'World-class engineers and quant researchers.',
    align: 'left',
  },
  decorators: [(S) => <div className="w-[600px]"><S /></div>],
}

export const NoBadge: Story = {
  args: {
    title: 'Roadmap',
    subtitle: 'Our development roadmap for 2025–2026.',
  },
  decorators: [(S) => <div className="w-[600px]"><S /></div>],
}

export const TitleOnly: Story = {
  args: { title: 'Tokenomics' },
  decorators: [(S) => <div className="w-[600px]"><S /></div>],
}
