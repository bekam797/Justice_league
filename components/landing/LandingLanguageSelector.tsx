'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLocales } from '../../lib/useLocales'

interface Locale {
  code: string
  name: string
}

export function LandingLanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { locales, isLoading } = useLocales()

  // Format locales for our component with type assertion
  const languages = (locales as Locale[]).map((locale) => ({
    code: locale.code,
    label: locale.code.toUpperCase(),
    name: locale.name,
  }))

  // Extract locale from the pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale =
    pathSegments[0] === 'ka' || pathSegments[0] === 'ru' ? pathSegments[0] : 'en'

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading || languages.length === 0) {
    // Return an empty placeholder with the same dimensions to prevent layout shift
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-8 space-x-4"
      />
    )
  }

  const handleLanguageChange = (langCode: string) => {
    // Get the path without the locale prefix
    const pathWithoutLocale =
      pathSegments[0] === 'ka' || pathSegments[0] === 'ru'
        ? '/' + pathSegments.slice(1).join('/')
        : pathname

    // Navigate to the new locale path
    if (langCode === 'en') {
      router.push(pathWithoutLocale)
    } else {
      router.push(`/${langCode}${pathWithoutLocale}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed bottom-8 space-x-4"
    >
      {languages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          <button
            className={`font-justice cursor-pointer text-sm transition-opacity hover:opacity-100 ${
              currentLocale === lang.code ? 'opacity-100' : 'opacity-60'
            }`}
            onClick={() => handleLanguageChange(lang.code)}
            title={lang.name}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="font-justice text-sm opacity-60">✶</span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  )
}
