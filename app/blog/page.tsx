import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { getBlogPosts } from 'datamain/loaders'
import { getStrapiMedia } from '../../lib/utils'
import { PostData, StrapiMeta } from 'lib/blog-types'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: {
  searchParams: Promise<{ page: string; query?: string; category?: string }>
}) {
  const searchParams = await props.searchParams
  const pageNumber = parseInt(searchParams.page || '1', 10)
  const query = searchParams.query || ''
  const category = searchParams.category || ''

  const { data: allStrapiPosts, meta } = (await getBlogPosts(
    pageNumber,
    query,
    category,
    POSTS_PER_PAGE
  )) as unknown as { data: PostData[]; meta: StrapiMeta }

  const formattedPosts = allStrapiPosts.map((post) => formatPost(post))

  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const initialDisplayPosts = formattedPosts.slice(startIndex, endIndex)

  const pagination = {
    currentPage: pageNumber,
    totalPages: meta.pagination?.pageCount || 1,
  }

  return (
    <ListLayout
      posts={formattedPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
    />
  )
}

function formatPost(post) {
  return {
    id: post.id,
    title: post.title,
    date: post.publishedAt,
    tags: post.category ? [post.category.name] : [],
    lastmod: post.updatedAt,
    draft: false,
    summary: post.description,
    slug: post.slug,
    path: `blog/${post.slug}`,
    images: post.cover ? [getStrapiMedia(post.cover.url)] : [],
    authors: post.author ? [post.author.name] : [],
    type: 'Blog' as const,
    readingTime: { text: '5 min read', minutes: 5, time: 300000, words: 1000 },
    filePath: '',
    toc: [],
    structuredData: {},
    featured: post.featured,
  }
}
