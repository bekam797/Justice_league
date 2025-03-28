// // This file can be deleted or emptied as Next.js i18n will handle the routing

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const PUBLIC_FILE = /\.(.*)$/
// const DEFAULT_LOCALE = 'en'
// const SUPPORTED_LOCALES = ['en', 'ka', 'ru']

// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname

//   // Skip public files and API routes
//   if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/_next') || pathname.includes('/api/')) {
//     return NextResponse.next()
//   }

//   const segments = pathname.split('/').filter(Boolean)
//   const firstSegment = segments[0] || ''

//   // If already has a supported non-default locale, let it pass through
//   if (SUPPORTED_LOCALES.includes(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
//     return NextResponse.next()
//   }

//   // For paths without locale or with default locale
//   // Always rewrite to include the default locale internally
//   // if (firstSegment === DEFAULT_LOCALE) {
//   //   // If URL has default locale explicitly, redirect to remove it
//   //   const newPathname = '/' + segments.slice(1).join('/')
//   //   return NextResponse.redirect(new URL(newPathname, request.url))
//   // } else {
//   //   // Rewrite the URL to include the default locale internally
//   //   const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
//   //   return NextResponse.rewrite(newUrl)
//   // }
//   if (firstSegment === DEFAULT_LOCALE) {
//     // If URL has default locale explicitly, redirect to remove it
//     const newPathname = '/' + segments.slice(1).join('/')
//     const newUrl = new URL(newPathname, request.url)

//     // Preserve any search parameters
//     const searchParams = request.nextUrl.searchParams
//     searchParams.forEach((value, key) => {
//       newUrl.searchParams.set(key, value)
//     })

//     return NextResponse.redirect(newUrl)
//   } else {
//     // Rewrite the URL to include the default locale internally
//     const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)

//     // Preserve any search parameters
//     const searchParams = request.nextUrl.searchParams
//     searchParams.forEach((value, key) => {
//       newUrl.searchParams.set(key, value)
//     })

//     return NextResponse.rewrite(newUrl)
//   }
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for:
//      * - api routes
//      * - static files
//      * - favicon.ico
//      * - robots.txt
//      * - _next folder
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
//   ],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(
        new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
      )
    }

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
