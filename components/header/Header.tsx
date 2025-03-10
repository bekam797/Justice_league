'use client'

import { JusticeLogo } from '@/components/header/justice-logo'
import { MenuIcon } from '@/components/icons/arrows'
import { useEffect, useState } from 'react'
import { LanguageSelector } from '@/components/landing/language-selector'
import LocalizedLink from '@/components/LocalizedLink'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full`}>
      <div className="flex items-center justify-between p-6">
        <LocalizedLink href="/" className="relative h-16 w-[114px]">
          <JusticeLogo isScrolled={scrolled} />
        </LocalizedLink>

        <div className="flex items-center gap-1">
          <LanguageSelector />
          <button className="flex h-[64px] cursor-pointer items-center justify-between gap-2 rounded-[8px] bg-[#3c380d] px-6">
            <span className="font-justice text-base text-white">Menu</span>
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
