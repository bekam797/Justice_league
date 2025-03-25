'use client'

import SectionBadge from '@/components/common/SectionBadge'
import { ServicesIcon } from '@/components/icons/ServicesIcon'
import { motion, useTransform, useSpring, useScroll } from 'framer-motion'
import { useEffect, useState, useRef, ReactNode } from 'react'
import ContactSection, { ContactDetail } from './ContactDetailsSection'
import ContactForm from './ContactForm'
import UppercaseText from '@/components/common/UppercaseText'

interface ContactContentProps {
  badgeTitle?: string
  sectionTitle?: string
  contactDetails?: Array<{
    id: number
    label: string
    value: string
  }>
  nameLabel?: string
  surnameLabel?: string
  emailLabel?: string
  messageLabel?: string
  submitButtonText?: string
}

export default function ContactContent({
  badgeTitle = '',
  sectionTitle,
  contactDetails = [],
  nameLabel = 'Name',
  surnameLabel = 'Surname',
  emailLabel = 'Email',
  messageLabel = 'Your message',
  submitButtonText = 'Send Message',
}: ContactContentProps) {
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

  // Transform contact details to include type information
  const transformedContactDetails: ContactDetail[] = contactDetails.map((detail) => ({
    label: detail.label,
    value: detail.value,
    type: detail.label.toLowerCase().includes('phone')
      ? ('phone' as const)
      : detail.value.startsWith('http')
        ? ('link' as const)
        : ('email' as const),
  }))

  return (
    <>
      <section
        ref={sectionRef}
        className="relative flex min-h-[100vh] items-center overflow-hidden bg-black pt-[120px]"
      >
        {/* Background wireframe SVG */}
        <motion.div
          style={{ y: contentY }}
          className="absolute top-[120px] right-0 z-0 h-[calc(100%-120px)] w-[100vw] max-w-[1416.871px] md:w-[85vw] lg:w-[73.8vw]"
        >
          <div className="relative h-full w-full translate-y-[120px] scale-[2] overflow-visible sm:scale-[1.8] md:scale-[1.5] lg:scale-[1.3]">
            <ServicesIcon className="h-full w-full" />
          </div>
        </motion.div>

        <motion.div style={{ y: contentY }} className="relative z-10 w-full px-3 lg:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`font-justice w-full max-w-[81.7vw] text-[3.75vw] leading-[1.2] font-normal text-white uppercase sm:text-[3.75vw] sm:leading-[1.2]`}
              >
                <UppercaseText
                  tag="span"
                  className="bg-[#061A31] box-decoration-clone px-[1.25vw] pl-0"
                >
                  {sectionTitle}
                </UppercaseText>
              </motion.h1>

              <ContactSection contactDetails={transformedContactDetails} />
            </div>
            <div>
              <ContactForm
                nameLabel={nameLabel}
                surnameLabel={surnameLabel}
                emailLabel={emailLabel}
                messageLabel={messageLabel}
                submitButtonText={submitButtonText}
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
