import { useCallback, useEffect, useRef } from 'react'
import { fetchCapitalGains, fetchHoldings } from '../api/mockApi'
import { useHarvest } from '../context/HarvestContext'

interface UseHarvestDataResult {
  reload: () => Promise<void>
}

export const useHarvestData = (): UseHarvestDataResult => {
  const { dispatch } = useHarvest()
  const hasFetched = useRef(false)

  const loadData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } })
    dispatch({ type: 'SET_ERROR', payload: { error: null } })

    try {
      const [holdings, capitalGainsResponse] = await Promise.all([
        fetchHoldings(),
        fetchCapitalGains(),
      ])
      console.log('[mockApi] holdings count:', holdings.length)
      dispatch({
        type: 'SET_DATA',
        payload: {
          holdings,
          capitalGains: capitalGainsResponse.capitalGains,
        },
      })
    } catch (err) {
      console.error('[mockApi] fetch error:', err)
      dispatch({
        type: 'SET_ERROR',
        payload: { error: 'Failed to load harvest data.' },
      })
      dispatch({ type: 'SET_LOADING', payload: { loading: false } })
    }
  }, [dispatch])

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    void loadData()
  }, [loadData])

  return { reload: loadData }
}