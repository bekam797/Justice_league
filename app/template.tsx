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

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (pathname === '/') {
      setIsLoading(false)
      setShowContent(true)
      return
    }

    setIsLoading(true)
    setShowContent(false)

    const timer = setTimeout(() => {
      setIsLoading(false)
      setShowContent(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname, mounted])

  if (pathname === '/') return <>{children}</>

  return (
    <div>
      <AnimatePresence mode="popLayout">
        {showContent && (
          <motion.div
            key={pathname}
            initial="initial"
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
