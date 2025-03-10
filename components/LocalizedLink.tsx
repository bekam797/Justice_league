'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface LocalizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  locale?: string
  prefetch?: boolean
  scroll?: boolean
  replace?: boolean
  shallow?: boolean
}

export default function LocalizedLink({
  href,
  children,
  className,
  locale,
  ...rest
}: LocalizedLinkProps) {
  const pathname = usePathname()

  // Extract locale from the pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale =
    locale || (pathSegments[0] === 'ka' || pathSegments[0] === 'ru' ? pathSegments[0] : 'en')

  // Don't add locale prefix for default locale (en)
  const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`

  // Handle both absolute and relative paths
  const localizedHref = href.startsWith('/') ? `${localePrefix}${href}` : href

  return (
    <Link href={localizedHref} className={className} {...rest}>
      {children}
    </Link>
  )
}
