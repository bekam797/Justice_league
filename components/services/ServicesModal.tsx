'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import ServicesModalContent from '@/components/services/ServicesModalContent'
import { X } from 'lucide-react'
import UppercaseText from '@/components/common/UppercaseText'
import { useLenis } from 'lenis/react'

export default function ServicesModal({ services }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()
  const lenis = useLenis()

  // Close modal
  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  // Close on escape key
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  // Handle overlay click (close when clicking outside modal)
  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  // Add event listeners
  useEffect(() => {
    // Store Lenis state
    const wasLenisLocked = lenis?.isLocked

    // Stop Lenis
    if (lenis) {
      lenis.stop()
    }

    // Also prevent body scrolling
    document.body.style.overflow = 'hidden'

    return () => {
      // Restore Lenis to previous state
      if (lenis && !wasLenisLocked) {
        lenis.start()
      }

      // Restore body scrolling
      document.body.style.overflow = ''
    }
  }, [lenis])

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <motion.div
        ref={wrapper}
        className="modal-main-background relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg border border-[#061A31] p-6 shadow-none sm:max-w-4xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <header className="flex items-center justify-between">
          <UppercaseText className="font-justice text-4xl text-white max-md:text-3xl max-sm:text-2xl">
            {services.title}
          </UppercaseText>
          <button
            onClick={onDismiss}
            aria-label="Close"
            className="focus:ring-2 focus:ring-white focus:outline-none"
          >
            <X size={24} />
          </button>
        </header>

        <ServicesModalContent isOpen={true} onClose={onDismiss} services={services} />
      </motion.div>
    </div>
  )
}
