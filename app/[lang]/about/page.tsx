import React from 'react'
import AboutContent from '@/components/about/AboutContent'
import { getAboutPage } from 'datamain/loaders'

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function page(props: PageProps) {
  const { lang } = await props.params
  const getAboutData = await getAboutPage(lang)

  const aboutData = getAboutData.data

  return (
    <div className="pt28 flex flex-col items-center justify-center">
      <AboutContent aboutData={aboutData} />
    </div>
  )
}
