'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { DynamicHeader } from '@/components/header/DynamicHeader'
import { DynamicFooter } from '@/components/footer/DynamicFooter'

const contentVariants = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: '0%' },
  exit: { opacity: 0, y: '0%' },
}

const transition = {
  duration: 0.5,
  ease: [0.88, 0, 0.15, 1],
}

// Track initial load with a module-level variable that persists between renders
// but is reset on page refresh
let hasCompletedInitialLoad = false

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // For first-time page load, always show animation
    if (!hasCompletedInitialLoad) {
      setIsLoading(true)
      setShowContent(false)

      // Set a timer to finish the animation
      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
        // Mark that we've completed the initial load
        hasCompletedInitialLoad = true
      }, 800)

      return () => clearTimeout(timer)
    }
    // For home page, skip animation and template
    else if (pathname === '/') {
      setIsLoading(false)
      setShowContent(true)
    }
    // For team page after initial load, skip animation but show template
    else if (pathname.includes('/team') || pathname.includes('/services')) {
      setIsLoading(false)
      setShowContent(true)
    }
    // For other pages after initial load, show animation
    else {
      setIsLoading(true)
      setShowContent(false)

      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Skip template for home page
  if (pathname === '/' && !isLoading) {
    return <>{children}</>
  }

  // For team pages after initial load completed, use simpler template
  if (
    (pathname.includes('/team') || pathname.includes('/services')) &&
    hasCompletedInitialLoad &&
    !isLoading
  ) {
    return (
      <>
        <DynamicHeader />
        {children}
        <DynamicFooter />
      </>
    )
  }

  // For all other cases, use animated template
  return (
    <div>
      <AnimatePresence mode="popLayout">
        {showContent && (
          <motion.div
            key={pathname}
            initial={false}
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={transition}
          >
            <DynamicHeader />
            {children}
            <DynamicFooter />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={transition}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0b]"
          >
            <span className="font-justice flex items-end gap-0.5 text-2xl leading-[100%] text-white/50">
              Loading
              <div className="loader"></div>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
