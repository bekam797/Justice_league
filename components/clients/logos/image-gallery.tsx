'use client'

import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'lib/use-media-query'
import { motion, useScroll, type MotionValue, useTransform } from 'framer-motion'

// Define the image data structure with hover support
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
  width: number
  height: number
}

interface ImageGalleryProps {
  galleryId: number
  scrollYProgress?: MotionValue<number>
  galleryImages?: GalleryImage[]
}

export default function ImageGallery({
  galleryId,
  scrollYProgress,
  galleryImages,
}: ImageGalleryProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [gallery, setGallery] = useState<{ title: string } | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const containerRef = useRef(null)

  const localScroll = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Use provided scrollYProgress or local one
  const progress = scrollYProgress || localScroll.scrollYProgress

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        // In a real app, replace this with your actual API call
        // const response = await fetch(`/api/galleries/${galleryId}`)
        // const data = await response.json()

        // Simulate API delay
        setTimeout(() => {
          setGallery({ title: 'Client Logo Gallery' })
          setLoading(false)
        }, 300)
      } catch (err) {
        setError('Failed to load gallery data')
        setLoading(false)
      }
    }

    fetchGallery()
  }, [galleryId])

  // Skip loading and error states if we have galleryImages
  if (loading && !galleryImages?.length) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <div className="text-white">Loading gallery...</div>
      </div>
    )
  }

  if (error && !galleryImages?.length) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <section
      className="relative h-full w-full overflow-hidden bg-black"
      aria-label="Image Gallery"
      ref={containerRef}
    >
      {isMobile ? (
        <MobileImageGallery images={galleryImages || []} progress={progress} />
      ) : (
        <DesktopImageGallery images={galleryImages || []} progress={progress} />
      )}
    </section>
  )
}

// Shared animation component to ensure consistent behavior
function AnimatedImage({
  image,
  className,
  progress,
  delay,
}: {
  image: GalleryImage
  className: string
  progress: MotionValue<number>
  delay: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Start with opacity 0 and only show when scrolling begins
  const opacity = useTransform(progress, [0, 0.1, 0.3], [0, 0, 1])
  const scale = useTransform(progress, [0, 0.1, 0.3], [0.6, 0.8, 1])
  const y = useTransform(progress, [0, 0.1, 0.3], [40, 20, 0])

  // Extract URL from Strapi image object or use string directly
  let imageSrc = ''
  if (typeof image.src === 'string') {
    imageSrc = image.src
  } else if (image.src && typeof image.src === 'object') {
    // Handle Strapi image format which might be nested
    if (image.src.url) {
      imageSrc = image.src.url
    } else if (image.src.data && image.src.data.attributes && image.src.data.attributes.url) {
      imageSrc = image.src.data.attributes.url
    }

    // Add domain if URL is relative
    if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('data:')) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337'
      imageSrc = `${baseUrl}${imageSrc}`
    }
  }

  let imageHoverSrc = ''
  if (typeof image.hoverSrc === 'string') {
    imageHoverSrc = image.hoverSrc
  } else if (image.hoverSrc && typeof image.hoverSrc === 'object') {
    // Handle Strapi image format which might be nested
    if (image.hoverSrc.url) {
      imageHoverSrc = image.hoverSrc.url
    } else if (
      image.hoverSrc.data &&
      image.hoverSrc.data.attributes &&
      image.hoverSrc.data.attributes.url
    ) {
      imageHoverSrc = image.hoverSrc.data.attributes.url
    }

    // Add domain if URL is relative
    if (imageHoverSrc && !imageHoverSrc.startsWith('http') && !imageHoverSrc.startsWith('data:')) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337'
      imageHoverSrc = `${baseUrl}${imageHoverSrc}`
    }
  }

  // Fallback to main image if hover not available
  if (!imageHoverSrc) {
    imageHoverSrc = imageSrc
  }

  // If we still don't have a proper URL, use placeholders
  if (!imageSrc) {
    imageSrc = `https://placehold.co/${image.width}x${image.height}/2d3340/ffffff?text=Logo`
    imageHoverSrc = `https://placehold.co/${image.width}x${image.height}/3d4350/ffffff?text=Logo`
  }

  const imageAlt =
    image.alt || (typeof image.src === 'object' && image.src?.alternativeText) || 'Client logo'

  return (
    <motion.div
      className={`rounded-sm bg-white/5 ${className} flex h-full w-full items-center justify-center overflow-hidden`}
      style={{
        opacity: opacity,
        scale: scale,
        y: y,
      }}
      initial={{ opacity: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full w-full items-center justify-center p-2">
        {/* @ts-ignore */}
        <img
          src={isHovered ? imageHoverSrc : imageSrc}
          alt={imageAlt}
          className="max-h-full max-w-full object-contain"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageError(true)
            // Try the placeholder as fallback
            if (!imageSrc.includes('placehold.co')) {
              e.currentTarget.src = `https://placehold.co/${image.width}x${image.height}/2d3340/ffffff?text=Error`
            }
          }}
        />
      </div>
    </motion.div>
  )
}

