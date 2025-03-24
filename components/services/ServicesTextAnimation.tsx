'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ServicesTextIcon } from '@/components/icons/ServicesText'

interface ServicesTextAnimationProps {
  containerRef: React.RefObject<HTMLDivElement>
}

const ServicesTextAnimation: React.FC<ServicesTextAnimationProps> = ({ containerRef }) => {
  const [isVisible, setIsVisible] = useState(false)

  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Spring animation for the text Y position
  const teamTextY = useTransform(scrollYProgress, [0.05, 0.2], ['100vh', '0vh'])

  const teamTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.3, 0.4],
    [0, 0, 1, 0.3, 0.2]
  )

  // Update visibility based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setIsVisible(value > 0.05)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 flex h-screen w-full items-center justify-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <motion.div
        className="flex h-full w-full items-center justify-center"
        style={{ y: teamTextY, opacity: teamTextOpacity }}
        transition={{
          type: 'spring',
          stiffness: 30,
          damping: 25,
          mass: 2,
        }}
      >
        <ServicesTextIcon className="h-auto max-h-[80vh] w-full" />
      </motion.div>
    </div>
  )
}

export default ServicesTextAnimation
