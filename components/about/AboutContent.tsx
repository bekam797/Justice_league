'use client'

import { StrapiImage } from '@/components/StrapiImage'
import React, { useEffect, useState } from 'react'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

interface AboutData {
  id: number
  documentId: string
  blocks: Array<{
    id: number
    body: string
  }>
  image: {
    id: number
    url: string
    alternativeText: string
    name: string
  }
  seo: Array<{
    id: number
    metaTitle: string
    metaDescription: string
    shareImage: {
      id: number
      url: string
      alternativeText: string
    }
  }>
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export default function AboutContent({ aboutData }: { aboutData: AboutData }) {
  const [htmlContent, setHtmlContent] = useState<string>('')

  useEffect(() => {
    // Move the async operation into useEffect
    const processMarkdown = async () => {
      const result = await remark()
        .use(remarkGfm)
        .use(remarkHtml)
        .process(aboutData?.blocks[0]?.body)
      setHtmlContent(result.toString())
    }

    processMarkdown()
  }, [aboutData])
  return (
    <div className="mx-auto max-w-[816px] px-4 pt-28 lg:px-0">
      {aboutData.image && (
        <StrapiImage
          src={aboutData?.image?.url}
          alt={aboutData?.image?.alternativeText || aboutData?.seo[0]?.metaTitle}
          className="mt-0 mb-8 w-full rounded-xs"
          width={800}
          height={400}
          priority
        />
      )}

      <div className="prose dark:prose-invert max-w-none text-white">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  )
}
