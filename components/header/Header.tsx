'use client'

import { useEffect, useState } from 'react'
import LocalizedLink from '@/components/LocalizedLink'
import AnimatedMenu from '@/components/header/animated-menu'
import { motion } from 'framer-motion'
import { JusticeLogo } from '@/components/header/justice-logo'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    // Check initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full`}>
      <div className="flex items-center justify-between p-3 lg:p-6">
        <LocalizedLink href="/" className="relative z-30 h-14 w-24 lg:h-16 lg:w-[114px]">
          <motion.div
            animate={{ opacity: scrolled ? 0.2 : 1 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <JusticeLogo className="h-full w-full" />
          </motion.div>
        </LocalizedLink>

        <div className="flex items-center gap-1">
          <AnimatedMenu />
        </div>
      </div>
    </header>
  )
}
