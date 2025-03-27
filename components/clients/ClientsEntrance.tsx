'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ClientsLogoTop } from './logos/ClientsLogoTop'
import { ClientsLogoBottom } from './logos/ClientsLogoBottom'
import ImageGallery from './logos/image-gallery'

// Define an interface for the gallery image type
interface GalleryImage {
  id: string | number
  src:
    | string
    | {
        id?: number
        documentId?: string
        url?: string
        alternativeText?: string | null
        name?: string
        data?: {
          attributes?: {
            url?: string
          }
        }
      }
  hoverSrc:
    | string
    | {
        id?: number
        documentId?: string
        url?: string
        alternativeText?: string | null
        data?: {
          attributes?: {
            url?: string
          }
        }
      }
  alt?: string
  size?: string
  width: number
  height: number
}

interface ClientsEntranceProps {
  clientsPage?:
    | GalleryImage[]
    | {
        data?: {
          client_image_galleries?: GalleryImage[]
        }
        client_image_galleries?: GalleryImage[]
      }
}

// Example data to use as fallback
const FALLBACK_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/88fc65a2706d16a39136c6b48eecb4f33c4ea125797ed484b814a9806d318d53',
    hoverSrc:
      'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/03f2b3421dc76f39511a63b7526bcf049fb0e0a334ca5a776e26dd5862d2f223',
    alt: 'Logo 1',
    size: 'medium',
    width: 170,
    height: 170,
  },
  {
    id: '2',
    src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/03f2b3421dc76f39511a63b7526bcf049fb0e0a334ca5a776e26dd5862d2f223',
    hoverSrc:
      'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/03f2b3421dc76f39511a63b7526bcf049fb0e0a334ca5a776e26dd5862d2f223',
    alt: 'Logo 2',
    size: 'medium',
    width: 170,
    height: 170,
  },
]

export default function ClientsEntrance({ clientsPage }: ClientsEntranceProps) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Adjust the gap to start smaller and grow more gradually
  const gap = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 0, 350])
  const svgOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.2])

  let galleryImages: GalleryImage[] = []

  if (Array.isArray(clientsPage)) {
    galleryImages = clientsPage
  } else if (
    clientsPage &&
    'data' in clientsPage &&
    clientsPage.data &&
    'client_image_galleries' in clientsPage.data
  ) {
    galleryImages = clientsPage.data.client_image_galleries || []
  } else if (clientsPage && 'client_image_galleries' in clientsPage) {
    galleryImages = clientsPage.client_image_galleries || []
  } else {
    // Use fallback data if nothing else is available
    galleryImages = FALLBACK_IMAGES
  }

  // Verify each image has the required properties
  const validGalleryImages = galleryImages.map((img) => {
    // Ensure each image has width and height
    if (!img.width || !img.height) {
      return {
        ...img,
        width: img.width || 170,
        height: img.height || 170,
      }
    }
    return img
  })

  return (
    <div className="relative h-[200vh] bg-black" ref={containerRef}>
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2,
          }}
          style={{ opacity: svgOpacity }}
          className="-mt-16 w-full md:-mt-16"
        >
          <ClientsLogoTop className="h-auto w-full text-white" />
        </motion.div>

        <motion.div
          style={{ height: gap }}
          className="flex w-full items-center justify-center overflow-hidden"
        >
          <motion.div
            className="flex h-[350px] w-full items-center justify-center px-1 md:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Pass the scrollYProgress to the ImageGallery */}
            <ImageGallery
              galleryId={1}
              scrollYProgress={scrollYProgress}
              galleryImages={validGalleryImages}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.4,
          }}
          className="mt-[-1px] -mb-16 w-full md:-mb-16"
          style={{ opacity: svgOpacity }}
        >
          <ClientsLogoBottom className="h-auto w-full text-white" />
        </motion.div>
      </div>
    </div>
  )
}
