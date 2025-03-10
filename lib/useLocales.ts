// lib/useLocales.ts
'use client'

import { useState, useEffect } from 'react'
import { getAvailableLocales, StrapiLocale } from 'datamain/services/locales' // Import StrapiLocale

export function useLocales() {
  const [locales, setLocales] = useState<StrapiLocale[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchLocales() {
      try {
        const availableLocales = await getAvailableLocales()
        if (availableLocales && Array.isArray(availableLocales)) {
          setLocales(availableLocales)
        } else {
          console.warn('No locales fetched or invalid locale data.')
          setError(new Error('Failed to load locales'))
        }
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
