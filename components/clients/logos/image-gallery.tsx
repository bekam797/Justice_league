'use client'

import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue, useMotionValue } from 'framer-motion'
import Image from 'next/image'

// Define image size options
type ImageSize = 'small' | 'medium' | 'large' | 'thumbnail' | 'featured' | 'wide'

// Define image shape options
type ImageShape = 'square' | 'rounded' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'circle'

// Define the structure for image data from Strapi
interface StrapiImage {
  id: number
  attributes: {
    url: string
    alternativeText?: string
    caption?: string
    size?: ImageSize
    shape?: ImageShape
    width?: number
    height?: number
  }
}

// Define gallery section types
type SectionType =
  | 'pair-vertical'
  | 'pair-horizontal'
  | 'single'
  | 'grid-2x2'
  | 'row'
  | 'complex-section'
  | 'large-image'

// Define the structure for a gallery section from Strapi
interface StrapiGallerySection {
  id: number
  attributes: {
    type: SectionType
    images: {
      data: StrapiImage[]
    }
    spacing?: string
  }
}

// Define the structure for the entire gallery from Strapi
interface StrapiGallery {
  id: number
  attributes: {
    title: string
    sections: {
      data: StrapiGallerySection[]
    }
  }
}

// Add this interface at the top level with other interfaces
interface GalleryData {
  data: {
    id: number
    attributes: {
      title: string
      // Add other properties as needed
    }
  }
}

// Helper function to map size to className
const getSizeClassName = (size?: ImageSize): string => {
  switch (size) {
    case 'small':
      return 'w-20 shrink-0'
    case 'medium':
      return 'w-full max-w-[170px]'
    case 'large':
      return 'w-full max-w-[349px] shrink-0'
    case 'thumbnail':
      return 'w-20 shrink-0'
    case 'featured':
      return 'w-[348px] max-w-full shrink-0'
    case 'wide':
      return 'w-full rounded-xl'
    default:
      return 'w-full max-w-[170px]' // Default to medium
  }
}

// Helper function to map shape to className
const getShapeClassName = (shape?: ImageShape): string => {
  switch (shape) {
    case 'square':
      return ''
    case 'rounded':
      return 'rounded'
    case 'rounded-lg':
      return 'rounded-lg'
    case 'rounded-xl':
      return 'rounded-xl'
    case 'rounded-2xl':
      return 'rounded-2xl'
    case 'circle':
      return 'rounded-full'
    default:
      return 'rounded-md' // Default
  }
}

// Helper function to determine if an image is "large"
const isLargeImage = (size?: ImageSize): boolean => {
  return size === 'large' || size === 'featured' || size === 'wide'
}

// Component for rendering a single image with sprouting animation
interface ImageThumbnailProps {
  src: string
  alt: string
  size?: ImageSize
  shape?: ImageShape
  className?: string
  scrollYProgress?: MotionValue<number>
  priority?: 'high' | 'medium' | 'low'
  parentScale?: MotionValue<number>
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  alt,
  size,
  shape,
  className = '',
  scrollYProgress,
  priority = 'medium',
}) => {
  const sizeClass = getSizeClassName(size)
  const shapeClass = getShapeClassName(shape)

  // Timing calculations
  const baseStart = 0.15
  const baseEnd = 0.45
  const startPoint =
    priority === 'high' ? baseStart : priority === 'medium' ? baseStart + 0.05 : baseStart + 0.1
  const endPoint =
    priority === 'high' ? baseEnd - 0.05 : priority === 'medium' ? baseEnd : baseEnd + 0.05

  // Always call hooks, but use dummy values if scrollYProgress is undefined
  const dummyMotionValue = useRef(useMotionValue(0)).current
  const effectiveScrollYProgress = scrollYProgress || dummyMotionValue

  // Now call hooks unconditionally
  const scaleY = useTransform(effectiveScrollYProgress, [startPoint, endPoint], [0, 1])
  const scaleX = useTransform(effectiveScrollYProgress, [startPoint + 0.05, endPoint], [0.5, 1])
  const opacity = useTransform(effectiveScrollYProgress, [startPoint, endPoint - 0.05], [0, 1])

  // Use the values conditionally in the render
  const useAnimations = !!scrollYProgress

  return (
    <figure className="flex h-full items-center justify-center overflow-hidden">
      <motion.div
        style={{
          scaleY: useAnimations ? scaleY : 1,
          scaleX: useAnimations ? scaleX : 1,
          opacity: useAnimations ? opacity : 1,
          // Other styles...
        }}
        className="flex items-center justify-center"
      >
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          className={`aspect-square object-contain ${sizeClass} ${shapeClass} ${className}`}
          width={500}
          height={500}
          unoptimized={src.startsWith('http')}
        />
      </motion.div>
    </figure>
  )
}

