'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import TeamMemberModal from '@/components/team/TeamMemberModalContent'
import { X } from 'lucide-react'

export default function Modal({ member }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

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
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
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
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <TeamMemberModal isOpen={true} onClose={onDismiss} member={member} />
      </motion.div>
    </div>
  )
}
