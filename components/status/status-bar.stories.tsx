import type { Meta, StoryObj } from '@storybook/react'
import { StatusBar } from './status-bar'
import type { ServerStatsData } from './server-stats'

const meta: Meta<typeof StatusBar> = {
  title: 'Status/Status Bar',
  component: StatusBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const stats: ServerStatsData = {
  cpu_count: 8,
  load_avg: [1.36, 1.04, 0.88],
  load_percent: [17, 13, 11],
  uptime_seconds: 91 * 86400,
  ram: { total: 32 * 1024 ** 3, used: 3.84 * 1024 ** 3, available: 28.16 * 1024 ** 3, percent: 12 },
  disk: { total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
  network: { bytes_sent: 0, bytes_recv: 0, send_bps: 12 * 1024, recv_bps: 48 * 1024, percent: 0, max_mbits: 1000 },
}

export const FixedToViewport: Story = {
  args: {
    timezone: { storageKey: null },
    hide: { storageKey: null },
    stats,
    connected: true,
  },
}

export const Inline: Story = {
  args: {
    fixed: false,
    timezone: { storageKey: null },
    hide: { storageKey: null },
    stats,
    connected: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
}
