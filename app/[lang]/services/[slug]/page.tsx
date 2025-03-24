import ServiceSinglePage from '@/components/services/ServicesSinglePage'
import { getServicesBySlug } from 'datamain/loaders'
import { ServicesData } from '@/components/services/types'

interface TeamMemberPageProps {
  params: Promise<{
    lang: string
    slug: string
  }>
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug, lang } = await params
  const response = await getServicesBySlug(slug, lang)

  const service = response.data[0]

  // Transform the data structure to match the expected TeamMember type
  const transformedService: ServicesData = {
    id: service.id,
    title: service.Title,
    smallDescription: service.small_description || '',
    image: service.image || [{ url: '', alternativeText: '' }],
    content: service.service_content[0]?.body || '',
    slug: service.slug || `${service.id}`,
  }

  return <ServiceSinglePage services={transformedService} />
}
