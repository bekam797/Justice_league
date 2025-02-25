'use client'

import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { BlogFilter } from '@/components/blog/blog-filter'
import FeaturedBlogCard from '@/components/blog/featured-blog-card'
import BlogGrid from '@/components/blog/blog-grid'
import Pagination from '@/components/blog/pagination'
import { motion } from 'framer-motion'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const [featuredPost, ...remainingPosts] = displayPosts

  const blogFilters = ['All Posts', 'Design', 'Development', 'Marketing', 'Business']

  // Check if we're on the first page
  const isFirstPage = !pagination || pagination.currentPage === 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-28">
        <BlogFilter
          title="Blogs"
          filters={blogFilters}
          onFilterChange={(filter) => console.log(`Filter changed to: ${filter}`)}
        />
        {isFirstPage && featuredPost && (
          <FeaturedBlogCard
            title={featuredPost.title}
            imageUrl={featuredPost.images?.[0] || '/static/images/twitter-card.png'}
            href={`/${featuredPost.path}`}
          />
        )}
        <BlogGrid posts={isFirstPage ? remainingPosts : displayPosts} />
        <div className="mt-20 flex items-center justify-center sm:space-x-24">
          <div>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                basePath="blog"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
