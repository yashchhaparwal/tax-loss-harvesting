import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import type { CapitalGains, Holding } from '../types'

export interface HarvestState {
  holdings: Holding[]
  capitalGains: CapitalGains | null
  selectedCoins: Set<string>
  loading: boolean
  error: string | null
}

type SetDataPayload = {
  holdings: Holding[]
  capitalGains: CapitalGains
}

type HarvestAction =
  | { type: 'SET_DATA'; payload: SetDataPayload }
  | { type: 'TOGGLE_COIN'; payload: { coinKey: string } }
  | { type: 'SELECT_ALL' }
  | { type: 'DESELECT_ALL' }
  | { type: 'SET_ERROR'; payload: { error: string | null } }
  | { type: 'SET_LOADING'; payload: { loading: boolean } }

interface HarvestContextValue {
  state: HarvestState
  dispatch: Dispatch<HarvestAction>
}

const initialState: HarvestState = {
  holdings: [],
  capitalGains: null,
  selectedCoins: new Set(),
  loading: true,
  error: null,
}

export const getHoldingKey = (holding: Holding): string =>
  `${holding.coin}-${holding.coinName}`

const harvestReducer = (
  state: HarvestState,
  action: HarvestAction,
): HarvestState => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        holdings: action.payload.holdings,
        capitalGains: action.payload.capitalGains,
        loading: false,
        error: null,
      }
    case 'TOGGLE_COIN': {
      const nextSelected = new Set(state.selectedCoins)
      if (nextSelected.has(action.payload.coinKey)) {
        nextSelected.delete(action.payload.coinKey)
      } else {
        nextSelected.add(action.payload.coinKey)
      }
      return { ...state, selectedCoins: nextSelected }
    }
    case 'SELECT_ALL':
      return {
        ...state,
        selectedCoins: new Set(state.holdings.map(getHoldingKey)),
      }
    case 'DESELECT_ALL':
      return { ...state, selectedCoins: new Set() }
    case 'SET_ERROR':
      return { ...state, error: action.payload.error }
    case 'SET_LOADING':
      return { ...state, loading: action.payload.loading }
    default:
      return state
  }
}

const HarvestContext = createContext<HarvestContextValue | undefined>(undefined)

export const HarvestProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(harvestReducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return <HarvestContext.Provider value={value}>{children}</HarvestContext.Provider>
}

export const useHarvest = (): HarvestContextValue => {
  const context = useContext(HarvestContext)
  if (!context) {
    throw new Error('useHarvest must be used within a HarvestProvider')
  }
  return context
}