import { components } from '@/components/MDXComponents'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import PostSimple from '@/layouts/PostSimple'
import siteMetadata from '@/data/siteMetadata'
import { getBlogPostBySlug, getBlogPosts } from 'datamain/loaders'
import { getStrapiMedia } from '../../../lib/utils'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { StrapiImage } from '@/components/StrapiImage'
import { ImageSlider } from '@/components/blog/image-slider'
import { AuthorHeader } from '@/components/blog/author-header'
import { RelatedBlogs } from '@/components/blog/related-blogs'

interface PageProps {
  params: { slug: string[] }
}

export async function generateMetadata(props: PageProps): Promise<Metadata | undefined> {
  try {
    const params = await props.params
    const slug = decodeURI(params.slug.join('/'))

    const post = await getBlogPostBySlug(slug, 'published')
    if (!post?.data?.[0]) return

    const postData = post.data[0]
    const publishedAt = new Date(postData.publishedAt).toISOString()
    const modifiedAt = new Date(postData.updatedAt).toISOString()
    const author = postData.author?.name || siteMetadata.author
    const imageList = postData.cover
      ? [getStrapiMedia(postData.cover.url)]
      : [siteMetadata.socialBanner]

    return {
      title: postData.title,
      description: postData.description,
      openGraph: {
        title: postData.title,
        description: postData.description,
        siteName: siteMetadata.title,
        locale: 'en_US',
        type: 'article',
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
        url: './',
        images: imageList.map((img) => ({
          url: img?.includes('http') ? img : siteMetadata.siteUrl + img,
        })),
        authors: [author],
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: postData.description,
        images: imageList.filter(Boolean) as string[],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return undefined // Or a default metadata object
  }
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown)
  return result.toString()
}

export default async function Page(props: PageProps) {
  try {
    const params = await props.params
    const slug = decodeURI(params.slug.join('/'))

    const post = await getBlogPostBySlug(slug, 'published')
    if (!post?.data?.[0]) return notFound()

    const postData = post.data[0]
    const mainContent = {
      title: postData.title,
      date: postData.publishedAt,
      lastmod: postData.updatedAt,
      tags: postData.category ? [postData.category.name] : [],
      summary: postData.description,
      images: postData.cover ? [getStrapiMedia(postData.cover.url)] : [],
      authors: [postData.author?.name || 'Anonymous'],
      layout: 'PostLayout',
      slug: postData.slug,
      path: `blog/${postData.slug}`,
      filePath: `blog/${postData.slug}`,
      readingTime: { text: '5 min', minutes: 5, time: 300000, words: 1000 },
      type: 'Blog' as const,
      toc: [],
      structuredData: {},
    }

    // Fetch all posts instead of category-filtered ones
    const relatedPosts = await getBlogPosts(1, '', '', 20) // Fetch more to have enough after filtering
    const filteredPosts = relatedPosts.data
      .filter((post) => post?.id !== postData.id) // Exclude current post
      .slice(0, 10) // Take first 10 posts
      .map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        image: post.cover
          ? getStrapiMedia(post.cover.url) || '/placeholder.svg'
          : '/placeholder.svg',
        category: post.category?.name || '',
      }))

    return (
      <>
        <PostSimple content={mainContent}>
          <article className="border-b border-[#DAD9D4]/50 pb-6">
            {postData.cover && (
              <StrapiImage
                src={postData.cover.url}
                alt={postData.cover.alternativeText || postData.title}
                className="mt-0 mb-8 w-full rounded-xs"
                width={800}
                height={400}
                priority
              />
            )}

            <div className="prose dark:prose-invert max-w-none">
              {await Promise.all(
                postData.blocks?.map(async (block, index) => {
                  switch (block.__component) {
                    case 'shared.rich-text': {
                      const htmlContent = await markdownToHtml(block.body)
                      return <div key={index} dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    }
                    case 'shared.media':
                      return (
                        block.file && (
                          <StrapiImage
                            key={index}
                            src={block.file.url}
                            alt={block.file.alternativeText || ''}
                            className="my-8 rounded-xs"
                            width={800}
                            height={400}
                          />
                        )
                      )
                    case 'shared.quote':
                      return (
                        <blockquote key={index} className="my-8">
                          <p className="text-xl font-semibold">{block.title}</p>
                          <p>{block.body}</p>
                        </blockquote>
                      )
                    case 'shared.slider':
                      return (
                        <div
                          key={index}
                          className="full-width-element relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen"
                        >
                          <ImageSlider
                            images={block.files.map((file) => ({
                              url: getStrapiMedia(file.url),
                              alternativeText: file.alternativeText,
                              caption: file.alternativeText,
                            }))}
                            showCaption
                            className="embla"
                          />
                        </div>
                      )
                    default:
                      return null
                  }
                }) || []
              )}
            </div>
          </article>
          {!!postData.author && (
            <AuthorHeader
              name={postData.author?.name || siteMetadata.author}
              date={new Date(postData.publishedAt)}
              image={
                postData.author?.avatar?.url
                  ? getStrapiMedia(postData.author.avatar.url) || undefined
                  : undefined
              }
              className="mt-8"
            />
          )}
        </PostSimple>
        {filteredPosts.length > 0 && <RelatedBlogs posts={filteredPosts} />}
      </>
    )
  } catch (error) {
    console.error('Error in Page component:', error)
    return notFound() // Or a more appropriate error page
  }
}
