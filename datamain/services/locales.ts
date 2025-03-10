import axios from 'axios'
import { getStrapiURL } from '../../lib/utils'

export interface StrapiLocale {
  id: number
  name: string
  code: string
  isDefault: boolean
}

export async function getAvailableLocales(): Promise<StrapiLocale[]> {
  try {
    const baseUrl = getStrapiURL()
    const url = new URL('/api/i18n/locales', baseUrl).href

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status !== 200) {
      throw new Error(`Failed to fetch locales: ${response.status}`)
    }

    if (!Array.isArray(response.data)) {
      console.warn('Locales data is not an array:', response.data)
      return []
    }

    return response.data
  } catch (error) {
    console.error('Error fetching locales:', error)
    return []
  }
}
