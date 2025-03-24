// 'use client'

// import type React from 'react'
// import {
//   motion,
//   useScroll,
//   useTransform,
//   frame,
//   cancelFrame,
//   MotionValue,
//   useMotionValue,
// } from 'framer-motion'
// import { ReactLenis } from 'lenis/react'
// import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import throttle from 'lodash/throttle'
// import TeamMemberCard from './TeamMemberCard'
// import TeamMemberModal from './TeamMemberModal'
// import { TeamMember } from './types'
// import { fetchTeamMembers } from './TeamMembersData'
// import TeamTextAnimation from '@/components/team/TeamTextAnimation'
// import LocalizedLink from '@/components/LocalizedLink'

// interface TeamGridProps {
//   teamMembers: TeamMember[]
// }

// const TeamMembersGrid: React.FC<TeamGridProps> = ({ teamMembers }) => {
//   const localContainerRef = useRef<HTMLDivElement>(null)
//   const effectiveContainerRef = localContainerRef
//   const lastScrollUpdate = useRef(0)
//   const SCROLL_THROTTLE_MS = 16 // ~60fps
//   const throttledValue = useMotionValue(0)

//   const lenisRef = useRef<React.ElementRef<typeof ReactLenis>>(null)
//   const [teamTextVisible, setTeamTextVisible] = useState(false)
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== 'undefined' ? window.innerWidth : 1200
//   )
//   const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
//   const [isDataLoaded, setIsDataLoaded] = useState(false)
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const [isMobile, setIsMobile] = useState(false)

//   // Memoize the member lookup function
//   const findMemberById = useCallback(
//     (id: number) => teamMembers.find((m) => m.id === id),
//     [teamMembers]
//   )

//   // Check URL on initial load to see if a member modal should be opened
//   useEffect(() => {
//     const memberId = searchParams.get('member')
//     if (memberId && teamMembers.length > 0) {
//       const member = findMemberById(parseInt(memberId, 10))
//       if (member) {
//         setSelectedMember(member)
//       }
//     }
//   }, [searchParams, teamMembers, findMemberById])

//   // Handle modal opening
//   const openModal = useCallback(
//     (member: TeamMember) => {
//       setSelectedMember(member)
//       router.push(`?member=${member.id}`, { scroll: false })
//     },
//     [router]
//   )

//   // Handle modal closing
//   const closeModal = useCallback(() => {
//     setSelectedMember(null)
//     router.push(window.location.pathname, { scroll: false })
//   }, [router])

//   // Set up Lenis with Framer Motion
//   useEffect(() => {
//     if (!lenisRef.current?.lenis) return

//     function update(data: { timestamp: number }) {
//       lenisRef.current?.lenis?.raf(data.timestamp)
//     }

//     frame.update(update, true)
//     return () => cancelFrame(update)
//   }, [lenisRef.current?.lenis])

//   // Update the window resize handler to set isMobile state
//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout

//     const handleResize = () => {
//       clearTimeout(timeoutId)
//       timeoutId = setTimeout(() => {
//         const width = window.innerWidth
//         setWindowWidth(width)
//         setIsMobile(width < 640)
//       }, 150) // Debounce resize events
//     }

//     // Set initial state
//     handleResize()

//     window.addEventListener('resize', handleResize)
//     return () => {
//       window.removeEventListener('resize', handleResize)
//       clearTimeout(timeoutId)
//     }
//   }, [])

//   // Handle back button navigation
//   useEffect(() => {
//     const handlePopState = (event: PopStateEvent) => {
//       const memberId = event.state?.memberId
//       if (memberId) {
//         const member = findMemberById(memberId)
//         if (member) {
//           setSelectedMember(member)
//         }
//       } else {
//         setSelectedMember(null)
//       }
//     }

//     window.addEventListener('popstate', handlePopState)
//     return () => window.removeEventListener('popstate', handlePopState)
//   }, [findMemberById])

//   const { scrollYProgress } = useScroll({
//     target: effectiveContainerRef,
//     offset: ['start start', 'end end'],
//   })

//   // Handle throttled scroll updates using lodash throttle
//   useEffect(() => {
//     const throttledUpdate = throttle((value: number) => {
//       throttledValue.set(value)
//     }, SCROLL_THROTTLE_MS)

