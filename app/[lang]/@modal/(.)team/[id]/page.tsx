import Modal from '@/components/team/TeamMemberModal'
import { getTeamMemberBySlug } from 'datamain/loaders'
import { notFound } from 'next/navigation'

export default async function ModalPage({ params }) {
  // Await params before destructuring
  const resolvedParams = await Promise.resolve(params)
  const { id, lang } = resolvedParams

  // Fetch data on the server
  const response = await getTeamMemberBySlug(id, lang)

  if (!response.data || response.data.length === 0) {
    notFound()
  }

  const member = response.data[0]

  // Transform data
  const transformedMember = {
    id: member.id,
    name: member.name,
    position: member.position,
    imageUrl: member.imageUrl.url,
    description: Array.isArray(member.description)
      ? member.description
          .map((block) => block.children?.map((child) => child.text).join(''))
          .join('\n')
      : member.description,
    socialLinks: member.socialLinks?.[0] || {},
  }

  // Pass the member data to the modal
  return <Modal member={transformedMember} />
}
