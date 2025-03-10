import { useState, useEffect } from 'react'
import { getAvailableLocales } from 'datamain/services/locales'

interface StrapiLocale {
  code: string
  name: string
}

export function useLocales() {
  const [locales, setLocales] = useState<StrapiLocale[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchLocales() {
      try {
        const availableLocales = await getAvailableLocales()
        setLocales(availableLocales)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocales()
  }, [])

  return { locales, isLoading, error }
}
