'use client'

import SectionBadge from '@/components/common/SectionBadge'
import SectionTitle from '@/components/common/SectionTitle'
import { ArrowCoolDownIcon } from '@/components/icons/arrows'
import { Briefcase } from '@/components/icons/BriefCase'
import { motion, useTransform, useSpring, useScroll } from 'framer-motion'
import { useEffect, useState, useRef, ReactNode } from 'react'

interface HeroWithAnimationProps {
  badgeTitle?: string
  sectionTitle?: string
  backgroundSvg?: ReactNode
  svgSize?: { width: number; height: number }
}

export default function HeroWithAnimation({
  badgeTitle = '',
  sectionTitle,
  backgroundSvg = <Briefcase className="h-full w-full" />,
  svgSize = { width: 800, height: 800 }, // Default size that won't scale with viewport
}: HeroWithAnimationProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight)
    }
  }, [])

  const smoothScrollY = useSpring(scrollY, { damping: 15, stiffness: 100 })

  const contentY = useTransform(smoothScrollY, [0, sectionHeight], [0, -sectionHeight * 0.3])

  const scrollIndicatorY = useTransform(
    smoothScrollY,
    [sectionHeight * 0.2, sectionHeight],
    [0, sectionHeight * 0.3]
  )

  const scrollIndicatorOpacity = useTransform(smoothScrollY, [0, sectionHeight * 0.3], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center overflow-hidden bg-black"
    >
      {/* Background wireframe SVG */}
      <motion.div
        style={{ y: contentY }}
        className="absolute inset-y-0 right-0 z-0 w-[100vw] max-w-[1416.871px] md:w-[85vw] lg:w-[73.8vw]"
      >
        <div className="relative h-full w-full scale-[1.5] overflow-visible sm:scale-[1.3] md:scale-[1.2] lg:scale-100">
          {backgroundSvg}
        </div>
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 w-full px-3 lg:px-6">
        <div className="mx-auto max-w-[1715px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <SectionBadge title={badgeTitle} />
          </motion.div>

          {/* Title */}
          <SectionTitle title={sectionTitle} />
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{ y: scrollIndicatorY, opacity: scrollIndicatorOpacity }}
        className="absolute bottom-1 left-4 z-10 cursor-pointer lg:bottom-8 lg:left-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="font-helvetica flex origin-left rotate-[-90deg] flex-row-reverse items-center text-sm tracking-wider text-white uppercase"
        >
          <span className="text-sm tracking-wider text-white uppercase">Scroll Down</span>
          <motion.div>
            <ArrowCoolDownIcon className="mr-2 h-6 w-6 rotate-[90deg] animate-bounce text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
