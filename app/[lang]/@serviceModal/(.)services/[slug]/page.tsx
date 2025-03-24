import Modal from '@/components/services/ServicesModal'
import { getServicesBySlug } from 'datamain/loaders'

export default async function ServicesModalPage({ params }) {
  // Await params before destructuring
  const resolvedParams = await Promise.resolve(params)
  const { slug, lang } = resolvedParams

  // Fetch data on the server
  const response = await getServicesBySlug(slug, lang)

  const service = response.data[0]

  // Transform data
  const transformedService = {
    id: service.id,
    title: service.Title,
    content: service.service_content[0]?.body || '',
    slug: service.slug || `${service.id}`,
  }

  // Pass the member data to the modal
  return <Modal services={transformedService} />
}
