'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { CSSProperties } from 'react'

/**
 * Custom hook to get text transform styles based on the current language
 * @param englishOnly Whether to apply transform for English text only
 * @param georgianOnly Whether to apply transform for Georgian text only
 * @returns An object with style properties to apply
 */
export function useTextTransform(englishOnly = false, georgianOnly = false): CSSProperties {
  // Get the current language from the URL params
  const params = useParams()
  const lang = params?.lang || 'en'

  // Create the appropriate style object based on the language
  const textStyle = useMemo(() => {
    if (georgianOnly && lang !== 'ka') {
      return {}
    }

    if (englishOnly && lang !== 'en') {
      return {}
    }

    // Regular text-transform works well for English
    if (lang === 'en') {
      return {
        textTransform: 'uppercase' as const,
      }
    }

    // For Georgian, we need the special combination
    if (lang === 'ka') {
      return {
        textTransform: 'uppercase' as const,
        fontVariantCaps: 'all-small-caps' as const,
      }
    }

    // Default case - just use regular text-transform
    return {
      textTransform: 'uppercase' as const,
    }
  }, [lang, englishOnly, georgianOnly])

  return textStyle
}
