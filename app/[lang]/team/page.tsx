import HeroWithAnimation from '@/components/common/HeroWithAnimation'
import { TeamJustice } from '@/components/icons/TeamJustice'
import TeamMembersGrid from '@/components/team/TeamMembersGrid'
import { getTeam } from 'datamain/loaders'
import { getStrapiMedia } from 'lib/utils'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export default async function TeamPage({ params }: Props) {
  const { lang } = await params

  const getTeamMembers = await getTeam(lang)

  const { data: teamMembers } = getTeamMembers

  const formatedTeamMembers = teamMembers?.team_members?.map((teamMember) =>
    formatTeamMember(teamMember)
  )

  return (
    <div>
      <HeroWithAnimation
        backgroundSvg={<TeamJustice className="h-full w-full opacity-10" />}
        badgeTitle={teamMembers?.title}
        sectionTitle={teamMembers?.description}
      />
      <TeamMembersGrid teamMembers={formatedTeamMembers} />
    </div>
  )
}

function formatTeamMember(teamMember) {
  return {
    id: teamMember.id,
    name: teamMember.name,
    position: teamMember.position,
    imageUrl: getStrapiMedia(teamMember.imageUrl.url) || '',
    description: teamMember.description[0]?.children[0]?.text || '',
    socialLinks: teamMember.socialLinks[0] || {},
    slug: teamMember.slug || `${teamMember.id}`,
  }
}
