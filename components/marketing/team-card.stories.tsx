import type { Meta, StoryObj } from '@storybook/react'
import { TeamCard } from './team-card'

const meta: Meta<typeof TeamCard> = {
  title: 'Marketing/TeamCard',
  component: TeamCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    role: { control: 'text' },
    specialization: { control: 'text' },
    avatar: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: '@suenot',
    role: 'CEO',
    specialization: 'Fullstack · DevOps · AI Engineer',
  },
}

export const CTO: Story = {
  args: {
    name: '@markolofsen',
    role: 'CTO',
    specialization: 'Fullstack',
  },
}

export const JoinUs: Story = {
  args: {
    name: '@your_name',
    role: 'Join Us',
    specialization: 'Open position',
  },
}

export const TeamGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12">
      <TeamCard name="@suenot" role="CEO" specialization="Fullstack · DevOps · AI" />
      <TeamCard name="@markolofsen" role="CTO" specialization="Fullstack" />
      <TeamCard name="@timax" role="Head of Quant" specialization="Fullstack · AI" />
      <TeamCard name="@your_name" role="Join Us" specialization="Open position" />
    </div>
  ),
}
