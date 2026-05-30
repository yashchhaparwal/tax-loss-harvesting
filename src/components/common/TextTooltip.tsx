interface TextTooltipProps {
  label: string
  tip: string
}

const TextTooltip = ({ label, tip }: TextTooltipProps) => {
  return (
    <span className="inline-flex items-center gap-1">
      <span>{label}</span>
      <span className="group relative inline-flex">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 text-[10px] font-semibold text-slate-300">
          ?
        </span>
        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 w-max max-w-[200px] -translate-x-1/2 whitespace-normal rounded-full bg-slate-900 px-2 py-1 text-xs normal-case text-slate-100 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
          {tip}
        </span>
      </span>
    </span>
  )
}

export default TextTooltip
