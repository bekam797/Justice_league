'use client'

// import Image from 'next/image'
import Image from '@/components/Image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface BlogPost {
  title: string
  summary?: string
  images?: string[]
  slug: string
  path: string
  date: string
  tags?: string[]
}

interface BlogGridItemProps {
  post: BlogPost
  className?: string
  index: number
}

function BlogGridItem({ post, className = '', index }: BlogGridItemProps) {
  const isLargeItem = className?.includes('h-full')

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className={`${className}`}
    >
      <Link
        href={`/${post.path}`}
        className={`group block h-full overflow-hidden rounded-lg bg-white/10 p-4`}
      >
        <div className="flex h-full flex-col">
          <div className={`relative ${isLargeItem ? 'flex-1' : 'aspect-[4/3]'} w-full`}>
            <Image
              src={post?.images?.[0] || '/static/images/twitter-card.png'}
              alt={post?.title}
              width={800}
              height={600}
              className="h-full w-full rounded-xs object-cover"
            />
          </div>
          <div className={`${isLargeItem ? 'mt-4' : 'mt-3'}`}>
            <h3 className="font-helvetica text-base leading-[100%] text-white">{post?.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface BlogGridProps {
  posts: BlogPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts?.length) return null

  return (
    <div className="mx-6 my-2 grid grid-cols-2 gap-2 md:grid-cols-4">
      {posts.map((post, index) => {
        // Large center item
        if (index === 6) {
          return (
            <div key={post.slug} className="col-span-2 row-span-2">
              <BlogGridItem post={post} className="h-full" index={index} />
            </div>
          )
        }

        // Regular items
        return (
          <div key={post.slug} className={index >= 4 && index <= 5 ? 'col-span-1' : ''}>
            <BlogGridItem post={post} index={index} />
          </div>
        )
      })}
    </div>
  )
}
