import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import '../../css/fonts.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from '../theme-providers'
import { Metadata } from 'next'
import { justice, helvetica } from '@/css/fonts'
import { getAvailableLocales } from 'datamain/services/locales'

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch locales at the layout level
  let localesJson = '[]'
  try {
    const locales = getAvailableLocales()
    localesJson = JSON.stringify(locales)
  } catch (error) {
    console.error('Error fetching locales in layout:', error)
  }

  return (
    <ThemeProviders>
      <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
      <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
        <main className="mb-auto">
          <script
            id="language-selector-data"
            type="application/json"
            dangerouslySetInnerHTML={{ __html: localesJson }}
          />
          {children}
          <div id="modal-root" />
        </main>
      </SearchProvider>
    </ThemeProviders>
  )
}
