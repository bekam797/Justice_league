'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

// Hardcoded locales to prevent flash of content
const SUPPORTED_LOCALES = ['en', 'ka', 'ru']

export function DynamicFooter() {
  const pathname = usePathname()

  // Extract locale from the pathname
  const pathSegments = pathname.split('/').filter(Boolean)

  // Check if we're on a root path (either / or /{locale})
  const isRootPath =
    pathname === '/' || (pathSegments.length === 1 && SUPPORTED_LOCALES.includes(pathSegments[0]))

  // Hide footer on root paths
  if (isRootPath) return null

  return <Footer />
}
