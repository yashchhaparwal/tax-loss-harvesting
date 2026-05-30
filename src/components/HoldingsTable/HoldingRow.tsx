import { useState } from 'react'
import type { Holding } from '../../types'
import { formatHolding, formatINR } from '../../utils/formatters'
import NumericTooltip from '../common/NumericTooltip'
import GainCell from './GainCell'

interface HoldingRowProps {
  holding: Holding
  isSelected: boolean
  onToggle: () => void
  isNoiseRow?: boolean
}

const HoldingRow = ({ holding, isSelected, onToggle, isNoiseRow = false }: HoldingRowProps) => {
  const [hasImageError, setHasImageError] = useState(false)
  const logoFallback =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" rx="32" fill="%23334155"/><text x="50%" y="56%" font-size="24" text-anchor="middle" fill="%23e2e8f0" font-family="Arial">%</text></svg>'

  const avgBuyDisplay = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(holding.averageBuyPrice)

  return (
    <tr
      className={`border-b border-white/10 transition hover:bg-white/5 ${
        isSelected ? 'bg-blue-500/10' : ''
      } ${isNoiseRow ? 'opacity-50' : ''}`}
    >
      <td className="w-[40px] px-2 py-3 align-top sm:px-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          aria-label={`Select ${holding.coinName}`}
          className="h-4 w-4 accent-blue-500"
        />
      </td>

      <td className="w-[180px] px-2 py-3 align-top sm:px-3">
        <div className="flex items-start gap-3">
          {hasImageError ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-200">
              {holding.coin.slice(0, 1)}
            </div>
          ) : (
            <img
              src={holding.logo}
              alt={holding.coinName}
              className="h-8 w-8 rounded-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = logoFallback
                setHasImageError(true)
              }}
            />
          )}
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-100 sm:text-sm">{holding.coinName}</p>
            <p className="text-xs text-slate-400">{holding.coin}</p>
          </div>
        </div>
      </td>

      <td className="hidden w-[160px] px-3 py-3 align-top md:table-cell">
        <p className="text-xs font-semibold text-slate-100 sm:text-sm">
          <NumericTooltip
            value={holding.totalHolding}
            display={`${formatHolding(holding.totalHolding)} ${holding.coin}`}
          />
        </p>
        <p className="text-xs text-slate-400">
          <NumericTooltip
            value={holding.averageBuyPrice}
            display={`${avgBuyDisplay}/${holding.coin}`}
          />
        </p>
      </td>

      <td className="w-[130px] px-2 py-3 align-top text-xs text-slate-100 sm:px-3 sm:text-sm">
        <NumericTooltip value={holding.currentPrice} display={formatINR(holding.currentPrice)} />
      </td>

      <td className="w-[150px] px-2 py-3 align-top sm:px-3">
        <GainCell gain={holding.stcg.gain} balance={holding.stcg.balance} />
      </td>

      <td className="w-[130px] px-2 py-3 align-top sm:px-3">
        <GainCell gain={holding.ltcg.gain} balance={holding.ltcg.balance} />
      </td>

      <td className="hidden w-[120px] px-3 py-3 align-top text-xs text-slate-100 sm:text-sm md:table-cell">
        {isSelected ? (
          <NumericTooltip value={holding.totalHolding} display={formatHolding(holding.totalHolding)} />
        ) : (
          '-'
        )}
      </td>
    </tr>
  )
}

export default HoldingRow