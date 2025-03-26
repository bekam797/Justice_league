'use client'

import { getTranslations } from 'datamain/loaders'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type TranslationValue = string | { [key: string]: TranslationValue }
type TranslationsType = { [key: string]: TranslationValue }

interface TranslationContextType {
  t: (key: string, defaultValue?: string) => string
  isLoading: boolean
  locale: string
  setLocale: (locale: string) => void
}

const TranslationContext = createContext<TranslationContextType>({
  t: (key, defaultValue) => defaultValue || key,
  isLoading: true,
  locale: 'en',
  setLocale: () => {},
})

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const params = useParams()
  // Extract lang from params, or use 'en' as fallback
  const paramLang = params?.lang
    ? Array.isArray(params.lang)
      ? params.lang[0]
      : params.lang
    : 'en'

  const [translations, setTranslations] = useState<TranslationsType>({})
  const [isLoading, setIsLoading] = useState(true)
  const [locale, setLocale] = useState(paramLang)

  // Update locale when params.lang changes
  useEffect(() => {
    if (paramLang) {
      setLocale(paramLang)
    }
  }, [paramLang])

  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true)
      try {
        const response = await getTranslations(locale)

        // Check if translations is already an object or needs parsing
        let translationsData
        if (typeof response.data.translations === 'string') {
          // It's a string, so parse it
          translationsData = JSON.parse(response.data.translations || '{}')
        } else {
          // It's already an object, use it directly
          translationsData = response.data.translations || {}
        }

        setTranslations(translationsData)
      } catch (error) {
        setTranslations({})
      } finally {
        setIsLoading(false)
      }
    }

    if (locale) {
      loadTranslations()
    }
  }, [locale])

  // Translation function that handles nested paths like "common.menu"
  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split('.')
    let current: TranslationValue = translations

    // Navigate through the nested object
    for (const k of keys) {
      if (current === undefined || typeof current === 'string' || !(k in current)) {
        return defaultValue || key
      }
      current = (current as Record<string, TranslationValue>)[k]
    }

    return typeof current === 'string' ? current : defaultValue || key
  }

  return (
    <TranslationContext.Provider value={{ t, isLoading, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => useContext(TranslationContext)
