'use client'

import { ChevronRight } from '@/components/icons/arrows'
import { useState, useRef, useEffect } from 'react'

const languages = ['EN', 'ES', 'FR', 'DE']

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
        className={`absolute top-full left-0 mt-1 w-full rounded-[8px] bg-[#1A1A1A] py-2 shadow-lg transition-all duration-200 ease-in-out ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'} `}
      >
        {languages.map((lang) => (
          <button
            key={lang}
            className="w-full cursor-pointer px-6 py-2 text-left text-white hover:bg-[#333333]"
            onClick={() => {
              setSelectedLanguage(lang)
              setIsOpen(false)
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  )
}
