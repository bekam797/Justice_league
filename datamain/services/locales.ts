import { getStrapiURL } from '../../lib/utils'
import { getCachedLocales, setCachedLocales } from '../../lib/cache'

export interface StrapiLocale {
  id: number
  name: string
  code: string
  isDefault: boolean
}

// Use a static variable to track if we've already logged
let hasLogged = false

export async function getAvailableLocales(): Promise<StrapiLocale[]> {
  // Check cache first
  const cached = getCachedLocales()
  if (cached) {
    return cached
  }

  if (!hasLogged) {
    hasLogged = true
  }

  try {
    const baseUrl = getStrapiURL()
    const url = new URL('/api/i18n/locales', baseUrl)

    const response = await fetch(url.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch locales: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      return []
    }

    // Cache the result before returning
    if (Array.isArray(data)) {
      setCachedLocales(data)
    }

    return data
  } catch (error) {
    if (!hasLogged) {
      console.error('Error fetching locales:', error)
    }
    return []
  }
}
