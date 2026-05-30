import { useState } from 'react'

const HowItWorks = () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <section
      id="how-it-works-panel"
      className="mb-5 rounded-xl border border-white/10 bg-slate-900/60 p-4 text-slate-300 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
          <span className="mr-2">ℹ️</span>
          How does Tax Loss Harvesting work?
        </h2>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-xs font-medium text-blue-300 transition hover:text-blue-200 sm:text-sm"
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {expanded ? (
        <div className="mt-3 space-y-3 text-xs leading-6 text-slate-300 sm:text-sm">
          <p>
            Tax loss harvesting is a strategy to reduce your tax liability by selling assets at a
            loss to offset capital gains realized elsewhere in your portfolio.
          </p>
          <p>
            In practical terms, investors identify underperforming positions and realize those
            losses before the end of the tax period, while preserving long-term allocation goals.
          </p>
          <p>
            This dashboard compares pre-harvest and after-harvest outcomes so you can estimate how
            much net taxable gain may be reduced after selected sales.
          </p>
          <p>
            Actual impact depends on tax rules, holding periods, and replacement-asset strategy,
            so use this as a planning aid rather than final tax advice.
          </p>

          <div>
            <h3 className="mb-1 text-sm font-semibold text-slate-100">Important Notes</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Short-term and long-term gains are calculated separately.</li>
              <li>Selection changes update estimated savings in real time.</li>
              <li>Always verify constraints like wash-sale or jurisdiction-specific rules.</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-1 text-sm font-semibold text-slate-100">Disclaimer</h3>
            <p>
              This module is for informational purposes only and should not be treated as tax,
              legal, or investment advice. Consult a qualified professional before execution.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default HowItWorks
