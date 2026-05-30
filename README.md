# Tax Loss Harvesting

## Project Overview

This project is a React + TypeScript + Tailwind CSS dashboard for visualizing and simulating tax-loss harvesting decisions across crypto holdings.

It includes:
- Pre-harvest and after-harvest capital gains comparison cards
- Savings banner based on realized gain deltas
- Sortable/selectable holdings table with select-all support
- Mock API data loading with loading and retry states

## Setup Instructions

```bash
npm install
npm run dev
```

## Folder Structure

| Path | Purpose |
| --- | --- |
| `src/api/mockApi.ts` | Mock async API for holdings and capital gains |
| `src/types/index.ts` | Shared TypeScript domain interfaces |
| `src/utils/formatters.ts` | INR, holding, and gain color formatting helpers |
| `src/context/HarvestContext.tsx` | Global reducer/context for holdings + UI state |
| `src/hooks/useHarvestData.ts` | Data fetch and reload orchestration |
| `src/hooks/useCapitalGains.ts` | Pre/after gains + saved amount derivation |
| `src/components/CapitalGainsCard/*` | Capital gains comparison cards and savings banner |
| `src/components/HoldingsTable/*` | Holdings grid, row cells, and selection controls |
| `src/components/common/*` | Shared loading/error UI elements |
| `src/App.tsx` | App shell and page composition |

## Screenshots

- Desktop view: _Add screenshot here_
- Mobile view: _Add screenshot here_

## Assumptions

- Unique holding selection key is `coin + coinName` to handle duplicate tickers.
- Pre/after gain calculations are performed client-side from API payloads and selected holdings.
- INR formatting uses locale-based formatting with `toLocaleString`/`Intl.NumberFormat` and `'en-IN'`.
