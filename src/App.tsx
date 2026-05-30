import { useEffect, useState } from 'react'
import GainsCard from './components/CapitalGainsCard/GainsCard'
import SavingsBanner from './components/CapitalGainsCard/SavingsBanner'
import HoldingsTable from './components/HoldingsTable/HoldingsTable'
import HowItWorks from './components/HowItWorks/HowItWorks'
import ErrorState from './components/common/ErrorState'
import { HarvestProvider, useHarvest } from './context/HarvestContext'
import { useCapitalGains } from './hooks/useCapitalGains'
import { useHarvestData } from './hooks/useHarvestData'

const GainsCardSkeleton = () => (
  <div className="w-full animate-pulse rounded-xl bg-slate-800/80 p-4 sm:p-5">
    <div className="mb-4 h-5 w-40 rounded bg-slate-700" />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-lg bg-slate-900/50 p-4">
        <div className="mb-3 h-4 w-24 rounded bg-slate-700" />
        <div className="space-y-2">
          <div className="h-3 rounded bg-slate-700" />
          <div className="h-3 rounded bg-slate-700" />
          <div className="h-3 rounded bg-slate-700" />
        </div>
      </div>
      <div className="rounded-lg bg-slate-900/50 p-4">
        <div className="mb-3 h-4 w-24 rounded bg-slate-700" />
        <div className="space-y-2">
          <div className="h-3 rounded bg-slate-700" />
          <div className="h-3 rounded bg-slate-700" />
          <div className="h-3 rounded bg-slate-700" />
        </div>
      </div>
    </div>
    <div className="mt-4 h-10 rounded bg-slate-700" />
  </div>
)

const DashboardView = () => {
  const { reload } = useHarvestData()
  const [activeTab, setActiveTab] = useState<'pre' | 'after'>('pre')
  const [showHowItWorks, setShowHowItWorks] = useState(true)

  const {
    state: { loading, error },
  } = useHarvest()
  const { preGains, afterGains, savedAmount } = useCapitalGains()

  const handleHowItWorksClick = () => {
    setShowHowItWorks((prev) => {
      const next = !prev
      if (next) {
        setTimeout(() => {
          const panel = document.getElementById('how-it-works-panel')
          panel?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 0)
      }
      return next
    })
  }

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#how-it-works') {
        handleHowItWorksClick()
      }
    }
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <>
      <header className="mb-4">
        <h1 className="text-xl font-semibold text-slate-100 sm:text-2xl">Tax Loss Harvesting</h1>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          Optimise your tax liability by harvesting losses from your portfolio
        </p>
        <a
          href="#how-it-works"
          onClick={(event) => {
            event.preventDefault()
            handleHowItWorksClick()
          }}
          className="mt-2 inline-block text-xs font-medium text-blue-300 transition hover:text-blue-200 sm:text-sm"
        >
          How it works ▼
        </a>
      </header>

      {showHowItWorks ? <HowItWorks /> : null}

      {loading ? (
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <GainsCardSkeleton />
          <GainsCardSkeleton />
        </div>
      ) : error ? (
        <ErrorState message="Failed to load data" onRetry={reload} />
      ) : preGains && afterGains ? (
        <>
          <div className="mb-2 flex items-center gap-6 border-b border-white/10 md:hidden">
            <button
              type="button"
              onClick={() => setActiveTab('pre')}
              className={`pb-2 text-sm font-medium transition ${
                activeTab === 'pre'
                  ? 'border-b-2 border-blue-400 text-blue-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pre Harvesting
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('after')}
              className={`pb-2 text-sm font-medium transition ${
                activeTab === 'after'
                  ? 'border-b-2 border-blue-400 text-blue-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              After Harvesting
            </button>
          </div>

          <div className="hidden w-full gap-4 md:flex">
            <GainsCard title="Pre Harvesting" gains={preGains} variant="pre" />
            <GainsCard title="After Harvesting" gains={afterGains} variant="after" />
          </div>
          <div className="w-full md:hidden">
            {activeTab === 'pre' ? (
              <GainsCard title="Pre Harvesting" gains={preGains} variant="pre" />
            ) : (
              <GainsCard title="After Harvesting" gains={afterGains} variant="after" />
            )}
          </div>
          <SavingsBanner savedAmount={savedAmount} />
        </>
      ) : (
        <ErrorState message="Failed to load data" onRetry={reload} />
      )}

      <HoldingsTable onRetry={reload} />
    </>
  )
}

function App() {
  return (
    <HarvestProvider>
      <main className="min-h-screen bg-slate-950 p-6 text-slate-100 sm:p-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col">
          <DashboardView />
        </div>
      </main>
    </HarvestProvider>
  )
}

export default App