//     const unsubscribe = scrollYProgress.onChange(throttledUpdate)
//     return () => {
//       unsubscribe()
//       throttledUpdate.cancel()
//     }
//   }, [scrollYProgress, throttledValue])

//   // Memoize the column distribution
//   const [leftColumn, middleColumn, rightColumn] = useMemo(() => {
//     // First, create empty columns
//     const columns: (TeamMember | null)[][] = [[], [], []]

//     // Calculate how many rows we need (ceiling division)
//     const rowCount = Math.ceil(teamMembers.length / 3)

//     // Fill each column with the same number of items
//     for (let i = 0; i < rowCount; i++) {
//       for (let col = 0; col < 3; col++) {
//         const memberIndex = i * 3 + col
//         if (memberIndex < teamMembers.length) {
//           columns[col].push(teamMembers[memberIndex])
//         } else {
//           // Add a placeholder for empty slots to maintain equal height
//           columns[col].push(null)
//         }
//       }
//     }

//     // Make sure all columns have the same length for alignment
//     const maxLength = Math.max(...columns.map((col) => col.length))
//     columns.forEach((col) => {
//       while (col.length < maxLength) {
//         col.push(null)
//       }
//     })

//     return columns
//   }, [teamMembers])

//   // Optimize animation keyframes by reducing the number of transformations
//   const leftColumnY = useTransform(
//     throttledValue,
//     [0, 0.3, 0.6, 0.9, 1],
//     [
//       '30vh',
//       '10vh',
//       '-60vh',
//       `-${(leftColumn.length - 1) * 40}vh`,
//       `-${(leftColumn.length - 1) * 40}vh`,
//     ]
//   )

//   const middleColumnY = useTransform(
//     throttledValue,
//     [0, 0.3, 0.6, 0.9, 1],
//     [
//       '50vh',
//       '40vh',
//       '20vh',
//       `-${(middleColumn.length - 1) * 40}vh`,
//       `-${(middleColumn.length - 1) * 40}vh`,
//     ]
//   )

//   const rightColumnY = useTransform(
//     throttledValue,
//     [0, 0.3, 0.6, 0.9, 1],
//     [
//       '30vh',
//       '-20vh',
//       '-50vh',
//       `-${(rightColumn.length - 1) * 40}vh`,
//       `-${(rightColumn.length - 1) * 40}vh`,
//     ]
//   )

//   // Memoize the column animations object
//   const columnAnimations = useMemo(
//     () => ({
//       leftColumnY,
//       middleColumnY,
//       rightColumnY,
//     }),
//     [leftColumnY, middleColumnY, rightColumnY]
//   )

//   // Memoize the spacer height calculation
//   const spacerHeight = useMemo(() => {
//     if (windowWidth < 640) {
//       // For mobile, add some padding at the bottom to ensure all cards are visible
//       return '20vh'
//     }
//     return `${Math.max(200, 100 + (teamMembers.length / 3) * 50)}vh`
//   }, [windowWidth, teamMembers.length])

//   // Add effect to update teamTextVisible based on scroll position with lodash throttle
//   useEffect(() => {
//     // Initially hide the TEAM text
//     setTeamTextVisible(false)

//     // Show TEAM text only after scrolling past the hero section
//     const throttledUpdate = throttle((value: number) => {
//       if (value > 0.05) {
//         setTeamTextVisible(true)
//       } else {
//         setTeamTextVisible(false)
//       }
//     }, SCROLL_THROTTLE_MS)

//     const unsubscribe = scrollYProgress.onChange(throttledUpdate)
//     return () => {
//       unsubscribe()
//       throttledUpdate.cancel()
//     }
//   }, [scrollYProgress])

//   // Create a spring animation for the TEAM text Y position with optimized keyframes
//   const teamTextY = useTransform(throttledValue, [0.05, 0.15], ['100vh', '0vh'])

//   return (
//     <ReactLenis
//       ref={lenisRef}
//       root
//       options={{
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
//         smoothWheel: true,
//         wheelMultiplier: 1.2,
//         touchMultiplier: 2,
//         infinite: false,
//       }}
//     >
//       <div className="relative" ref={localContainerRef}>
//         {/* Show TeamTextAnimation on both mobile and desktop */}
//         <TeamTextAnimation
//           containerRef={effectiveContainerRef as React.RefObject<HTMLDivElement>}
//         />

