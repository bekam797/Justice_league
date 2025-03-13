'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxScrollProps {
  children: ReactNode
}

export default function ParallaxScroll({ children }: ParallaxScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  // Update dimensions on mount and resize
  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight)

    const updateDimensions = () => {
      if (contentRef.current) {
        // Add 20% buffer for accurate calculations
        setContentHeight(contentRef.current.scrollHeight * 1.2)
        setWindowHeight(window.innerHeight)
      }
    }

    // Initial calculation
    updateDimensions()

    // Set up resize handler
    window.addEventListener('resize', updateDimensions)

    // Clean up
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Get scroll progress
  const { scrollY } = useScroll()

  // Transform the scroll value to a y position
  const y = useTransform(
    scrollY,
    [0, contentHeight - windowHeight],
    [0, -(contentHeight - windowHeight)]
  )

  return (
    <>
      {/* Fixed container for parallax content */}
      <div className="fixed inset-0">
        <motion.div ref={contentRef} style={{ y }} className="w-full">
          {children}
        </motion.div>
      </div>

      {/* Spacer div to enable scrolling */}
      <div ref={containerRef} style={{ height: `${contentHeight}px` }} className="w-full" />
    </>
  )
}
