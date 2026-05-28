import type { Meta, StoryObj } from '@storybook/react'
import { HideToggle } from './hide-toggle'

const meta: Meta<typeof HideToggle> = {
  title: 'Status/Hide Toggle',
  component: HideToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Show: Story = {
  args: { defaultHidden: false, storageKey: null },
}

export const Hide: Story = {
  args: { defaultHidden: true, storageKey: null },
}

export const Categories: Story = {
  args: {
    storageKey: null,
    categories: [
      { key: 'exchanges', label: 'Exchanges' },
      { key: 'coins', label: 'Coins' },
      { key: 'volumes', label: 'Trade volumes' },
    ],
  },
}

export const CategoriesWithDefaults: Story = {
  args: {
    storageKey: null,
    categories: [
      { key: 'exchanges', label: 'Exchanges', defaultHidden: true },
      { key: 'coins', label: 'Coins' },
      { key: 'volumes', label: 'Trade volumes', defaultHidden: true },
      { key: 'pnl', label: 'PnL' },
    ],
  },
}
