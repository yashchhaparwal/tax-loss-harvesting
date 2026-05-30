import type { CapitalGains } from '../../types'
import { formatINR, gainColor } from '../../utils/formatters'
import NumericTooltip from '../common/NumericTooltip'

interface GainsCardProps {
  title: string
  gains: CapitalGains
  variant: 'pre' | 'after'
}

const realisedTotal = (gains: CapitalGains): number =>
  gains.stcg.profits -
  gains.stcg.losses +
  (gains.ltcg.profits - gains.ltcg.losses)

const Section = ({
  label,
  profits,
  losses,
}: {
  label: string
  profits: number
  losses: number
}) => {
  const net = profits - losses

  return (
    <div className="rounded-lg bg-black/20 p-4">
      <h3 className="mb-3 text-xs font-medium text-slate-200 sm:text-sm">{label}</h3>
      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Profits</span>
          <span className="font-semibold text-green-400 transition-all duration-300">
            <NumericTooltip value={profits} display={formatINR(profits)} />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Losses</span>
          <span className="font-semibold text-red-400 transition-all duration-300">
            <NumericTooltip value={losses} display={formatINR(losses)} />
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-2">
          <span className="text-slate-300">Net Capital Gains</span>
          <span className={`font-semibold transition-all duration-300 ${gainColor(net)}`}>
            <NumericTooltip value={net} display={formatINR(net)} />
          </span>
        </div>
      </div>
    </div>
  )
}

const GainsCard = ({ title, gains, variant }: GainsCardProps) => {
  const wrapperClass =
    variant === 'pre'
      ? 'bg-[#0f1117]'
      : 'bg-gradient-to-br from-blue-700/90 via-blue-600/85 to-indigo-700/85'

  return (
    <section className={`w-full rounded-xl p-4 text-slate-100 shadow-lg sm:p-5 ${wrapperClass}`}>
      <h2 className="mb-4 text-base font-semibold sm:text-lg">{title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Section
          label="Short-term"
          profits={gains.stcg.profits}
          losses={gains.stcg.losses}
        />
        <Section
          label="Long-term"
          profits={gains.ltcg.profits}
          losses={gains.ltcg.losses}
        />
      </div>

      <div className="mt-4 rounded-lg bg-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-200 sm:text-sm">Realised Capital Gains</span>
          <span
            className={`text-sm font-semibold transition-all duration-300 sm:text-base ${gainColor(realisedTotal(gains))}`}
          >
            <NumericTooltip
              value={realisedTotal(gains)}
              display={formatINR(realisedTotal(gains))}
            />
          </span>
        </div>
      </div>
    </section>
  )
}

export default GainsCard
