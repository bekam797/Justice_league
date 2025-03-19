'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ClientsLogoTop } from './logos/ClientsLogoTop'
import { ClientsLogoBottom } from './logos/ClientsLogoBottom'
import ImageGallery from '@/components/clients/logos/image-gallery'

export default function ClientsEntrance() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const gap = useTransform(scrollYProgress, [0.1, 0.4], [0, 350])
  const svgOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.2])

  return (
    <div className="relative h-[200vh] bg-black" ref={containerRef}>
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2,
          }}
          style={{ opacity: svgOpacity }}
          className="w-full"
        >
          <ClientsLogoTop className="h-auto w-full text-white" />
        </motion.div>

        <motion.div
          style={{ height: gap }}
          className="flex w-full items-center justify-center overflow-visible md:h-auto md:overflow-hidden"
        >
          <motion.div
            className="flex h-full w-full items-center justify-center px-1 md:px-4"
            style={{ height: '350px' }}
          >
            {/* Pass the scrollYProgress to the ImageGallery */}
            <ImageGallery galleryId={1} scrollYProgress={scrollYProgress} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.4,
          }}
          className="mt-[-1px] w-full"
          style={{ opacity: svgOpacity }}
        >
          <ClientsLogoBottom className="h-auto w-full text-white" />
        </motion.div>
      </div>
    </div>
  )
}
