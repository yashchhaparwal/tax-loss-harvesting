import { useMemo } from 'react'
import { getHoldingKey, useHarvest } from '../context/HarvestContext'
import type { CapitalGains, Holding } from '../types'

interface UseCapitalGainsResult {
  preGains: CapitalGains | null
  afterGains: CapitalGains | null
  savedAmount: number
}

const cloneGains = (gains: CapitalGains): CapitalGains => ({
  stcg: { ...gains.stcg },
  ltcg: { ...gains.ltcg },
})

const applyHolding = (gains: CapitalGains, holding: Holding) => {
  if (holding.stcg.gain > 0) {
    gains.stcg.profits += holding.stcg.gain
  } else if (holding.stcg.gain < 0) {
    gains.stcg.losses += Math.abs(holding.stcg.gain)
  }

  if (holding.ltcg.gain > 0) {
    gains.ltcg.profits += holding.ltcg.gain
  } else if (holding.ltcg.gain < 0) {
    gains.ltcg.losses += Math.abs(holding.ltcg.gain)
  }
}

const realisedTotal = (gains: CapitalGains): number =>
  gains.stcg.profits - gains.stcg.losses + (gains.ltcg.profits - gains.ltcg.losses)

export const deriveCapitalGains = (
  capitalGains: CapitalGains,
  holdings: Holding[],
  selectedCoins: Set<string>,
): UseCapitalGainsResult => {
  const preGains = cloneGains(capitalGains)

  if (selectedCoins.size === 0) {
    return { preGains, afterGains: cloneGains(capitalGains), savedAmount: 0 }
  }

  const afterGains = cloneGains(capitalGains)
  holdings.forEach((holding) => {
    if (selectedCoins.has(getHoldingKey(holding))) {
      applyHolding(afterGains, holding)
    }
  })

  const savedAmount = Math.max(0, realisedTotal(preGains) - realisedTotal(afterGains))
  return { preGains, afterGains, savedAmount }
}

export const useCapitalGains = (): UseCapitalGainsResult => {
  const {
    state: { capitalGains, selectedCoins, holdings },
  } = useHarvest()

  return useMemo(() => {
    if (!capitalGains) return { preGains: null, afterGains: null, savedAmount: 0 }
    return deriveCapitalGains(capitalGains, holdings, selectedCoins)
  }, [capitalGains, holdings, selectedCoins])
}