// Component for rendering a grid of images
interface ImageGridProps {
  images: {
    src: string
    alt: string
    size?: ImageSize
    shape?: ImageShape
  }[]
  columns?: number
  scrollYProgress?: MotionValue<number>
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, columns = 2, scrollYProgress }) => {
  // For a 2x2 grid (4 images)
  if (images.length === 4 && columns === 2) {
    return (
      <div className="flex h-full flex-col justify-center">
        <div className="flex gap-2">
          <div className="flex items-center justify-center">
            <ImageThumbnail
              src={images[0].src || '/placeholder.svg'}
              alt={images[0].alt}
              size={images[0].size}
              shape={images[0].shape}
              scrollYProgress={scrollYProgress}
              priority="medium"
            />
          </div>
          <div className="flex items-center justify-center">
            <ImageThumbnail
              src={images[1].src || '/placeholder.svg'}
              alt={images[1].alt}
              size={images[1].size}
              shape={images[1].shape}
              scrollYProgress={scrollYProgress}
              priority="medium"
            />
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <div className="flex items-center justify-center">
            <ImageThumbnail
              src={images[2].src || '/placeholder.svg'}
              alt={images[2].alt}
              size={images[2].size}
              shape={images[2].shape}
              scrollYProgress={scrollYProgress}
              priority="low"
            />
          </div>
          <div className="flex items-center justify-center">
            <ImageThumbnail
              src={images[3].src || '/placeholder.svg'}
              alt={images[3].alt}
              size={images[3].size}
              shape={images[3].shape}
              scrollYProgress={scrollYProgress}
              priority="low"
            />
          </div>
        </div>
      </div>
    )
  }

  // For a single row of images
  return (
    <div className="flex h-full flex-wrap items-center gap-2">
      {images.map((image, index) => (
        <div key={index} className="flex items-center justify-center">
          <ImageThumbnail
            src={image.src || '/placeholder.svg'}
            alt={image.alt}
            size={image.size}
            shape={image.shape}
            scrollYProgress={scrollYProgress}
            priority="low"
          />
        </div>
      ))}
    </div>
  )
}

// Update ImageGallery interface to include parentScale
interface ImageGalleryProps {
  galleryId?: number
  scrollYProgress?: MotionValue<number>
  parentScale?: MotionValue<number>
}

