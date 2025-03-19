'use client'

import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue, useMotionValue } from 'framer-motion'
import Image from 'next/image'

// Define image size options
type ImageSize = 'small' | 'medium' | 'large' | 'thumbnail' | 'featured' | 'wide'

// Define image shape options
type ImageShape = 'square' | 'rounded' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'circle'

// Define image interface for internal components
interface ImageData {
  src: string
  hoverSrc?: string
  alt: string
  size?: ImageSize
  shape?: ImageShape
}

// Define simple gallery data interface
interface GalleryData {
  title: string
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

// Component for rendering a single image with sprouting animation
interface ImageThumbnailProps {
  src: string
  hoverSrc?: string
  alt: string
  size?: ImageSize
  shape?: ImageShape
  className?: string
  scrollYProgress?: MotionValue<number>
  priority?: 'high' | 'medium' | 'low'
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  hoverSrc,
  alt,
  size,
  shape,
  className = '',
  scrollYProgress,
  priority = 'medium',
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const sizeClass = getSizeClassName(size)

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

  // Determine which image to display
  const displaySrc = isHovered && hoverSrc ? hoverSrc : src

  return (
    <figure className="flex h-full items-center justify-center overflow-hidden">
      <motion.div
        style={{
          scaleY: useAnimations ? scaleY : 1,
          scaleX: useAnimations ? scaleX : 1,
          opacity: useAnimations ? opacity : 1,
        }}
        className="flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={displaySrc || '/placeholder.svg'}
            alt={alt}
            className={`aspect-square object-contain transition-all duration-300 ease-in-out ${sizeClass} rounded-md ${className} ${isHovered ? 'shadow-lg' : ''}`}
            width={500}
            height={500}
            unoptimized={displaySrc.startsWith('http')}
          />
        </motion.div>
      </motion.div>
    </figure>
  )
}

// Component for rendering a grid of images
interface ImageGridProps {
  images: ImageData[]
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
              hoverSrc={images[0].hoverSrc}
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
              hoverSrc={images[1].hoverSrc}
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
              hoverSrc={images[2].hoverSrc}
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
              hoverSrc={images[3].hoverSrc}
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
            hoverSrc={image.hoverSrc}
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

// Image Pair (vertical stack)
interface ImagePairProps {
  firstImage: ImageData
  secondImage: ImageData
  scrollYProgress?: MotionValue<number>
}

const ImagePair: React.FC<ImagePairProps> = ({ firstImage, secondImage, scrollYProgress }) => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex flex-1 items-center justify-center">
        <ImageThumbnail
          src={firstImage.src || '/placeholder.svg'}
          hoverSrc={firstImage.hoverSrc}
          alt={firstImage.alt}
          size={firstImage.size}
          shape={firstImage.shape}
          scrollYProgress={scrollYProgress}
          priority="medium"
        />
      </div>
      <div className="mt-2 flex flex-1 items-center justify-center">
        <ImageThumbnail
          src={secondImage.src || '/placeholder.svg'}
          hoverSrc={secondImage.hoverSrc}
          alt={secondImage.alt}
          size={secondImage.size}
          shape={secondImage.shape}
          scrollYProgress={scrollYProgress}
          priority="low"
        />
      </div>
    </div>
  )
}

// Single Large Image
interface SingleImageProps {
  image: ImageData
  scrollYProgress?: MotionValue<number>
  priority?: 'high' | 'medium' | 'low'
}

const SingleImage: React.FC<SingleImageProps> = ({ image, scrollYProgress, priority = 'high' }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <ImageThumbnail
        src={image.src || '/placeholder.svg'}
        hoverSrc={image.hoverSrc}
        alt={image.alt}
        size={image.size}
        shape={image.shape}
        scrollYProgress={scrollYProgress}
        priority={priority}
      />
    </div>
  )
}

