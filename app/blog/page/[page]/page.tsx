import ListLayout from '@/layouts/ListLayoutWithTags'
import { notFound } from 'next/navigation'
import { getBlogPosts } from 'datamain/loaders'
import { getStrapiMedia } from '../../../../lib/utils'
import { PostData, StrapiMeta } from 'lib/blog-types'

const POSTS_PER_PAGE = 10

export async function generateStaticParams() {
  const { meta } = await getBlogPosts(1, '', '', 1)
  const pageCount = meta?.pagination?.pageCount ?? 1

  return Array.from({ length: pageCount }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export default async function Page(props: {
  params: { page: string }
  searchParams: { query?: string; category?: string }
}) {
  const { params, searchParams } = props
  const pageNumber = parseInt(params.page, 10)
  const query = searchParams.query || ''
  const category = searchParams.category || ''

  if (isNaN(pageNumber) || pageNumber <= 0) {
    return notFound()
  }

  const { data: allStrapiPosts, meta } = (await getBlogPosts(
    pageNumber,
    query,
    category,
    POSTS_PER_PAGE
  )) as unknown as { data: PostData[]; meta: StrapiMeta }

  if (!allStrapiPosts) {
    return notFound()
  }

  const formattedPosts = allStrapiPosts.map((post) => formatPost(post))

  const filteredPosts = category
    ? formattedPosts.filter((post) => post.tags.includes(category))
    : formattedPosts

  const startIndex = POSTS_PER_PAGE * (pageNumber - 1)
  const endIndex = startIndex + POSTS_PER_PAGE
  const initialDisplayPosts = filteredPosts.slice(startIndex, endIndex)

  const totalPages = meta?.pagination?.pageCount || 1

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
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
