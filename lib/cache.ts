import { StrapiLocale } from 'datamain/services/locales'

// Simple cache for API responses
let localesCache: StrapiLocale[] | null = null
let lastFetchTime = 0
const CACHE_TTL = 60 * 1000 // 1 minute

export function getCachedLocales(): StrapiLocale[] | null {
  const now = Date.now()
  if (localesCache && now - lastFetchTime < CACHE_TTL) {
    return localesCache
  }
  return null
}

export function setCachedLocales(locales: StrapiLocale[]): void {
  localesCache = locales
  lastFetchTime = Date.now()
}
