'use client'

import { Suspense, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getStrapiMedia } from 'lib/utils'
import UppercaseText from '@/components/common/UppercaseText'
import LocalizedLink from '@/components/LocalizedLink'
import { ServicesData } from '@/components/services/types'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

interface ServicesPageProps {
  services: ServicesData
}

const mdxContent = `
## Shiseido's NFT Celebration

Celebrating its 150th anniversary, Shiseido partnered with Cult, a
British Web3 agency, to launch #AliveWithBeauty. This campaign
introduced a limited edition collection of 150 NFTs, each a unique
piece of art generated using AI-powered co-creation. Shiseido's
commitment to accessibility and inclusivity extends to giving away
free tokens for NFT purchases, creating virtual wallets, and
establishing an exclusive NFT community.

## Mugler's Angel-Inspired NFT Collection

French fashion house Mugler joined forces with 3D artist Marc
Tudisco to present "We Are All Angel," a collection of
300 digital art pieces celebrating the 30th anniversary of the
Angel fragrance. These NFTs, resembling the iconic Angel bottle,
sold out within seconds, reflecting a value of $1.3K each after
generating $3.5K for Mugler in the initial sale.

## YSL Beauty Night Masters NFTs

YSL Beauty introduced "Night Masters," a collection of
300 NFTs created by prominent artists. Categorized into "Last
Night's Memories," "Nightfall," and "The
Rush," these NFTs contribute to YSL's Abuse Is Not Love
program. Buyers not only receive unique NFTs but also a metal
print of their purchase and a Black Opium fragrance duo set.

Let's explore how beauty brands are making digital waves in the
Makeup Metaverse, enchanting and connecting with new audiences.

The allure of the Metaverse is not just a technological trend;
it's a transformative force reshaping the beauty industry. As we
dive into this digital space, the lines between reality and the
virtual sometimes blur, creating a playground for innovation and
engagement.

The Metaverse, accessed through technologies like virtual reality
and augmented reality, is a 3D-enabled environment where users
interact with each other and digital objects. It is projected to
reach a staggering $800 billion in global revenue by 2024,
becoming a beacon for brands seeking to enchant and connect with
audiences in novel ways. This, naturally, means beauty brands see
the opportunity to redefine consumer experiences.

These are just a few examples of glamour brands embracing the
digital and shared space that is the Metaverse, connecting with
audiences across demographics and without geographical
constraints. The dynamic synergy between beauty brands and the
Metaverse can clearly be felt; it's obvious that this digital
realm is not just a trend but a transformative force.

From virtual ambassadors to NFT art collections, the Metaverse
offers a canvas for creativity and customer engagement that knows
no limits (only that of your imagination).

The journey has just begun, and the beauty Metaverse is destined
to evolve, enchant, and redefine the way we perceive glamour in
the digital age.

The journey has just begun, and the beauty Metaverse is destined
to evolve, enchant, and redefine the way we perceive glamour in
the digital age.

The journey has just begun, and the beauty Metaverse is destined
to evolve, enchant, and redefine the way we perceive glamour in
the digital age.

The journey has just begun, and the beauty Metaverse is destined
to evolve, enchant, and redefine the way we perceive glamour in
the digital age.

The journey has just begun, and the beauty Metaverse is destined
to evolve, enchant, and redefine the way we perceive glamour in
the digital age.

The journey has just begun, and the beauty Metaverse is destined
to evolve, enchant, and redefine the way we perceive glamour in
the digital age.
`

export default function ServicesMemberSinglePage({ services }: ServicesPageProps) {
  // if (!services) {
  //   notFound()
  // }

  const [htmlContent, setHtmlContent] = useState<string>('')

  useEffect(() => {
    // Move the async operation into useEffect
    const processMarkdown = async () => {
      const result = await remark().use(remarkGfm).use(remarkHtml).process(services?.content)
      setHtmlContent(result.toString())
    }

    processMarkdown()
  }, [])

  return (
    <div className="mx-auto max-w-[816px] px-4 pt-28 lg:px-0">
      <UppercaseText className="font-justice text-center text-3xl leading-[100%] font-normal tracking-tight text-white uppercase sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        {services?.title}
      </UppercaseText>
      <div className="prose dark:prose-invert services-modal-content max-w-none text-white">
        <div
          className="font-helvetica mt-16 pb-12"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
}
