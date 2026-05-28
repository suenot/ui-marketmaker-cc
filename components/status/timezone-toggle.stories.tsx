import type { Meta, StoryObj } from '@storybook/react'
import { TimezoneToggle } from './timezone-toggle'

const meta: Meta<typeof TimezoneToggle> = {
  title: 'Status/Timezone Toggle',
  component: TimezoneToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { storageKey: null },
}

export const StartLocal: Story = {
  args: { defaultValue: 'local', storageKey: null },
}

export const StartOffset: Story = {
  args: { defaultValue: 'utc+3', storageKey: null },
}

export const ExpandOnHover: Story = {
  args: { expandOnHover: true, storageKey: null },
}
