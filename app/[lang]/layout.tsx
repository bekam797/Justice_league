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

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
  params: Promise<{
    lang: string
  }>
}

export default async function RootLayout({ children, modal, params }: RootLayoutProps) {
  const { lang } = await params

  return (
    <div key={lang}>
      {children}
      {modal}
    </div>
  )
}
