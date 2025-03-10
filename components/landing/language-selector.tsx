'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useLocales } from '../../lib/useLocales'
import { ChevronRight } from '@/components/icons/arrows'

// Add interface for locale type
interface Locale {
  code: string
  name: string
}

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { locales, isLoading } = useLocales()

  // Add type assertion or type guard
  const languages = (locales as Locale[]).map((locale) => ({
    code: locale.code,
    display: locale.code.toUpperCase(),
    name: locale.name,
  }))

  // Extract locale from the pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale =
    pathSegments[0] === 'ka' || pathSegments[0] === 'ru' ? pathSegments[0] : 'en'

  // Get the display name for the current language
  const selectedLanguage = languages.find((lang) => lang.code === currentLocale)?.display || 'EN'

  useEffect(() => {
    setMounted(true)

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!mounted) return null

  const handleLanguageChange = (lang: { code: string; display: string; name: string }) => {
    // Get the path without the locale prefix
    const pathWithoutLocale =
      pathSegments[0] === 'ka' || pathSegments[0] === 'ru'
        ? '/' + pathSegments.slice(1).join('/')
        : pathname

    // Navigate to the new locale path
    if (lang.code === 'en') {
      router.push(pathWithoutLocale)
    } else {
      router.push(`/${lang.code}${pathWithoutLocale}`)
    }

    setIsOpen(false)
  }

  // Show a loading state or fallback if locales are still loading
  if (isLoading || languages.length === 0) {
    return (
      <div className="relative">
        <button
          className="group flex h-[64px] w-full cursor-pointer items-center justify-between gap-2 rounded-[8px] bg-[#1A1A1A] pr-4 pl-6"
          disabled
        >
          <span className="font-justice text-base text-white opacity-50">EN</span>
        </button>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="group flex h-[64px] w-full cursor-pointer items-center justify-between gap-2 rounded-[8px] bg-[#1A1A1A] pr-4 pl-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-justice text-base text-white">{selectedLanguage}</span>
        <ChevronRight />
      </button>

      <div
        className={`font-justice absolute top-full left-0 mt-1 w-full rounded-[8px] bg-[#1A1A1A] py-2 shadow-lg transition-all duration-200 ease-in-out ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            className="font-justice w-full cursor-pointer px-6 py-2 text-left text-white hover:bg-[#333333]"
            onClick={() => handleLanguageChange(lang)}
            title={lang.name}
          >
            {lang.display}
          </button>
        ))}
      </div>
    </div>
  )
}
