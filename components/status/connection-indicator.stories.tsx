import type { Meta, StoryObj } from '@storybook/react'
import { ConnectionIndicator } from './connection-indicator'

const meta: Meta<typeof ConnectionIndicator> = {
  title: 'Status/Connection Indicator',
  component: ConnectionIndicator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Online: Story = {
  args: { connected: true, onlineLabel: 'Orchestrator connected' },
}

export const Offline: Story = {
  args: { connected: false, offlineLabel: 'Orchestrator offline' },
}
