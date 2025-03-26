'use client'

import { useCallback, useMemo, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowDownward } from '@/components/icons/arrows'
import { EmblaOptionsType } from 'embla-carousel'
import { useTranslation } from 'lib/contexts/TranslationContext'

interface BlogPost {
  id: string
  title: string
  slug: string
  image: string
  category?: string
}

interface RelatedBlogsProps {
  posts?: BlogPost[]
  locale?: string
}

export function RelatedBlogs({ posts, locale }: RelatedBlogsProps) {
  const { t } = useTranslation()
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [options, setOptions] = useState<EmblaOptionsType>({
    slidesToScroll: 4,
    containScroll: 'trimSnaps',
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleSlides, setVisibleSlides] = useState(4)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const validPosts = useMemo(() => {
    return Array.isArray(posts) && posts.length > 0 ? posts : []
  }, [posts])

  useEffect(() => {
    if (emblaApi) {
      const updateSlidesAndOptions = () => {
        const width = window.innerWidth
        let newVisibleSlides: number
        let newSlidesToScroll: number

        if (width >= 1024) {
          newVisibleSlides = 4
          newSlidesToScroll = 4
        } else if (width >= 768) {
          newVisibleSlides = 3
          newSlidesToScroll = 3
        } else if (width >= 640) {
          newVisibleSlides = 2
          newSlidesToScroll = 2
        } else {
          newVisibleSlides = 1
          newSlidesToScroll = 1
        }

        setVisibleSlides(newVisibleSlides)
        setOptions((prevOptions) => ({
          ...prevOptions,
          slidesToScroll: newSlidesToScroll,
        }))
      }

      updateSlidesAndOptions()
      window.addEventListener('resize', updateSlidesAndOptions)

      emblaApi.on('select', () => {
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })

      return () => {
        window.removeEventListener('resize', updateSlidesAndOptions)
      }
    }
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit(options)
    }
  }, [emblaApi, options])

  if (!validPosts || validPosts.length === 0) {
    return null
  }

  const getOpacity = (index: number) => {
    const relativeIndex = (index - currentIndex + validPosts.length) % validPosts.length
    if (visibleSlides === 4) {
      return relativeIndex === 0 || relativeIndex === 3 ? 0.5 : 1
    } else if (visibleSlides === 3) {
      return relativeIndex === 1 ? 1 : 0.5
    }
    return 1
  }

  return (
    <div className="w-full bg-black">
      <div className="mx-auto w-full px-4 py-6 md:px-6">
        {/* Header with title and navigation */}
        <div className="mx-auto mb-5 flex max-w-[930px] items-center justify-between">
          <h2 className="font-helvetica text-2xl font-light text-white">
            {t('common.moreBlogs', 'More Blogs Like This')}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ${
                !canScrollPrev ? 'cursor-not-allowed opacity-50' : ''
              }`}
              aria-label="Previous posts"
              disabled={!canScrollPrev}
            >
              <ArrowDownward className="h-3 w-3" />
            </button>
            <button
              onClick={scrollNext}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ${
                !canScrollNext ? 'cursor-not-allowed opacity-50' : ''
              }`}
              aria-label="Next posts"
              disabled={!canScrollNext}
            >
              <ArrowDownward className="h-3 w-3 rotate-180" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {validPosts.map((post, index) => (
              <div
                key={post.id}
                className="min-w-0 flex-[0_0_100%] pl-2 transition-opacity duration-300 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                style={{
                  opacity: getOpacity(index),
                }}
              >
                <Link href={`/${locale}/blog/${post.slug}`} className="block">
                  <div className="overflow-hidden rounded-[8px] bg-white/10">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={post.image || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="rounded-xs object-cover p-4 pb-3"
                      />
                    </div>
                    <div className="px-4 pb-4">
                      <h3 className="text-base leading-[100%] font-light text-white">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
