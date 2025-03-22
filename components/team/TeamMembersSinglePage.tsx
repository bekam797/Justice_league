'use client'

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TeamMember } from '@/components/team/types'
import Image from 'next/image'
import { getStrapiMedia } from 'lib/utils'

interface TeamMemberPageProps {
  member: TeamMember
}

export default function TeamMemberSinglePage({ member }: TeamMemberPageProps) {
  if (!member) {
    notFound()
  }

  console.log(member, 'member')

  return (
    <div className="mt-28">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        }
      >
        <div className="p-3 lg:p-6">
          <Link
            href="/team"
            className="mb-8 inline-block text-white transition-colors hover:text-[#bfad60]"
          >
            ← Back to Team
          </Link>
          <motion.div
            className="mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded max-sm:aspect-[4/5]">
                <Image
                  src={getStrapiMedia(member.imageUrl) || '/placeholder.svg'}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  width={600}
                  height={800}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-justice inline-block w-fit bg-[#061A31] box-decoration-clone px-4 py-2 pr-0 text-3xl text-white uppercase">
                  {member.name}
                </h1>
                <p className="font-helvetica mt-[-12px] mb-6 w-fit bg-[#061A31] box-decoration-clone px-4 pt-0 pb-1 text-lg font-light text-white/70">
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
        </div>
      </Suspense>
    </div>
  )
}
