interface NumericTooltipProps {
  value: number
  display: string
  className?: string
}

const NumericTooltip = ({ value, display, className = '' }: NumericTooltipProps) => {
  const rawValue = value.toPrecision(10)

  return (
    <span className={`group relative inline-flex ${className}`} title={String(value)}>
      <span>{display}</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-2 py-1 text-xs text-slate-100 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        {rawValue}
      </span>
    </span>
  )
}

export default NumericTooltip
