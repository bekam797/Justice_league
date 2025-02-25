'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export function DynamicHeader() {
  const pathname = usePathname()

  const hideHeaderPaths = [/^\/$/]

  const shouldHideHeader = hideHeaderPaths.some((pattern) => pathname.match(pattern))

  if (shouldHideHeader) return null
  return <Header />
}
