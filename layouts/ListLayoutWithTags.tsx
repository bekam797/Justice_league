import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { BlogFilter } from '@/components/blog/blog-filter'
import FeaturedBlogCard from '@/components/blog/featured-blog-card'
import BlogGrid from '@/components/blog/blog-grid'
import Pagination from '@/components/blog/pagination'
import { motion } from 'framer-motion'
import { CategorySelect } from '@/components/blog/category-select'

type BlogWithFeatured = CoreContent<Blog> & { featured?: boolean }

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: BlogWithFeatured[]
  initialDisplayPosts?: BlogWithFeatured[]
  pagination?: PaginationProps
}

export default function ListLayoutWithTags({
  posts,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const featuredPost = displayPosts.find((post) => post?.featured === true)
  const remainingPosts = featuredPost
    ? displayPosts.filter((post) => post.slug !== featuredPost.slug)
    : displayPosts

  const isFirstPage = !pagination || pagination.currentPage === 1

  return (
    <div>
      <div className="pt-28">
        <CategorySelect />
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
    </div>
  )
}