function ImageGallery({ galleryId = 1, scrollYProgress, parentScale }: ImageGalleryProps) {
  // Remove the local GalleryData definition since it's now global

  const [gallery, setGallery] = useState<GalleryData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // If no external scrollYProgress is provided, create one for standalone use
  const containerRef = useRef(null)
  const localScroll = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Use provided scrollYProgress or local one
  const progress = scrollYProgress || localScroll.scrollYProgress

  // Example of how you would fetch data from Strapi
  useEffect(() => {
    // This is a mock function - in a real app, you would fetch from your Strapi API
    const fetchGallery = async () => {
      try {
        setLoading(true)
        // In a real app, replace this with your actual Strapi API call
        // const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/galleries/${galleryId}?populate=deep`)
        // const data = await response.json()

        // For now, we'll use mock data that resembles what would come from Strapi
        const mockData = getMockStrapiData()
        setGallery(mockData)
        setLoading(false)
      } catch (err) {
        setError('Failed to load gallery data')
        setLoading(false)
      }
    }

    fetchGallery()
  }, [galleryId])

  if (loading) return <div>Loading gallery...</div>
  if (error) return <div>Error: {error}</div>
  if (!gallery) return <div>No gallery data found</div>

  // Transform Strapi data to the format our components expect
  const transformedData = transformStrapiData(gallery)

  return (
    <section
      className="flex w-full items-center justify-center gap-2 overflow-hidden"
      ref={containerRef}
    >
      {/* First column with two stacked images */}
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-1 items-center justify-center">
          <ImageThumbnail
            src={transformedData.columnPairs[0].firstImage.src || '/placeholder.svg'}
            alt={transformedData.columnPairs[0].firstImage.alt}
            size={transformedData.columnPairs[0].firstImage.size}
            shape={transformedData.columnPairs[0].firstImage.shape}
            scrollYProgress={progress}
            priority="medium"
          />
        </div>
        <div className="mt-2 flex flex-1 items-center justify-center">
          <ImageThumbnail
            src={transformedData.columnPairs[0].secondImage.src || '/placeholder.svg'}
            alt={transformedData.columnPairs[0].secondImage.alt}
            size={transformedData.columnPairs[0].secondImage.size}
            shape={transformedData.columnPairs[0].secondImage.shape}
            scrollYProgress={progress}
            priority="low"
          />
        </div>
      </div>

      {/* Large single image */}
      <div className="flex h-full items-center justify-center">
        <ImageThumbnail
          src={transformedData.largeImages[0].src || '/placeholder.svg'}
          alt={transformedData.largeImages[0].alt}
          size={transformedData.largeImages[0].size}
          shape={transformedData.largeImages[0].shape}
          scrollYProgress={progress}
          priority="high" // Large image gets high priority
        />
      </div>

      {/* Another column with two stacked images */}
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-1 items-center justify-center">
          <ImageThumbnail
            src={transformedData.columnPairs[1].firstImage.src || '/placeholder.svg'}
            alt={transformedData.columnPairs[1].firstImage.alt}
            size={transformedData.columnPairs[1].firstImage.size}
            shape={transformedData.columnPairs[1].firstImage.shape}
            scrollYProgress={progress}
            priority="medium"
          />
        </div>
        <div className="mt-2 flex flex-1 items-center justify-center">
          <ImageThumbnail
            src={transformedData.columnPairs[1].secondImage.src || '/placeholder.svg'}
            alt={transformedData.columnPairs[1].secondImage.alt}
            size={transformedData.columnPairs[1].secondImage.size}
            shape={transformedData.columnPairs[1].secondImage.shape}
            scrollYProgress={progress}
            priority="low"
          />
        </div>
      </div>

      {/* Complex grid section */}
      <div className="flex h-full flex-col justify-center max-md:max-w-full">
        <div className="flex-1 max-md:max-w-full">
          <div className="flex h-full gap-2 max-md:flex-col">
            <div className="flex h-full w-2/5 flex-col justify-center max-md:ml-0 max-md:w-full">
              <div className="flex w-full flex-1 flex-col justify-center max-md:mt-2">
                <div className="flex flex-1 items-center justify-center">
                  <ImageThumbnail
                    src={transformedData.complexSection.mainImage.src || '/placeholder.svg'}
                    alt={transformedData.complexSection.mainImage.alt}
                    size={transformedData.complexSection.mainImage.size}
                    shape={transformedData.complexSection.mainImage.shape}
                    scrollYProgress={progress}
                    priority="medium"
                  />
                </div>
                <div className="mt-2 flex flex-1 gap-2">
                  <div className="flex flex-1 items-center justify-center">
                    <ImageThumbnail
                      src={transformedData.complexSection.smallPair[0].src || '/placeholder.svg'}
                      alt={transformedData.complexSection.smallPair[0].alt}
                      size={transformedData.complexSection.smallPair[0].size}
                      shape={transformedData.complexSection.smallPair[0].shape}
                      scrollYProgress={progress}
                      priority="low"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <ImageThumbnail
                      src={transformedData.complexSection.smallPair[1].src || '/placeholder.svg'}
                      alt={transformedData.complexSection.smallPair[1].alt}
                      size={transformedData.complexSection.smallPair[1].size}
                      shape={transformedData.complexSection.smallPair[1].shape}
                      scrollYProgress={progress}
                      priority="low"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full w-3/5 items-center justify-center max-md:ml-0 max-md:w-full">
              <ImageThumbnail
                src={transformedData.complexSection.largeImage.src || '/placeholder.svg'}
                alt={transformedData.complexSection.largeImage.alt}
                size={transformedData.complexSection.largeImage.size}
                shape={transformedData.complexSection.largeImage.shape}
                scrollYProgress={progress}
                priority="high" // Large image gets high priority
              />
            </div>
          </div>
        </div>

        {/* Row of small thumbnails */}
        <div className="mt-2 flex flex-1 gap-2">
          {transformedData.complexSection.thumbnailRow.map((image, index) => (
            <div key={index} className="flex flex-1 items-center justify-center">
              <ImageThumbnail
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                size={image.size}
                shape={image.shape}
                scrollYProgress={progress}
                priority="low" // Small thumbnails get low priority
              />
            </div>
          ))}
        </div>
      </div>

      {/* Large rounded image */}
      <div className="flex h-full items-center justify-center">
        <ImageThumbnail
          src={transformedData.finalLargeImage.src || '/placeholder.svg'}
          alt={transformedData.finalLargeImage.alt}
          size={transformedData.finalLargeImage.size}
          shape={transformedData.finalLargeImage.shape}
          scrollYProgress={progress}
          priority="high" // Large image gets high priority
        />
      </div>

      {/* Grid of four images in 2x2 layout */}
      <div className="flex h-full items-center justify-center">
        <ImageGrid images={transformedData.finalGrid} scrollYProgress={progress} />
      </div>
    </section>
  )
}

