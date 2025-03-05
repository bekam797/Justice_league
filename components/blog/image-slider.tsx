'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { cn } from '../../lib/utils'
import { ArrowDownward } from '@/components/icons/arrows'

interface ImageFile {
  url: string
  alternativeText?: string
  caption?: string
}

interface ExactImageSliderProps {
  images: ImageFile[]
  className?: string
  showCaption?: boolean
}

export function ImageSlider({ images = [], className, showCaption = true }: ExactImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    containScroll: false,
    startIndex: 1,
  })

  const [selectedIndex, setSelectedIndex] = useState(1)
  const [showArrows, setShowArrows] = useState(true)

  // Create a duplicated array of images for infinite loop effect
  const displayImages = [...images, ...images, ...images]

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      const newIndex = emblaApi.selectedScrollSnap()
      setSelectedIndex(newIndex)

      // Reset to end if we're at the start
      if (newIndex === 0) {
        setTimeout(() => {
          emblaApi.scrollTo(images.length)
          setSelectedIndex(images.length)
        }, 300)
      }
    }
  }, [emblaApi, images.length])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      const newIndex = emblaApi.selectedScrollSnap()
      setSelectedIndex(newIndex)

      // Reset to start if we're at the end
      if (newIndex === displayImages.length - 1) {
        setTimeout(() => {
          emblaApi.scrollTo(images.length)
          setSelectedIndex(images.length)
        }, 300)
      }
    }
  }, [emblaApi, images.length, displayImages.length])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={cn('relative w-full bg-black', className)}>
      <div className="w-full overflow-hidden">
        <div className="relative -ml-[25%] w-[150%] pb-6" ref={emblaRef}>
          <div className="flex gap-3">
            {displayImages.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className={cn(
                  'relative flex-[0_0_33.333%] lg:flex-[0_0_930px]',
                  'transition-opacity duration-300 ease-in-out',
                  index === selectedIndex ? 'opacity-100' : 'opacity-30'
                )}
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={image.url}
                    alt={image.alternativeText || ''}
                    fill
                    className="mt-0 mb-0 rounded-xs object-cover"
                    priority={index === selectedIndex}
                    sizes="(max-width: 930px) 100vw, 930px"
                  />
                  {showCaption && image.caption && (
                    <p className="absolute right-0 bottom-[-24px] left-0 mt-0 mb-0 text-base text-white/50">
                      {image.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showArrows && images.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-[calc(50%-33.333%+24px)] z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ArrowDownward className="h-3 w-3" />
          </button>
          <button
            className="absolute top-1/2 right-[calc(50%-33.333%+24px)] z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ArrowDownward className="h-3 w-3 rotate-180" />
          </button>
        </>
      )}
    </div>
  )
}
