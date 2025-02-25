'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export function DynamicFooter() {
  const pathname = usePathname()

  const hideHeaderPaths = [/^\/$/]

  const shouldHideHeader = hideHeaderPaths.some((pattern) => pathname.match(pattern))

  if (shouldHideHeader) return null
  return <Footer />
}
