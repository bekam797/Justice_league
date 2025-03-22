import { TeamMember } from '@/components/team/types'
import TeamMemberSinglePage from '@/components/team/TeamMembersSinglePage'
import { getTeamMemberBySlug } from 'datamain/loaders'

interface TeamMemberPageProps {
  params: Promise<{
    lang: string
    id: string
  }>
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { id, lang } = await params
  const response = await getTeamMemberBySlug(id, lang)

  const member = response.data[0]

  // Transform the data structure to match the expected TeamMember type
  const transformedMember: TeamMember = {
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
    slug: id,
  }

  return <TeamMemberSinglePage member={transformedMember} />
}
