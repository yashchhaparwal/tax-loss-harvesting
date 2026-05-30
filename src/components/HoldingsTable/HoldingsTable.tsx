import { useEffect, useMemo, useRef, useState } from 'react'
import { getHoldingKey, useHarvest } from '../../context/HarvestContext'
import ErrorState from '../common/ErrorState'
import Loader from '../common/Loader'
import TextTooltip from '../common/TextTooltip'
import HoldingRow from './HoldingRow'

interface HoldingsTableProps {
  onRetry: () => void | Promise<void>
}

type SortKey = 'stcg' | 'ltcg' | 'currentPrice' | 'holdings' | null
type SortDir = 'asc' | 'desc'

const HoldingsTable = ({ onRetry }: HoldingsTableProps) => {
  const {
    state: { holdings, selectedCoins, loading, error },
    dispatch,
  } = useHarvest()
  const [showAll, setShowAll] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const selectAllRef = useRef<HTMLInputElement | null>(null)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sortArrow = (key: SortKey) => {
    if (sortKey !== key) return ' ↕'
    return sortDir === 'desc' ? ' ↓' : ' ↑'
  }

  const sortedHoldings = useMemo(() => {
    const arr = [...holdings]
    if (!sortKey) {
      // default: sort by absolute total gain descending
      return arr.sort(
        (a, b) =>
          Math.abs(b.stcg.gain + b.ltcg.gain) - Math.abs(a.stcg.gain + a.ltcg.gain),
      )
    }

    return arr.sort((a, b) => {
      let aVal = 0
      let bVal = 0

      if (sortKey === 'stcg') {
        aVal = a.stcg.gain
        bVal = b.stcg.gain
      } else if (sortKey === 'ltcg') {
        aVal = a.ltcg.gain
        bVal = b.ltcg.gain
      } else if (sortKey === 'currentPrice') {
        aVal = a.currentPrice
        bVal = b.currentPrice
      } else if (sortKey === 'holdings') {
        aVal = a.totalHolding
        bVal = b.totalHolding
      }

      return sortDir === 'desc' ? bVal - aVal : aVal - bVal
    })
  }, [holdings, sortKey, sortDir])

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 5)
  const totalCount = holdings.length
  const selectedCount = selectedCoins.size
  const allSelected = totalCount > 0 && selectedCount === totalCount
  const someSelected = selectedCount > 0 && selectedCount < totalCount

  useEffect(() => {
    if (!selectAllRef.current) return
    selectAllRef.current.indeterminate = someSelected
  }, [someSelected])

  if (loading) {
    return (
      <section className="mt-6 flex min-h-[240px] items-center justify-center rounded-xl border border-white/10 bg-slate-900/50">
        <Loader />
      </section>
    )
  }

  if (error) {
    return <ErrorState message="Failed to load data" onRetry={onRetry} />
  }

  if (!loading && holdings.length === 0) {
    return (
      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-16 text-center">
        <p className="text-sm text-slate-400">No holdings found in your portfolio.</p>
      </section>
    )
  }

  const thBase =
    'px-2 py-3 sm:px-3 cursor-pointer select-none hover:text-slate-200 transition-colors'

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
      <div className="border-b border-white/10 px-4 py-3">
        <h3 className="text-base font-semibold text-slate-100">Holdings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-900/90">
            <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-wide text-slate-400 sm:text-xs">
              <th className="w-[40px] px-3 py-3">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allSelected}
                  onChange={() =>
                    dispatch({ type: allSelected ? 'DESELECT_ALL' : 'SELECT_ALL' })
                  }
                  aria-label="Select all holdings"
                  className="h-4 w-4 accent-blue-500"
                />
              </th>
              <th className="w-[180px] px-2 py-3 sm:px-3">Asset</th>
              <th
                className={`hidden w-[160px] md:table-cell ${thBase}`}
                onClick={() => handleSort('holdings')}
              >
                Holdings / Avg Buy Price
                <span className="ml-1 text-blue-400">{sortArrow('holdings')}</span>
              </th>
              <th
                className={`w-[130px] ${thBase}`}
                onClick={() => handleSort('currentPrice')}
              >
                Current Price
                <span className="ml-1 text-blue-400">{sortArrow('currentPrice')}</span>
              </th>
              <th
                className={`w-[150px] ${thBase}`}
                onClick={() => handleSort('stcg')}
              >
                <TextTooltip
                  label={`Short-Term${sortArrow('stcg')}`}
                  tip="Gains from assets held for less than 1 year. Click to sort."
                />
              </th>
              <th
                className={`w-[130px] ${thBase}`}
                onClick={() => handleSort('ltcg')}
              >
                <TextTooltip
                  label={`Long-Term${sortArrow('ltcg')}`}
                  tip="Gains from assets held for more than 1 year. Click to sort."
                />
              </th>
              <th className="hidden w-[120px] px-3 py-3 md:table-cell">
                <TextTooltip
                  label="Amount to Sell"
                  tip="The total quantity you'd sell to harvest this loss/gain"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => {
              const coinKey = getHoldingKey(holding)
              const isNoiseRow =
                Math.abs(holding.stcg.gain) < 0.000001 &&
                Math.abs(holding.ltcg.gain) < 0.000001
              return (
                <HoldingRow
                  key={coinKey}
                  holding={holding}
                  isSelected={selectedCoins.has(coinKey)}
                  onToggle={() =>
                    dispatch({ type: 'TOGGLE_COIN', payload: { coinKey } })
                  }
                  isNoiseRow={isNoiseRow}
                />
              )
            })}
          </tbody>
        </table>
      </div>

      {sortedHoldings.length > 5 ? (
        <div className="border-t border-white/10 px-4 py-3">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-medium text-blue-300 transition hover:text-blue-200"
          >
            {showAll ? 'View Less' : 'View All'}
          </button>
        </div>
      ) : null}
    </section>
  )
}

export default HoldingsTable