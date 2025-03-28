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
  serviceModal: React.ReactNode
}

export default async function RootLayout({
  children,
  modal,
  params,
  serviceModal,
}: RootLayoutProps) {
  const { lang } = await params

  return (
    <div key={lang}>
      {children}
      {modal}
      {serviceModal}
    </div>
  )
}