// Complex Section with Main Image, Small Pair and Large Image
interface ComplexSectionProps {
  mainImage: ImageData
  smallPair: ImageData[]
  largeImage: ImageData
  thumbnailRow: ImageData[]
  scrollYProgress?: MotionValue<number>
}

const ComplexSection: React.FC<ComplexSectionProps> = ({
  mainImage,
  smallPair,
  largeImage,
  thumbnailRow,
  scrollYProgress,
}) => {
  return (
    <div className="flex h-full flex-col justify-center max-md:max-w-full">
      <div className="flex-1 max-md:max-w-full">
        <div className="flex h-full gap-2 max-md:flex-col">
          <div className="flex h-full w-2/5 flex-col justify-center max-md:ml-0 max-md:w-full">
            <div className="flex w-full flex-1 flex-col justify-center max-md:mt-2">
              <div className="flex flex-1 items-center justify-center">
                <ImageThumbnail
                  src={mainImage.src || '/placeholder.svg'}
                  hoverSrc={mainImage.hoverSrc}
                  alt={mainImage.alt}
                  size={mainImage.size}
                  shape={mainImage.shape}
                  scrollYProgress={scrollYProgress}
                  priority="medium"
                />
              </div>
              <div className="mt-2 flex flex-1 gap-2">
                {smallPair.map((image, index) => (
                  <div key={index} className="flex flex-1 items-center justify-center">
                    <ImageThumbnail
                      src={image.src || '/placeholder.svg'}
                      hoverSrc={image.hoverSrc}
                      alt={image.alt}
                      size={image.size}
                      shape={image.shape}
                      scrollYProgress={scrollYProgress}
                      priority="low"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex h-full w-3/5 items-center justify-center max-md:ml-0 max-md:w-full">
            <ImageThumbnail
              src={largeImage.src || '/placeholder.svg'}
              hoverSrc={largeImage.hoverSrc}
              alt={largeImage.alt}
              size={largeImage.size}
              shape={largeImage.shape}
              scrollYProgress={scrollYProgress}
              priority="high"
            />
          </div>
        </div>
      </div>

      {/* Row of small thumbnails */}
      <div className="mt-2 flex flex-1 gap-2">
        {thumbnailRow.map((image, index) => (
          <div key={index} className="flex flex-1 items-center justify-center">
            <ImageThumbnail
              src={image.src || '/placeholder.svg'}
              hoverSrc={image.hoverSrc}
              alt={image.alt}
              size={image.size}
              shape={image.shape}
              scrollYProgress={scrollYProgress}
              priority="low"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface ImageGalleryProps {
  galleryId?: number
  scrollYProgress?: MotionValue<number>
}

function ImageGallery({ galleryId = 1, scrollYProgress }: ImageGalleryProps) {
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

  if (loading) return <div>Loading gallery...</div>
  if (error) return <div>Error: {error}</div>
  if (!gallery) return <div>No gallery data found</div>

  // Get gallery data
  const galleryData = getGalleryData()

  return (
    <section
      className="flex w-full flex-wrap items-center justify-center gap-2 overflow-hidden md:flex-nowrap"
      ref={containerRef}
    >
      {/* First column with two stacked images */}
      <ImagePair
        firstImage={galleryData.columnPairs[0].firstImage}
        secondImage={galleryData.columnPairs[0].secondImage}
        scrollYProgress={progress}
      />

      {/* Large single image */}
      <SingleImage image={galleryData.largeImages[0]} scrollYProgress={progress} priority="high" />

      {/* Another column with two stacked images */}
      <ImagePair
        firstImage={galleryData.columnPairs[1].firstImage}
        secondImage={galleryData.columnPairs[1].secondImage}
        scrollYProgress={progress}
      />

      {/* Complex grid section */}
      <ComplexSection
        mainImage={galleryData.complexSection.mainImage}
        smallPair={galleryData.complexSection.smallPair}
        largeImage={galleryData.complexSection.largeImage}
        thumbnailRow={galleryData.complexSection.thumbnailRow}
        scrollYProgress={progress}
      />

      {/* Large rounded image */}
      <SingleImage image={galleryData.finalLargeImage} scrollYProgress={progress} priority="high" />

      {/* Grid of four images in 2x2 layout */}
      <div className="flex h-full items-center justify-center">
        <ImageGrid images={galleryData.finalGrid} scrollYProgress={progress} />
      </div>
    </section>
  )
}

// Get gallery data
function getGalleryData() {
  return {
    columnPairs: [
      {
        firstImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/88fc65a2706d16a39136c6b48eecb4f33c4ea125797ed484b814a9806d318d53?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/03f2b3421dc76f39511a63b7526bcf049fb0e0a334ca5a776e26dd5862d2f223?placeholderIfAbsent=true',
          alt: 'Client logo - Company A',
          size: 'medium' as ImageSize,
        },
        secondImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/03f2b3421dc76f39511a63b7526bcf049fb0e0a334ca5a776e26dd5862d2f223?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/03f2b3421dc76f39511a63b7526bcf049fb0e0a334ca5a776e26dd5862d2f223?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company B',
          size: 'medium' as ImageSize,
        },
      },
      {
        firstImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/b8f1a1286601b95e249666fc90f3409eeb30ffe47bafffe1c35c07da65359939?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/b8f1a1286601b95e249666fc90f3409eeb30ffe47bafffe1c35c07da65359939?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company D',
          size: 'medium' as ImageSize,
        },
        secondImage: {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/1b8cc983a8f059019b5e57e88024f1040cf4557dcfa86d1d3fd6c816c2ceaf51?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/1b8cc983a8f059019b5e57e88024f1040cf4557dcfa86d1d3fd6c816c2ceaf51?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company E',
          size: 'medium' as ImageSize,
        },
      },
    ],
    largeImages: [
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/01919aca062b14ed3d4e84b2fba7b52396bf608f94a8f1771872c7e3e21814ec?placeholderIfAbsent=true',
        hoverSrc:
          'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/01919aca062b14ed3d4e84b2fba7b52396bf608f94a8f1771872c7e3e21814ec?placeholderIfAbsent=true&highlight=true',
        alt: 'Client logo - Company C',
        size: 'large' as ImageSize,
      },
    ],
    complexSection: {
      mainImage: {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/c5bca712700565a398fa6d358a4d9f04cf11baac3e14b2fbbce2f1bc453549f7?placeholderIfAbsent=true',
        hoverSrc:
          'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/c5bca712700565a398fa6d358a4d9f04cf11baac3e14b2fbbce2f1bc453549f7?placeholderIfAbsent=true&highlight=true',
        alt: 'Client logo - Company F',
        size: 'medium' as ImageSize,
      },
      smallPair: [
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/7ecce588b435139c2ded640ce214071b2fceab5ed921cfa4f7f0379bd3e08ba1?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/7ecce588b435139c2ded640ce214071b2fceab5ed921cfa4f7f0379bd3e08ba1?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company G',
          size: 'small' as ImageSize,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/0b472bcd8227d9721e3b0f22b9dcb54d8fc40daf9663397095950d18e0243971?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/0b472bcd8227d9721e3b0f22b9dcb54d8fc40daf9663397095950d18e0243971?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company H',
          size: 'small' as ImageSize,
        },
      ],
      largeImage: {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/7577fe3c27370f03c2eeaa88dd602f03609138a810e7d5b3a73340dc6ab0a093?placeholderIfAbsent=true',
        hoverSrc:
          'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/7577fe3c27370f03c2eeaa88dd602f03609138a810e7d5b3a73340dc6ab0a093?placeholderIfAbsent=true&highlight=true',
        alt: 'Client logo - Company I',
        size: 'wide' as ImageSize,
        shape: 'rounded-xl' as ImageShape,
      },
      thumbnailRow: [
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/cf7408790aaf8c65ee36d2ae1153462b016b8401004f8d0042f556daf8e35d1f?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/cf7408790aaf8c65ee36d2ae1153462b016b8401004f8d0042f556daf8e35d1f?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company J',
          size: 'thumbnail' as ImageSize,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/40c4552c00d6ac5f20eeed3e2c6eebc5f7d852118f0911456899128e9636c591?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/40c4552c00d6ac5f20eeed3e2c6eebc5f7d852118f0911456899128e9636c591?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company K',
          size: 'thumbnail' as ImageSize,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/71270e2706194a68e6d94198dd09c52cf3e3b70b191444e92c1594098309ca5a?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/71270e2706194a68e6d94198dd09c52cf3e3b70b191444e92c1594098309ca5a?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company L',
          size: 'thumbnail' as ImageSize,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/425ab7ff935460fb4a4c2c8fb6c1de66c29a24a70af94817ec7701c824349629?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/425ab7ff935460fb4a4c2c8fb6c1de66c29a24a70af94817ec7701c824349629?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company M',
          size: 'thumbnail' as ImageSize,
        },
        {
          src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/2e711298a15c48c6c5bf1bdbc564a0f32a608965131fe814f2b3191df6ccb2e1?placeholderIfAbsent=true',
          hoverSrc:
            'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/2e711298a15c48c6c5bf1bdbc564a0f32a608965131fe814f2b3191df6ccb2e1?placeholderIfAbsent=true&highlight=true',
          alt: 'Client logo - Company N',
          size: 'thumbnail' as ImageSize,
        },
      ],
    },
    finalLargeImage: {
      src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/141c726cc673bdc5bfb221cbdd2cd9a5c3436cdbab14f391b4b1a49c131794b3?placeholderIfAbsent=true',
      hoverSrc:
        'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/141c726cc673bdc5bfb221cbdd2cd9a5c3436cdbab14f391b4b1a49c131794b3?placeholderIfAbsent=true&highlight=true',
      alt: 'Client logo - Company O',
      size: 'featured' as ImageSize,
      shape: 'rounded-2xl' as ImageShape,
    },
    finalGrid: [
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/515a525587d4e47b8054ea0584d80e2350f191f46e844c84164aa4eff1187565?placeholderIfAbsent=true',
        hoverSrc:
          'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/515a525587d4e47b8054ea0584d80e2350f191f46e844c84164aa4eff1187565?placeholderIfAbsent=true&highlight=true',
        alt: 'Client logo - Company P',
        size: 'medium' as ImageSize,
        shape: 'rounded-lg' as ImageShape,
      },
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/4d16fd4f56d156622a137eb2f79c150a1eed66d4db5258b489fd52b250b3e190?placeholderIfAbsent=true',
        hoverSrc:
          'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/4d16fd4f56d156622a137eb2f79c150a1eed66d4db5258b489fd52b250b3e190?placeholderIfAbsent=true&highlight=true',
        alt: 'Client logo - Company Q',
        size: 'medium' as ImageSize,
      },
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/493c3d1924178d15a107293006ec1fbfb91c4e14b820f67e86c290a58a86b834?placeholderIfAbsent=true',
        hoverSrc:
          'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/493c3d1924178d15a107293006ec1fbfb91c4e14b820f67e86c290a58a86b834?placeholderIfAbsent=true&highlight=true',
        alt: 'Client logo - Company R',
        size: 'medium' as ImageSize,
      },
      {
        src: 'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/5822f2300ed97d61fde5d8bd9600de8f96b743616680f8d82dd0c3725357eba3?placeholderIfAbsent=true',
        hoverSrc:
          'https://cdn.builder.io/api/v1/image/assets/22903d916bb14140b07e5ba227e3ce1b/5822f2300ed97d61fde5d8bd9600de8f96b743616680f8d82dd0c3725357eba3?placeholderIfAbsent=true&highlight=true',
        alt: 'Client logo - Company S',
        size: 'medium' as ImageSize,
      },
    ],
  }
}

export default ImageGallery
