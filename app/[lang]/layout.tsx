import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import '../fonts.css'

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
