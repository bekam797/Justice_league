'use client'

import type React from 'react'
import Image from 'next/image'
import LocalizedLink from '@/components/LocalizedLink'
import { getStrapiMedia } from 'lib/utils'

interface ServicesCardProps {
  image: Array<{
    url: string
    alternativeText: string
  }>
  title: string
  smallDescription: string
  slug: string
  cardNumber: number
  totalCards: number
}

const ServicesCard: React.FC<ServicesCardProps> = ({
  image,
  title,
  smallDescription,
  slug,
  cardNumber,
  totalCards,
}) => {
  return (
    <LocalizedLink
      href={`/services/${slug}`}
      className="flex max-w-[462px] flex-col justify-center overflow-hidden rounded-sm bg-white p-4 text-black"
      aria-label={`View details for ${title}, ${smallDescription}`}
    >
      <section className="flex w-full flex-col rounded-xs border border-solid border-black">
        <header className="flex w-full justify-between gap-5 p-4 pb-0">
          <h2 className="font-justice w-full text-4xl leading-10">{title}</h2>
          <span className="self-start text-right text-sm leading-none">
            {String(cardNumber).padStart(2, '0')}
            <span className="text-black">/{String(totalCards).padStart(2, '0')}</span>
          </span>
        </header>

        <figure className="mt-16 mb-6 w-full self-start">
          <Image
            src={getStrapiMedia(image[0]?.url) || ''}
            alt={image[0]?.alternativeText || ''}
            className="aspect-[1.87] w-full object-contain"
            width={342}
            height={442}
          />
        </figure>

        <p className="font-helvetica p-4 pt-0 text-xs leading-tight whitespace-pre-line">
          {smallDescription}
        </p>
      </section>
    </LocalizedLink>
  )
}

export default ServicesCard
