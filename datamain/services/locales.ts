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
      timeout: 5000,
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
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching locales:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
      })
    } else {
      console.error('Unexpected error fetching locales:', error)
    }
    return []
  }
}
