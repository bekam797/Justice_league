'use client'

import Image from '@/components/Image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface FeaturedBlogCardProps {
  title: string
  imageUrl: string
  href: string
}

export default function FeaturedBlogCard({ title, imageUrl, href }: FeaturedBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link href={href} className="mx-6 block">
        <div className="group overflow-hidden rounded-lg bg-white/10 transition-colors">
          <div className="flex flex-col gap-6 p-4 md:flex-row">
            {/* Content Side */}
            <div className="flex flex-1 flex-col justify-between">
              <h2 className="font-justice text-3xl leading-[120%] text-white md:text-5xl md:leading-[100%]">
                {title}
              </h2>

              <span className="font-helvetica mt-4 self-start text-base text-[#BFAD60] group-hover:underline">
                [Read More]
              </span>
            </div>

            {/* Image Side */}
            <div className="relative w-full md:w-1/2">
              <div className="h-[404px] w-full">
                <Image
                  src={imageUrl}
                  alt={title}
                  width={600}
                  height={400}
                  className="h-full w-full rounded object-cover transition-transform"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
