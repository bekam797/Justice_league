'use client'

import type React from 'react'
import { motion, useScroll, useTransform, frame, cancelFrame } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import TeamMemberCard from './TeamMemberCard'
import TeamMemberModal from './TeamMemberModal'
import { TeamMember } from './types'
import { fetchTeamMembers } from './TeamMembersData'

interface TeamGridProps {
  containerRef?: React.RefObject<HTMLDivElement>
}

const TeamMembersGrid: React.FC<TeamGridProps> = ({ containerRef }) => {
  const localContainerRef = useRef<HTMLDivElement>(null)
  const effectiveContainerRef = containerRef || localContainerRef

  const lenisRef = useRef<React.ElementRef<typeof ReactLenis>>(null)
  const [teamTextVisible, setTeamTextVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Fetch team members data
  useEffect(() => {
    const loadTeamMembers = async () => {
      setIsLoading(true)
      try {
        const data = await fetchTeamMembers()
        setTeamMembers(data)
      } catch (error) {
        console.error('Failed to load team members:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTeamMembers()
  }, [])

  // Check URL on initial load to see if a member modal should be opened
  useEffect(() => {
    const memberId = searchParams.get('member')
    if (memberId && teamMembers.length > 0) {
      const member = teamMembers.find((m) => m.id === parseInt(memberId, 10))
      if (member) {
        setSelectedMember(member)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, teamMembers])

  // Handle modal opening
  const openModal = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
    // Update URL with the selected member id
    const newUrl = window.location.pathname + `?member=${member.id}`
    window.history.pushState({ memberId: member.id }, '', newUrl)
  }

  // Handle modal closing
  const closeModal = () => {
    setIsModalOpen(false)
    // Remove the member parameter from the URL
    const newUrl = window.location.pathname
    window.history.pushState({}, '', newUrl)
  }

  // Set up Lenis with Framer Motion
  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  // Add this useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const memberId = event.state?.memberId
      if (memberId) {
        const member = teamMembers.find((m) => m.id === memberId)
        if (member) {
          setSelectedMember(member)
          setIsModalOpen(true)
        }
      } else {
        setIsModalOpen(false)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [teamMembers])

  const { scrollYProgress } = useScroll({
    target: effectiveContainerRef,
    offset: ['start start', 'end end'],
  })

  // First, define the function to distribute team members
  const distributeTeamMembersEvenly = () => {
    // First, create empty columns
    const columns: (TeamMember | null)[][] = [[], [], []]

    // Calculate how many rows we need (ceiling division)
    const rowCount = Math.ceil(teamMembers.length / 3)

    // Fill each column with the same number of items
    for (let i = 0; i < rowCount; i++) {
      for (let col = 0; col < 3; col++) {
        const memberIndex = i * 3 + col
        if (memberIndex < teamMembers.length) {
          columns[col].push(teamMembers[memberIndex])
        } else {
          // Add a placeholder for empty slots to maintain equal height
          columns[col].push(null)
        }
      }
    }

    // Make sure all columns have the same length for alignment
    const maxLength = Math.max(...columns.map((col) => col.length))
    columns.forEach((col) => {
      while (col.length < maxLength) {
        col.push(null)
      }
    })

    // Return columns with null placeholders intact
    return columns
  }

  // Then get the columns
  const [leftColumn, middleColumn, rightColumn] = distributeTeamMembersEvenly()

  // Now define the animations using the columns
  const leftColumnY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [
      '-30vh',
      '10vh',
      '-60vh',
      `-${(leftColumn.length - 1) * 40}vh`,
      `-${(leftColumn.length - 1) * 40}vh`,
    ]
  )

  const middleColumnY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [
      '50vh',
      '40vh',
      '20vh',
      `-${(middleColumn.length - 1) * 40}vh`,
      `-${(middleColumn.length - 1) * 40}vh`,
    ]
  )

  const rightColumnY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1],
    [
      '30vh',
      '-20vh',
      '-50vh',
      `-${(rightColumn.length - 1) * 40}vh`,
      `-${(rightColumn.length - 1) * 40}vh`,
    ]
  )

  // Add effect to update teamTextVisible based on scroll position
  useEffect(() => {
    // Initially hide the TEAM text
    setTeamTextVisible(false)

    // Show TEAM text only after scrolling past the hero section
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value > 0.05) {
        setTeamTextVisible(true)
      } else {
        setTeamTextVisible(false)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // Create a spring animation for the TEAM text Y position
  const teamTextY = useTransform(
    scrollYProgress,
    [0.05, 0.2], // Extend the range to make it slower (from 0.05-0.15 to 0.05-0.25)
    ['100vh', '0vh']
  )

  const teamTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.3, 0.4],
    [0, 0, 1, 0.3, 0.2]
  )

  // Calculate spacer height based on screen size and content
  const getSpacerHeight = () => {
    if (windowWidth < 640) {
      // For mobile, use a minimal spacer - just enough to allow scrolling to the last card
      return 0 // No extra space for mobile
    } else {
      // For larger screens, use your original calculation
      return Math.max(200, 100 + (teamMembers.length / 3) * 50) + 'vh'
    }
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="mt-4 text-white">Loading team members...</p>
        </div>
      </div>
    )
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <div className="relative" ref={localContainerRef}>
        {/* TEAM text - fixed in the background, only visible after scrolling */}
        {teamTextVisible && (
          <div className="pointer-events-none fixed top-0 left-0 z-0 flex h-screen w-full items-center justify-center">
            <motion.h1
              className="font-justice text-center text-[25vw] leading-none tracking-wider text-white md:text-[30vw]"
              style={{ y: teamTextY, opacity: teamTextOpacity }}
              transition={{
                type: 'spring',
                stiffness: 30, // Lower stiffness for slower movement
                damping: 25, // Higher damping for less bounce
                mass: 2, // Higher mass makes it move slower
              }}
            >
              TEAM
            </motion.h1>
          </div>
        )}
        <div className="h-[100vh]"></div>

        {windowWidth < 640 ? (
          // MOBILE VIEW - NOT STICKY, just normal scrolling with NO EXTRA SPACE
          <div className="relative w-full">
            <div className="grid grid-cols-1 gap-4 px-2">
              {teamMembers.map((member, index) => (
                <div key={member.id} className={index < teamMembers.length - 1 ? 'mb-4' : ''}>
                  <TeamMemberCard {...member} onClick={() => openModal(member)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // TABLET & DESKTOP - Use your original code
          <div className="sticky top-0 z-10 flex h-screen w-full items-center justify-center">
            <div className="w-full max-w-[1872px] px-6 max-md:px-4 max-sm:px-2">
              <div className="relative grid grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                {/* Left Column */}
                <motion.div className="flex flex-col gap-8" style={{ y: leftColumnY }}>
                  {leftColumn.map((member, index) => (
                    <div
                      key={index}
                      className={index < leftColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
                    >
                      {member && <TeamMemberCard {...member} onClick={() => openModal(member)} />}
                    </div>
                  ))}
                </motion.div>

                {/* Middle Column */}
                <motion.div className="flex flex-col gap-8" style={{ y: middleColumnY }}>
                  {middleColumn.map((member, index) => (
                    <div
                      key={index}
                      className={index < middleColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
                    >
                      {member && <TeamMemberCard {...member} onClick={() => openModal(member)} />}
                    </div>
                  ))}
                </motion.div>

                {/* Right Column */}
                <motion.div className="flex flex-col gap-8" style={{ y: rightColumnY }}>
                  {rightColumn.map((member, index) => (
                    <div
                      key={index}
                      className={index < rightColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
                    >
                      {member && <TeamMemberCard {...member} onClick={() => openModal(member)} />}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Spacer with dynamic height calculation - ZERO for mobile */}
        <div style={{ height: getSpacerHeight() }}></div>

        {/* Team Member Modal */}
        <TeamMemberModal isOpen={isModalOpen} onClose={closeModal} member={selectedMember} />
      </div>
    </ReactLenis>
  )
}

export default TeamMembersGrid
