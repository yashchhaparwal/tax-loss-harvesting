import { describe, expect, it } from '@jest/globals'
import { deriveCapitalGains } from './useCapitalGains'
import type { CapitalGains, Holding } from '../types'

describe('deriveCapitalGains', () => {
  it('keeps after gains equal to pre gains when nothing is selected', () => {
    const capitalGains: CapitalGains = {
      stcg: { profits: 1000, losses: 200 },
      ltcg: { profits: 500, losses: 100 },
    }

    const holdings: Holding[] = [
      {
        coin: 'BTC',
        coinName: 'Bitcoin',
        logo: '',
        currentPrice: 6500000,
        totalHolding: 0.15,
        averageBuyPrice: 4500000,
        stcg: { balance: 0.08, gain: 1200 },
        ltcg: { balance: 0.07, gain: -300 },
      },
    ]

    const selectedCoins = new Set<string>()
    const result = deriveCapitalGains(capitalGains, holdings, selectedCoins)

    expect(result.preGains).toEqual(result.afterGains)
    expect(result.savedAmount).toBe(0)
    expect(result.preGains).not.toBe(result.afterGains)
  })
})
