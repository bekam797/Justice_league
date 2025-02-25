'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface MenuItemProps {
  id: number
  label: string
  number: string
  hoveredItem: number | null
  setHoveredItem: (id: number | null) => void
  isHovered: boolean
  isAnyHovered: boolean
}

export function MenuItem({
  id,
  label,
  number,
  setHoveredItem,
  isHovered,
  isAnyHovered,
}: MenuItemProps) {
  return (
    <motion.div onHoverStart={() => setHoveredItem(id)} onHoverEnd={() => setHoveredItem(null)}>
      <Link href={`/${label.toLowerCase().replace(' ', '-')}`} className="block bg-[#3c380d]">
        <motion.div
          className="relative flex w-full items-center overflow-hidden"
          animate={{
            height: isHovered
              ? 'clamp(160px, calc(240 * var(--vh, 1) * 1px), 240px)'
              : isAnyHovered
                ? 'clamp(32px, calc(48 * var(--vh, 1) * 1px), 48px)'
                : 'clamp(48px, calc(72 * var(--vh, 1) * 1px), 72px)',
          }}
          transition={{
            height: { type: 'spring', stiffness: 300, damping: 30 },
          }}
        >
          {/* Label */}
          <motion.div
            className="absolute inset-0 flex items-center"
            initial={false}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="font-justice pl-[24px] whitespace-nowrap"
              animate={{
                fontSize: isHovered
                  ? 'clamp(72px, calc(146 * var(--vw, 1) * 1px), 146px)'
                  : isAnyHovered
                    ? 'clamp(16px, calc(24 * var(--vw, 1) * 1px), 24px)'
                    : 'clamp(18px, calc(32 * var(--vw, 1) * 1px), 32px)',
              }}
              style={{
                lineHeight: '1',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {label}
            </motion.span>
          </motion.div>

          {/* Number */}
          <motion.span
            className="font-justice absolute right-[24px] opacity-20"
            animate={{
              fontSize: 'clamp(18px, calc(32 * var(--vw, 1) * 1px), 32px)',
              top: isHovered ? '24px' : '50%',
              y: isHovered ? 0 : '-50%',
            }}
            style={{
              lineHeight: '1',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {number}
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  )
}