// Helper function to transform Strapi data to our component format
function transformStrapiData(strapiData: GalleryData | Record<string, unknown>) {
  // This function would transform the Strapi data structure to match what our components expect
  // For now, we'll return mock data that matches our component structure
  return {
    columnPairs: [
      {
        firstImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/88fc65a2706d16a39136c6b48eecb4f33c4ea125797ed484b814a9806d318d53?placeholderIfAbsent=true',
          alt: 'Gallery image 1',
          size: 'medium' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
        secondImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/03f2b3421dc76f39511a63b7526bcf049fb0e0a334ca5a776e26dd5862d2f223?placeholderIfAbsent=true',
          alt: 'Gallery image 2',
          size: 'medium' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
      },
      {
        firstImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/b8f1a1286601b95e249666fc90f3409eeb30ffe47bafffe1c35c07da65359939?placeholderIfAbsent=true',
          alt: 'Gallery image 4',
          size: 'medium' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
        secondImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/1b8cc983a8f059019b5e57e88024f1040cf4557dcfa86d1d3fd6c816c2ceaf51?placeholderIfAbsent=true',
          alt: 'Gallery image 5',
          size: 'medium' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
      },
    ],
    largeImages: [
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/01919aca062b14ed3d4e84b2fba7b52396bf608f94a8f1771872c7e3e21814ec?placeholderIfAbsent=true',
        alt: 'Gallery image 3',
        size: 'large' as ImageSize,
        shape: 'rounded-md' as ImageShape,
      },
    ],
    complexSection: {
      mainImage: {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/c5bca712700565a398fa6d358a4d9f04cf11baac3e14b2fbbce2f1bc453549f7?placeholderIfAbsent=true',
        alt: 'Gallery image 6',
        size: 'medium' as ImageSize,
        shape: 'rounded-md' as ImageShape,
      },
      smallPair: [
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/7ecce588b435139c2ded640ce214071b2fceab5ed921cfa4f7f0379bd3e08ba1?placeholderIfAbsent=true',
          alt: 'Gallery image 7',
          size: 'small' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/0b472bcd8227d9721e3b0f22b9dcb54d8fc40daf9663397095950d18e0243971?placeholderIfAbsent=true',
          alt: 'Gallery image 8',
          size: 'small' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
      ],
      largeImage: {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/7577fe3c27370f03c2eeaa88dd602f03609138a810e7d5b3a73340dc6ab0a093?placeholderIfAbsent=true',
        alt: 'Gallery image 9',
        size: 'wide' as ImageSize,
        shape: 'rounded-xl' as ImageShape,
      },
      thumbnailRow: [
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/cf7408790aaf8c65ee36d2ae1153462b016b8401004f8d0042f556daf8e35d1f?placeholderIfAbsent=true',
          alt: 'Gallery image 10',
          size: 'thumbnail' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/40c4552c00d6ac5f20eeed3e2c6eebc5f7d852118f0911456899128e9636c591?placeholderIfAbsent=true',
          alt: 'Gallery image 11',
          size: 'thumbnail' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/71270e2706194a68e6d94198dd09c52cf3e3b70b191444e92c1594098309ca5a?placeholderIfAbsent=true',
          alt: 'Gallery image 12',
          size: 'thumbnail' as ImageSize,
          shape: 'rounded' as ImageShape,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/425ab7ff935460fb4a4c2c8fb6c1de66c29a24a70af94817ec7701c824349629?placeholderIfAbsent=true',
          alt: 'Gallery image 13',
          size: 'thumbnail' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/2e711298a15c48c6c5bf1bdbc564a0f32a608965131fe814f2b3191df6ccb2e1?placeholderIfAbsent=true',
          alt: 'Gallery image 14',
          size: 'thumbnail' as ImageSize,
          shape: 'rounded-md' as ImageShape,
        },
      ],
    },
    finalLargeImage: {
      src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/141c726cc673bdc5bfb221cbdd2cd9a5c3436cdbab14f391b4b1a49c131794b3?placeholderIfAbsent=true',
      alt: 'Gallery image 15',
      size: 'featured' as ImageSize,
      shape: 'rounded-2xl' as ImageShape,
    },
    finalGrid: [
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/515a525587d4e47b8054ea0584d80e2350f191f46e844c84164aa4eff1187565?placeholderIfAbsent=true',
        alt: 'Gallery image 16',
        size: 'medium' as ImageSize,
        shape: 'rounded-lg' as ImageShape,
      },
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/4d16fd4f56d156622a137eb2f79c150a1eed66d4db5258b489fd52b250b3e190?placeholderIfAbsent=true',
        alt: 'Gallery image 17',
        size: 'medium' as ImageSize,
        shape: 'rounded-md' as ImageShape,
      },
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/493c3d1924178d15a107293006ec1fbfb91c4e14b820f67e86c290a58a86b834?placeholderIfAbsent=true',
        alt: 'Gallery image 18',
        size: 'medium' as ImageSize,
        shape: 'rounded-md' as ImageShape,
      },
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/5822f2300ed97d61fde5d8bd9600de8f96b743616680f8d82dd0c3725357eba3?placeholderIfAbsent=true',
        alt: 'Gallery image 19',
        size: 'medium' as ImageSize,
        shape: 'rounded-md' as ImageShape,
      },
    ],
  }
}

// Mock function to simulate Strapi data
function getMockStrapiData() {
  // This would be the structure of data coming from Strapi
  return {
    data: {
      id: 1,
      attributes: {
        title: 'Example Gallery',
        // In a real Strapi setup, you would define your content structure
        // This is just a placeholder to show the concept
      },
    },
  }
}

export default ImageGallery
