# @marketmaker_cc/ui

Trading-focused React component library behind [marketmaker.cc](https://marketmaker.cc) — Radix-based primitives plus live trading widgets (order book, order form, portfolio, deals list, instrument search).

## Install

```bash
npm i @marketmaker_cc/ui
```

Peer deps: `react` and `react-dom` (>=18).

## Setup

1. Import the design tokens once (e.g. `app/layout.tsx`):

```ts
import '@marketmaker_cc/ui/styles.css'
```

2. Add the Tailwind preset and include the package in your `content` so classes aren't purged:

```js
// tailwind.config.js
module.exports = {
  presets: [require('@marketmaker_cc/ui/tailwind-preset')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@marketmaker_cc/ui/dist/**/*.js',
  ],
}
```

## Usage

Named imports from the barrel (tree-shaken with ESM + `sideEffects:false`):

```tsx
import { Button, OrderBook } from '@marketmaker_cc/ui'
```

Per-component subpaths — use these for `next/dynamic` / `React.lazy` so only that
component's chunk is loaded:

```tsx
import dynamic from 'next/dynamic'
const OrderBook = dynamic(() => import('@marketmaker_cc/ui/order-book').then((m) => m.OrderBook))
```

## License

MIT
