import { formatINR, gainColor } from '../../utils/formatters'
import NumericTooltip from '../common/NumericTooltip'

interface GainCellProps {
  gain: number
  balance: number
  label: string
}

const GainCell = ({ gain, balance, label }: GainCellProps) => {
  const arrow = gain > 0 ? '▲' : gain < 0 ? '▼' : '•'
  const compactGain = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(gain)

  return (
    <div className="min-w-[130px] text-left">
      <p className={`text-sm font-bold transition-all duration-300 sm:text-base ${gainColor(gain)}`}>
        <span className="mr-1 text-[10px] sm:text-xs">{arrow}</span>
        <NumericTooltip value={gain} display={compactGain} />
      </p>
      <p className="mt-0.5 text-[11px] text-slate-400 sm:text-xs">
        <NumericTooltip value={balance} display={formatINR(balance)} />
      </p>
    </div>
  )
}

export default GainCell
