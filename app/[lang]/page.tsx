import { getMenuItemData } from 'datamain/loaders'
import MenuContent from '@/components/landing/menu-content'
import { LandingLanguageSelector } from '@/components/landing/LandingLanguageSelector'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export default async function Home(props: Props) {
  const { lang } = await props.params
  const response = await getMenuItemData(lang)

  // Make sure we have an array of menu items
  const menuItems = Array.isArray(response.data) ? response.data : []

  return (
    <>
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <MenuContent menuItems={menuItems} />
          <LandingLanguageSelector />
        </div>
      </main>
    </>
  )
}
