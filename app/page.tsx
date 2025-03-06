'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { JusticeLogo } from '@/components/landing/svgs/justice-logo'
import { MenuItem } from '@/components/landing/menu-item'
import { LeagueLogo } from '@/components/landing/svgs/league-logo'

const menuItems = [
  { id: 1, label: 'SERVICES', number: '01' },
  { id: 2, label: 'ABOUT US', number: '02' },
  { id: 3, label: 'CLIENTS', number: '03' },
  { id: 4, label: 'TEAM', number: '04' },
  { id: 5, label: 'CONTACT', number: '05' },
  { id: 6, label: 'BLOG', number: '06' },
]

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Calculate viewport size variables
    const updateViewportSize = () => {
      if (typeof window === 'undefined') return

      const vw = window.innerWidth / 1920
      const vh = window.innerHeight / 1080
      document.documentElement.style.setProperty('--vw', vw.toString())
      document.documentElement.style.setProperty('--vh', vh.toString())
    }

    updateViewportSize()
    window.addEventListener('resize', updateViewportSize)

    const timer = setTimeout(() => {
      setShowMenu(true)
    }, 3000)

    return () => {
      window.removeEventListener('resize', updateViewportSize)
      clearTimeout(timer)
    }
  }, [])

  if (!isMounted) return null

  const transition = {
    duration: 0.7,
    ease: [0.8, 0.01, 0.22, 1],
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <div className="fixed inset-0 flex flex-col items-center justify-center">
            {/* JUSTICE Logo */}
            <motion.div
              className="flex w-full justify-center"
              style={{
                maxWidth: showMenu ? 'clamp(200px, 40vw, 613px)' : 'clamp(150px, 20vw, 306px)',
              }}
              animate={{
                y: showMenu ? -8 : 0,
                maxWidth: showMenu ? 'clamp(200px, 40vw, 613px)' : 'clamp(150px, 20vw, 306px)',
              }}
              transition={transition}
            >
              <JusticeLogo />
            </motion.div>

            {/* Menu Container */}
            <motion.div
              className="relative w-full max-w-[618px] overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: showMenu ? 'auto' : 0 }}
              transition={transition}
            >
              <motion.div
                className="flex flex-col gap-[4px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: showMenu ? 1 : 0 }}
                transition={{ ...transition, delay: 0.25 }}
              >
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={item.id}
                    {...item}
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                    isHovered={hoveredItem === item.id}
                    isAnyHovered={hoveredItem !== null}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* LEAGUE Logo */}
            <motion.div
              className="flex w-full justify-center"
              style={{
                maxWidth: showMenu ? 'clamp(200px, 40vw, 613px)' : 'clamp(150px, 20vw, 306px)',
              }}
              animate={{
                y: showMenu ? 8 : 0,
                maxWidth: showMenu ? 'clamp(200px, 40vw, 613px)' : 'clamp(150px, 20vw, 306px)',
              }}
              transition={transition}
            >
              <LeagueLogo />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