// Create a type for grid layout items
interface GridLayoutItem {
  gridArea: string
  imageIndex: number
  animationDelay: number
}

interface GalleryComponentProps {
  images: GalleryImage[]
  progress: MotionValue<number>
}

function MobileImageGallery({ images, progress }: GalleryComponentProps) {
  // For mobile, we'll use a subset of images in a specific layout
  const mobileImages = images.slice(0, Math.min(images.length, 14))

  // Create a motion value for the container opacity
  const containerOpacity = useTransform(progress, [0, 0.05], [0, 1])

  // Define our grid layout structure
  const gridLayout = [
    // First row
    { gridArea: 'col-start-1 row-start-1 col-span-1 row-span-1', imageIndex: 0, animationDelay: 0 },
    {
      gridArea: 'col-start-1 row-start-2 col-span-1 row-span-1',
      imageIndex: 1,
      animationDelay: 0.05,
    },
    {
      gridArea: 'col-start-2 row-start-1 col-span-2 row-span-2',
      imageIndex: 2,
      animationDelay: 0.1,
    },
    {
      gridArea: 'col-start-4 row-start-1 col-span-1 row-span-1',
      imageIndex: 3,
      animationDelay: 0.15,
    },
    {
      gridArea: 'col-start-4 row-start-2 col-span-1 row-span-1',
      imageIndex: 4,
      animationDelay: 0.2,
    },

    // Second row
    {
      gridArea: 'col-start-1 row-start-3 col-span-1 row-span-1',
      imageIndex: 5,
      animationDelay: 0.25,
    },
    {
      gridArea: 'col-start-2 row-start-3 col-span-1 row-span-1',
      imageIndex: 6,
      animationDelay: 0.3,
    },
    {
      gridArea: 'col-start-3 row-start-3 col-span-1 row-span-1',
      imageIndex: 7,
      animationDelay: 0.35,
    },
    {
      gridArea: 'col-start-4 row-start-3 col-span-1 row-span-1',
      imageIndex: 8,
      animationDelay: 0.4,
    },

    // Third row
    {
      gridArea: 'col-start-1 row-start-4 col-span-2 row-span-2',
      imageIndex: 9,
      animationDelay: 0.45,
    },
    {
      gridArea: 'col-start-3 row-start-4 col-span-1 row-span-1',
      imageIndex: 10,
      animationDelay: 0.5,
    },
    {
      gridArea: 'col-start-3 row-start-5 col-span-1 row-span-1',
      imageIndex: 11,
      animationDelay: 0.55,
    },
    {
      gridArea: 'col-start-4 row-start-4 col-span-1 row-span-1',
      imageIndex: 12,
      animationDelay: 0.6,
    },
    {
      gridArea: 'col-start-4 row-start-5 col-span-1 row-span-1',
      imageIndex: 13,
      animationDelay: 0.65,
    },
  ]

  return (
    <motion.div
      className="h-full w-full p-2"
      style={{ opacity: containerOpacity }}
      initial={{ opacity: 0 }}
    >
      <div className="grid h-full w-full auto-rows-fr grid-cols-4 grid-rows-5 gap-1">
        {gridLayout.map((item, index) => {
          if (index >= mobileImages.length) return null
          const image = mobileImages[item.imageIndex]
          if (!image) return null

          return (
            <AnimatedImage
              key={`mobile-image-${index}`}
              image={image}
              className={item.gridArea}
              progress={progress}
              delay={item.animationDelay}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

function DesktopImageGallery({ images, progress }: GalleryComponentProps) {
  // Create a motion value for the container opacity
  const containerOpacity = useTransform(progress, [0, 0.05], [0, 1])

  // Define our grid layout structure for all 19 images
  const gridLayout = [
    // Left section
    { gridArea: 'col-span-1 row-span-2 col-start-1 row-start-1', imageIndex: 0, animationDelay: 0 },
    {
      gridArea: 'col-span-1 row-span-2 col-start-1 row-start-3',
      imageIndex: 1,
      animationDelay: 0.05,
    },
    {
      gridArea: 'col-span-2 row-span-4 col-start-2 row-start-1',
      imageIndex: 2,
      animationDelay: 0.1,
    },

    // Middle-left section
    {
      gridArea: 'col-span-1 row-span-2 col-start-4 row-start-1',
      imageIndex: 3,
      animationDelay: 0.15,
    },
    {
      gridArea: 'col-span-1 row-span-2 col-start-4 row-start-3',
      imageIndex: 4,
      animationDelay: 0.2,
    },
    {
      gridArea: 'col-span-1 row-span-2 col-start-5 row-start-1',
      imageIndex: 5,
      animationDelay: 0.25,
    },
    {
      gridArea: 'col-span-1 row-span-1 col-start-5 row-start-3',
      imageIndex: 6,
      animationDelay: 0.3,
    },
    {
      gridArea: 'col-span-1 row-span-1 col-start-5 row-start-4',
      imageIndex: 7,
      animationDelay: 0.35,
    },

    // Middle section
    {
      gridArea: 'col-span-2 row-span-3 col-start-6 row-start-1',
      imageIndex: 8,
      animationDelay: 0.4,
    },
    {
      gridArea: 'col-span-1 row-span-1 col-start-6 row-start-4',
      imageIndex: 9,
      animationDelay: 0.45,
    },
    {
      gridArea: 'col-span-1 row-span-1 col-start-7 row-start-4',
      imageIndex: 10,
      animationDelay: 0.5,
    },

    // Middle-right section
    {
      gridArea: 'col-span-2 row-span-4 col-start-8 row-start-1',
      imageIndex: 12,
      animationDelay: 0.55,
    },

    // Right section
    {
      gridArea: 'col-span-1 row-span-2 col-start-10 row-start-1',
      imageIndex: 13,
      animationDelay: 0.6,
    },
    {
      gridArea: 'col-span-1 row-span-2 col-start-10 row-start-3',
      imageIndex: 14,
      animationDelay: 0.65,
    },
    {
      gridArea: 'col-span-1 row-span-2 col-start-11 row-start-1',
      imageIndex: 15,
      animationDelay: 0.7,
    },
    {
      gridArea: 'col-span-1 row-span-2 col-start-11 row-start-3',
      imageIndex: 16,
      animationDelay: 0.75,
    },

    // Far right section - added for images 17-19
    {
      gridArea: 'col-span-1 row-span-2 col-start-12 row-start-1',
      imageIndex: 17,
      animationDelay: 0.8,
    },
    {
      gridArea: 'col-span-1 row-span-1 col-start-12 row-start-3',
      imageIndex: 18,
      animationDelay: 0.85,
    },
    {
      gridArea: 'col-span-1 row-span-1 col-start-12 row-start-4',
      imageIndex: 11,
      animationDelay: 0.9,
    }, // Using image 11 which was skipped earlier
  ]

  // Use only as many images as we have available
  const limitedGridLayout = gridLayout.slice(0, Math.min(gridLayout.length, images.length))

  return (
    <motion.div
      className="mx-auto my-0 h-full w-full max-w-[1872px]"
      style={{ opacity: containerOpacity }}
      initial={{ opacity: 0 }}
    >
      <div className="grid h-full w-full auto-rows-fr grid-cols-12 grid-rows-4 gap-2 py-2">
        {limitedGridLayout.map((item, index) => {
          if (item.imageIndex >= images.length) return null
          const image = images[item.imageIndex]
          if (!image) return null

          return (
            <AnimatedImage
              key={`desktop-image-${index}`}
              image={image}
              className={item.gridArea}
              progress={progress}
              delay={item.animationDelay}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
