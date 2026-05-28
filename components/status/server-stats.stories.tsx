import type { Meta, StoryObj } from '@storybook/react'
import { ServerStats, type ServerStatsData } from './server-stats'

const meta: Meta<typeof ServerStats> = {
  title: 'Status/Server Stats',
  component: ServerStats,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const healthy: ServerStatsData = {
  cpu_count: 8,
  load_avg: [1.36, 1.04, 0.88],
  load_percent: [17, 13, 11],
  uptime_seconds: 91 * 86400,
  ram: { total: 32 * 1024 ** 3, used: 3.84 * 1024 ** 3, available: 28.16 * 1024 ** 3, percent: 12 },
  disk: { total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
  network: {
    bytes_sent: 0,
    bytes_recv: 0,
    send_bps: 12 * 1024,
    recv_bps: 48 * 1024,
    percent: 0,
    max_mbits: 1000,
  },
}

export const Default: Story = {
  args: { stats: healthy },
}

const underLoad: ServerStatsData = {
  ...healthy,
  load_avg: [7.2, 6.8, 5.1],
  load_percent: [90, 85, 64],
  ram: { ...healthy.ram, used: 27 * 1024 ** 3, percent: 84 },
  network: { ...healthy.network, send_bps: 80 * 1024 ** 2, recv_bps: 120 * 1024 ** 2, percent: 65 },
}

export const UnderLoad: Story = {
  args: { stats: underLoad },
}

export const MultipleServers: Story = {
  args: {
    servers: [
      { label: 'web-1', stats: healthy },
      { label: 'web-2', stats: underLoad },
      {
        label: 'db-1',
        stats: { ...healthy, disk: { ...healthy.disk, percent: 62 }, ram: { ...healthy.ram, percent: 47 } },
      },
    ],
  },
}

const multiDisk: ServerStatsData = {
  ...healthy,
  // First disk = primary (system). Others follow.
  disks: [
    { name: '/', total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
    { name: '/data', total: 4 * 1024 ** 4, used: 1.6 * 1024 ** 4, free: 2.4 * 1024 ** 4, percent: 40 },
    { name: '/backup', total: 8 * 1024 ** 4, used: 5.2 * 1024 ** 4, free: 2.8 * 1024 ** 4, percent: 65 },
  ],
  // `disk` kept as the primary for back-compat.
  disk: { name: '/', total: 500 * 1024 ** 3, used: 475 * 1024 ** 3, free: 25 * 1024 ** 3, percent: 95 },
}

export const MultipleDisks: Story = {
  args: { stats: multiDisk },
}
