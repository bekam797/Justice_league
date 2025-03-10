'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

// Hardcoded locales to prevent flash of content
const SUPPORTED_LOCALES = ['en', 'ka', 'ru']

export function DynamicHeader() {
  const pathname = usePathname()

  // Extract locale from the pathname
  const pathSegments = pathname.split('/').filter(Boolean)

  // Check if we're on a root path (either / or /{locale})
  const isRootPath =
    pathname === '/' || (pathSegments.length === 1 && SUPPORTED_LOCALES.includes(pathSegments[0]))

  // Hide header on root paths
  if (isRootPath) return null

  return <Header />
}