//         {/* Hero section spacer */}
//         <div className="h-[100vh]"></div>

//         {windowWidth < 720 ? (
//           // MOBILE VIEW - NOT STICKY, just normal scrolling with proper spacing
//           <div className="relative w-full">
//             <div className="grid grid-cols-1 gap-8 px-4">
//               {teamMembers.map((member, index) => (
//                 <div key={member.id} className="mx-auto w-full max-w-[462px]">
//                   <TeamMemberCard {...member} onClick={() => openModal(member)} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           // TABLET & DESKTOP - Use your original code
//           <div className="sticky top-0 z-10 flex h-screen w-full items-center justify-center">
//             <div className="w-full max-w-[1872px] px-6 max-md:px-4 max-sm:px-2">
//               <div className="relative grid grid-cols-3 gap-8 md:gap-12 lg:gap-16">
//                 {/* Left Column */}
//                 <motion.div
//                   className="flex flex-col gap-8"
//                   style={{ y: columnAnimations.leftColumnY }}
//                 >
//                   {leftColumn.map((member, index) => (
//                     <div
//                       key={index}
//                       className={index < leftColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
//                     >
//                       {member && <TeamMemberCard {...member} onClick={() => openModal(member)} />}
//                     </div>
//                   ))}
//                 </motion.div>

//                 {/* Middle Column */}
//                 <motion.div
//                   className="flex flex-col gap-8"
//                   style={{ y: columnAnimations.middleColumnY }}
//                 >
//                   {middleColumn.map((member, index) => (
//                     <div
//                       key={index}
//                       className={index < middleColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
//                     >
//                       {member && <TeamMemberCard {...member} onClick={() => openModal(member)} />}
//                     </div>
//                   ))}
//                 </motion.div>

//                 {/* Right Column */}
//                 <motion.div
//                   className="flex flex-col gap-8"
//                   style={{ y: columnAnimations.rightColumnY }}
//                 >
//                   {rightColumn.map((member, index) => (
//                     <div
//                       key={index}
//                       className={index < rightColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
//                     >
//                       {member && <TeamMemberCard {...member} onClick={() => openModal(member)} />}
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Spacer with dynamic height calculation */}
//         <div style={{ height: spacerHeight }}></div>

//         {/* Team Member Modal */}
//         <TeamMemberModal
//           isOpen={Boolean(selectedMember)}
//           onClose={closeModal}
//           member={selectedMember}
//         />
//       </div>
//     </ReactLenis>
//   )
// }

// export default TeamMembersGrid

'use client'

import type React from 'react'
import { motion, useScroll, useTransform, frame, cancelFrame, useMotionValue } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState, useMemo } from 'react'
import throttle from 'lodash/throttle'
import TeamMemberCard from './TeamMemberCard'
import { TeamMember } from './types'
import TeamTextAnimation from '@/components/team/TeamTextAnimation'

interface TeamGridProps {
  teamMembers: TeamMember[]
}

