export interface Holding {
  coin: string
  coinName: string
  logo: string
  currentPrice: number
  totalHolding: number
  averageBuyPrice: number
  stcg: {
    balance: number
    gain: number
  }
  ltcg: {
    balance: number
    gain: number
  }
}

export interface GainsBucket {
  profits: number
  losses: number
}

export interface CapitalGains {
  stcg: GainsBucket
  ltcg: GainsBucket
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains
}
