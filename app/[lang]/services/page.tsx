import HeroWithAnimation from '@/components/common/HeroWithAnimation'
import { ServicesIcon } from '@/components/icons/ServicesIcon'
import ServicesGrid from '@/components/services/ServicesGrid'
import { getServices } from 'datamain/loaders'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params

  const getServicesData = await getServices(lang)

  const services = getServicesData.data

  const formatedServices = services?.services?.map((service) => formatServices(service))

  return (
    <div>
      <HeroWithAnimation
        backgroundSvg={<ServicesIcon className="h-full w-full" />}
        badgeTitle={services?.title}
        sectionTitle={services?.description}
      />
      <ServicesGrid services={formatedServices} />
    </div>
  )
}

function formatServices(service) {
  return {
    id: service.id,
    title: service.Title,
    smallDescription: service.small_description || '',
    image: service.image || [{ url: '', alternativeText: '' }],
    content: service.service_content[0]?.body || '',
    slug: service.slug || `${service.id}`,
  }
}
