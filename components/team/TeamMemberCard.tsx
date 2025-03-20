'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

interface TeamMemberCardProps {
  imageUrl: string
  name: string
  position: string
  onClick?: () => void
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ imageUrl, name, position, onClick }) => {
  return (
    <button
      className="mx-auto w-full max-w-[462px] cursor-pointer text-left transition-transform focus-visible:scale-[1.02] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-yellow-500"
      onClick={onClick}
      aria-label={`View details for ${name}, ${position}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded bg-white max-sm:aspect-[4/5]">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 0.7,
          }}
        >
          <Image
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
            width={462}
            height={616}
          />
        </motion.div>
        <footer className="absolute bottom-4 left-4">
          <h3 className="font-justice bg-[#061A31] box-decoration-clone px-2 pr-0 pb-1 text-lg text-white uppercase sm:text-2xl">
            {name}
          </h3>
          <p className="font-helvetica mt-[-12px] w-fit bg-[#061A31] box-decoration-clone px-2 py-1 text-xs leading-4 font-light text-white/50 sm:text-sm md:text-base">
            {position}
          </p>
        </footer>
      </div>
    </button>
  )
}
export default TeamMemberCard
