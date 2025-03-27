'use client'

import Image from '@/components/Image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTextTransform } from 'lib/use-text-transform'
import { useTranslation } from 'lib/contexts/TranslationContext'
interface FeaturedBlogCardProps {
  title: string
  imageUrl: string
  href: string
}

export default function FeaturedBlogCard({ title, imageUrl, href }: FeaturedBlogCardProps) {
  const textStyle = useTextTransform()
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link href={href} className="mx-3 block lg:mx-6">
        <div className="group overflow-hidden rounded-lg bg-white/10 transition-colors">
          <div className="flex flex-col gap-6 p-4 md:flex-row">
            {/* Content Side */}
            <div className="flex flex-1 flex-col justify-between">
              <h2
                className="font-justice text-3xl leading-[120%] text-white uppercase md:text-5xl md:leading-[100%]"
                style={textStyle}
              >
                {title}
              </h2>

              <span className="font-helvetica mt-4 self-start text-base text-[#BFAD60] group-hover:underline">
                [{t('common.readMore', 'Read More')}]
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
