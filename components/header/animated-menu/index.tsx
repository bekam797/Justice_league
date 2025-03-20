'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageSelector } from '@/components/landing/language-selector'
import { getMenuItemData } from 'datamain/loaders'
import { useParams } from 'next/navigation'

// Define interface for menu items
interface Localization {
  Label?: string
  Url?: string
  language?: string
  [key: string]: unknown
}

interface MenuItem {
  id?: number | string
  documentId?: string
  Label?: string
  Url?: string
  Order?: number
  Number_label?: string
  localizations?: Localization[]
  // Add other specific properties as needed
}

// Custom hook for responsive design
function useResponsive() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Check initial size
    setIsDesktop(window.innerWidth >= 1024)

    // Update on resize
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isDesktop }
}

// Animation variants
const perspective = {
  initial: {
    opacity: 0,
    x: 50, // Start from right
    rotateX: 90,
    translateY: 0,
  },
  enter: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateX: 0,
    translateY: 0,
    transition: {
      duration: 0.65,
      delay: 0.3 + i * 0.1, // Start earlier, when menu is about 40% open
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    x: 50, // Exit to right
    transition: {
      duration: 0.3,
      type: 'linear',
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

const slideIn = {
  initial: {
    opacity: 0,
    x: 50, // Start from right
  },
  enter: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.6 + i * 0.1, // Start after main links but still earlier
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    x: 50, // Exit to right
    transition: {
      duration: 0.3,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
}

const footerLinks = [
  { title: 'Facebook', href: '/' },
  { title: 'LinkedIn', href: '/' },
  { title: 'Instagram', href: '/' },
  { title: 'Twitter', href: '/' },
]

export default function AnimatedMenu() {
  const [isActive, setIsActive] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const { isDesktop } = useResponsive()

  // Animation variants with responsive values
  const menuVariants = {
    open: {
      width: '320px',
      height: '650px',
      top: '-18px',
      right: '-18px',
      transition: {
        duration: 0.75,
        type: 'tween',
        ease: [0.76, 0, 0.24, 1],
      },
    },
    closed: {
      width: '100px',
      height: '40px',
      top: isDesktop ? 0 : '-12px',
      right: isDesktop ? 0 : '-12px',
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: 'tween',
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  // Get the language from URL params
  const lang = typeof params?.lang === 'string' ? params.lang : 'en'

  // Fetch menu items when component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getMenuItemData(lang)
        // Make sure we have an array of menu items
        const items = Array.isArray(response.data) ? response.data : []

        if (items.length === 0) {
          setMenuItems([])
        } else {
          setMenuItems(items)
        }
      } catch (error) {
        console.error('AnimatedMenu - Error fetching menu items:', error)
      }
    }

    fetchMenuItems()
  }, [lang])

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isActive &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive])

  return (
    <div className="fixed top-6 right-6">
      {/* Menu Container */}
      <motion.div
        ref={menuRef}
        className="relative z-20 overflow-hidden rounded-lg bg-[#1a1a1a]"
        variants={menuVariants}
        animate={isActive ? 'open' : 'closed'}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && (
            <div className="box-border flex h-full flex-col justify-between p-6 pt-24">
              {/* Menu Links */}
              <div className="flex flex-col gap-2.5">
                {menuItems.length > 0 ? (
                  menuItems.map((item, i) => {
                    // Using the correct property names from the actual data
                    const title = item.Label || ''
                    const href = item.Url ? `/${item.Url}` : '/'
                    const numberLabel = item.Number_label || ''

                    return (
                      <div
                        key={`link_${i}`}
                        className="overflow-hidden perspective-[120px] perspective-origin-bottom"
                      >
                        <motion.div
                          custom={i}
                          variants={perspective}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                        >
                          <a
                            href={href}
                            className="font-helvetica flex items-center gap-2 text-3xl text-white uppercase no-underline transition-opacity hover:opacity-70"
                          >
                            {numberLabel && (
                              <span className="text-sm opacity-70">{numberLabel}</span>
                            )}
                            {title}
                          </a>
                        </motion.div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-white/70">Loading menu items...</div>
                )}
              </div>

              {/* Footer Links */}
              <div className="flex flex-wrap">
                {footerLinks.map((link, i) => {
                  const { title, href } = link
                  return (
                    <motion.a
                      variants={slideIn}
                      custom={i}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      key={`footer_${i}`}
                      href={href}
                      className="font-helvetica mt-1.5 w-1/2 text-white no-underline transition-opacity hover:opacity-70"
                    >
                      {title}
                    </motion.a>
                  )
                })}
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Button Container */}
      <div ref={buttonRef} className="absolute top-[-12px] right-[-12px] lg:top-0 lg:right-0">
        <div className="flex items-center gap-1">
          <LanguageSelector />

          {/* Menu Button with SUPER SIMPLE Hover Effect */}
          <button
            className="z-30 flex h-14 cursor-pointer items-center justify-between gap-2 rounded-[8px] border-none bg-[#1a1a1a] px-4 lg:h-[64px] lg:px-6"
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu()
              }
            }}
            aria-expanded={isActive}
            aria-label={isActive ? 'Close menu' : 'Open menu'}
          >
            {/* Text with Simple Hover Effect */}
            <div className="font-justice text-base">
              <div className="text-white uppercase transition-opacity duration-300 hover:opacity-70">
                {isActive ? 'Close' : 'Menu'}
              </div>
            </div>

            {/* Burger Icon */}
            <div className="relative flex h-6 w-6 items-center justify-center">
              <motion.div
                className="absolute h-[1px] w-full bg-white"
                animate={{
                  rotate: isActive ? 45 : 0,
                  translateY: isActive ? 0 : -6,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
              <motion.div
                className="absolute h-[1px] w-full bg-white"
                animate={{
                  opacity: isActive ? 0 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
              <motion.div
                className="absolute h-[1px] w-full bg-white"
                animate={{
                  rotate: isActive ? -45 : 0,
                  translateY: isActive ? 0 : 6,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
