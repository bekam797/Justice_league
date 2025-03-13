'use client'

import SectionBadge from '@/components/common/SectionBadge'
import SectionTitle from '@/components/common/SectionTitle'
import { ArrowCoolDownIcon } from '@/components/icons/arrows'
import { Briefcase } from '@/components/icons/BriefCase'
import { motion, useTransform, useSpring, useScroll } from 'framer-motion'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

export default function Hero() {
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
      {/* Background wireframe briefcase */}
      <motion.div
        style={{ y: contentY }}
        className="absolute inset-y-0 right-0 z-0 w-[73.8vw] max-w-[1416.871px]"
      >
        <Briefcase className="h-full w-full" />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 w-full px-6">
        <div className="mx-auto max-w-[1715px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <SectionBadge title="Clients" />
          </motion.div>

          {/* Title */}
          <SectionTitle />
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{ y: scrollIndicatorY, opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-8 z-10 cursor-pointer"
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
