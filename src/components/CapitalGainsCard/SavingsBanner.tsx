import { useEffect, useState } from 'react'
import { formatINR } from '../../utils/formatters'

interface SavingsBannerProps {
  savedAmount: number
}

const SavingsBanner = ({ savedAmount }: SavingsBannerProps) => {
  const [isVisible, setIsVisible] = useState(savedAmount > 0)

  useEffect(() => {
    setIsVisible(savedAmount > 0)
  }, [savedAmount])

  return (
    <div
      className={`mt-4 overflow-hidden rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-emerald-200 transition-all duration-300 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-2 pointer-events-none max-h-0 border-transparent py-0 opacity-0'
      }`}
    >
      <p className="text-sm font-medium sm:text-base">
        🎉 You&apos;re going to save {formatINR(savedAmount)}
      </p>
    </div>
  )
}

export default SavingsBanner
