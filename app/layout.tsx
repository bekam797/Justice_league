import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import './fonts.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { justice, helvetica } from 'app/fonts'
import { getAvailableLocales } from 'datamain/services/locales'
import { TranslationProvider } from 'lib/contexts/TranslationContext'

interface LayoutProps {
  params: Promise<{
    lang: string
  }>
  children: React.ReactNode
}

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

export default async function GlobalLayout(props: LayoutProps) {
  const { lang } = await props.params
  const basePath = process.env.BASE_PATH || ''

  // Fetch locales at the layout level
  let localesJson = '[]'
  try {
    const locales = await getAvailableLocales()
    localesJson = JSON.stringify(locales)
  } catch (error) {
    console.error('Error fetching locales in layout:', error)
  }

  return (
    <html
      lang={lang}
      className={`${justice.variable} ${helvetica.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${basePath}/static/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/static/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/static/favicons/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
        <link
          rel="mask-icon"
          href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </head>
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-black dark:text-white">
        <TranslationProvider>
          <ThemeProviders>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <main className="mb-auto">
                <script
                  id="language-selector-data"
                  type="application/json"
                  dangerouslySetInnerHTML={{ __html: localesJson }}
                />

                {props.children}
              </main>
            </SearchProvider>
          </ThemeProviders>
        </TranslationProvider>
      </body>
    </html>
  )
}
