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
  args: { status: 'online', onlineLabel: 'Orchestrator connected' },
}

export const Warning: Story = {
  args: { status: 'warning', warningLabel: 'Slow connection' },
}

export const Offline: Story = {
  args: { status: 'offline', offlineLabel: 'Orchestrator offline' },
}

export const WithHoverDetails: Story = {
  args: {
    status: 'online',
    onlineLabel: 'Backend connected',
    details: (
      <div className="space-y-0.5">
        <div><span className="text-gray-400">Ping: </span><span style={{ color: '#22c55e' }}>42 ms</span></div>
        <div><span className="text-gray-400">Updated: </span><span className="text-gray-300">320 ms ago</span></div>
      </div>
    ),
  },
}
