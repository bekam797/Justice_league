import HeroWithAnimation from '@/components/common/HeroWithAnimation'
import { TeamJustice } from '@/components/icons/TeamJustice'
import TeamMembersGrid from '@/components/team/TeamMembersGrid'

export default function TeamPage() {
  return (
    <div>
      <HeroWithAnimation
        badgeTitle="Team"
        sectionTitle="legal team delivering reliable, strategic solutions for your needs."
        backgroundSvg={<TeamJustice className="h-full w-full opacity-10" />}
      />
      <TeamMembersGrid />
    </div>
  )
}
