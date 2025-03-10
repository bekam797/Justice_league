'use client'

import { motion } from 'framer-motion'
import { JusticeLogo } from './svgs/justice-logo'
import { LeagueLogo } from './svgs/league-logo'
import { MenuItem } from './menu-item'
import { useEffect, useState } from 'react'

export default function MenuContent({ menuItems }) {
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

  // Ensure menuItems is an array before mapping
  const menuItemsArray = Array.isArray(menuItems) ? menuItems : []

  return (
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
          {menuItemsArray.map((item, index) => (
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
  )
}