const TeamMembersGrid: React.FC<TeamGridProps> = ({ teamMembers }) => {
  const localContainerRef = useRef<HTMLDivElement>(null)
  const effectiveContainerRef = localContainerRef
  const SCROLL_THROTTLE_MS = 16 // ~60fps
  const throttledValue = useMotionValue(0)

  const lenisRef = useRef<React.ElementRef<typeof ReactLenis>>(null)
  const [teamTextVisible, setTeamTextVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  // Set up Lenis with Framer Motion
  useEffect(() => {
    if (!lenisRef.current?.lenis) return

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [lenisRef.current?.lenis])

  // Update the window resize handler to set isMobile state
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const width = window.innerWidth
        setWindowWidth(width)
      }, 150) // Debounce resize events
    }

    // Set initial state
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: effectiveContainerRef,
    offset: ['start start', 'end end'],
  })

  // Handle throttled scroll updates using lodash throttle
  useEffect(() => {
    const throttledUpdate = throttle((value: number) => {
      throttledValue.set(value)
    }, SCROLL_THROTTLE_MS)

    const unsubscribe = scrollYProgress.onChange(throttledUpdate)
    return () => {
      unsubscribe()
      throttledUpdate.cancel()
    }
  }, [scrollYProgress, throttledValue])

  // Memoize the column distribution
  const [leftColumn, middleColumn, rightColumn] = useMemo(() => {
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

    return columns
  }, [teamMembers])

  // Optimize animation keyframes by reducing the number of transformations
  const leftColumnY = useTransform(
    throttledValue,
    [0, 0.3, 0.6, 0.9, 1],
    [
      '30vh',
      '10vh',
      '-60vh',
      `-${(leftColumn.length - 1) * 40}vh`,
      `-${(leftColumn.length - 1) * 40}vh`,
    ]
  )

  const middleColumnY = useTransform(
    throttledValue,
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
    throttledValue,
    [0, 0.3, 0.6, 0.9, 1],
    [
      '30vh',
      '-20vh',
      '-50vh',
      `-${(rightColumn.length - 1) * 40}vh`,
      `-${(rightColumn.length - 1) * 40}vh`,
    ]
  )

  // Memoize the column animations object
  const columnAnimations = useMemo(
    () => ({
      leftColumnY,
      middleColumnY,
      rightColumnY,
    }),
    [leftColumnY, middleColumnY, rightColumnY]
  )

  // Memoize the spacer height calculation
  const spacerHeight = useMemo(() => {
    if (windowWidth < 640) {
      // For mobile, add some padding at the bottom to ensure all cards are visible
      return '20vh'
    }
    return `${Math.max(200, 100 + (teamMembers.length / 3) * 50)}vh`
  }, [windowWidth, teamMembers.length])

  // Add effect to update teamTextVisible based on scroll position with lodash throttle
  useEffect(() => {
    // Initially hide the TEAM text
    setTeamTextVisible(false)

    // Show TEAM text only after scrolling past the hero section
    const throttledUpdate = throttle((value: number) => {
      if (value > 0.05) {
        setTeamTextVisible(true)
      } else {
        setTeamTextVisible(false)
      }
    }, SCROLL_THROTTLE_MS)

    const unsubscribe = scrollYProgress.onChange(throttledUpdate)
    return () => {
      unsubscribe()
      throttledUpdate.cancel()
    }
  }, [scrollYProgress])

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
        {/* Show TeamTextAnimation on both mobile and desktop */}
        <TeamTextAnimation
          containerRef={effectiveContainerRef as React.RefObject<HTMLDivElement>}
        />

        {/* Hero section spacer */}
        <div className="h-[100vh]"></div>

        {windowWidth < 720 ? (
          // MOBILE VIEW - NOT STICKY, just normal scrolling with proper spacing
          <div className="relative w-full">
            <div className="grid grid-cols-1 gap-8 px-4">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="mx-auto w-full max-w-[462px]">
                  <TeamMemberCard {...member} />
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
                <motion.div
                  className="flex flex-col gap-8"
                  style={{ y: columnAnimations.leftColumnY }}
                >
                  {leftColumn.map((member, index) => (
                    <div
                      key={index}
                      className={index < leftColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
                    >
                      {member && <TeamMemberCard {...member} />}
                    </div>
                  ))}
                </motion.div>

                {/* Middle Column */}
                <motion.div
                  className="flex flex-col gap-8"
                  style={{ y: columnAnimations.middleColumnY }}
                >
                  {middleColumn.map((member, index) => (
                    <div
                      key={index}
                      className={index < middleColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
                    >
                      {member && <TeamMemberCard {...member} />}
                    </div>
                  ))}
                </motion.div>

                {/* Right Column */}
                <motion.div
                  className="flex flex-col gap-8"
                  style={{ y: columnAnimations.rightColumnY }}
                >
                  {rightColumn.map((member, index) => (
                    <div
                      key={index}
                      className={index < rightColumn.length - 1 ? 'mb-16 md:mb-24' : ''}
                    >
                      {member && <TeamMemberCard {...member} />}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Spacer with dynamic height calculation */}
        <div style={{ height: spacerHeight }}></div>
      </div>
    </ReactLenis>
  )
}

export default TeamMembersGrid
