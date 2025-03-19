'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TeamMember } from './types'

interface TeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  member: TeamMember | null
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ isOpen, onClose, member }) => {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  if (!member) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="modal-main-background relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg border border-[#3C380D] p-6 shadow-xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 cursor-pointer text-3xl text-white transition-colors hover:text-[#bfad60]"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded bg-white max-sm:aspect-[4/5]">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  width={600}
                  height={800}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="font-justice inline-block w-fit bg-[#3d3801] box-decoration-clone px-4 py-2 pr-0 text-3xl text-white uppercase">
                  {member.name}
                </h2>
                <p className="font-helvetica mt-[-12px] mb-6 w-fit bg-[#3d3801] box-decoration-clone px-4 pt-0 pb-1 text-lg font-light text-white/70">
                  {member.position}
                </p>

                {/* Display team member description from data */}
                <div className="text-white/80">
                  <p className="mb-4">{member.description}</p>
                </div>

                {/* Display social media links from data */}
                {member.socialLinks && (
                  <div className="mt-6 flex space-x-4">
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        className="text-white hover:text-[#bfad60]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        className="text-white hover:text-[#bfad60]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    )}
                    {member.socialLinks.email && (
                      <a
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-white hover:text-[#bfad60]"
                      >
                        Email
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default TeamMemberModal
