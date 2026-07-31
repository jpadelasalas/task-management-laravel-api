import { useCallback, useEffect, useState } from 'react'

/**
 * Fetch-on-mount wrapper shared by every feature's list/detail hooks so
 * loading/error/data state isn't reimplemented per feature.
 */
export function useApi(requestFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await requestFn()
      setData(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    refetch()
  }, [refetch])

  return { data, loading, error, refetch }
}
