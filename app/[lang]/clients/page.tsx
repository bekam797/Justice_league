import HeroWithAnimation from '@/components/common/HeroWithAnimation'
import ClientsEntranceAlt from '@/components/clients/ClientsEntrance'
import { Briefcase } from '@/components/icons/BriefCase'

export default function ClientsHome() {
  return (
    <>
      <HeroWithAnimation
        badgeTitle="Clients"
        sectionTitle="Dedicated to protecting your rights and achieving your legal goals"
        backgroundSvg={<Briefcase className="h-full w-full" />}
      />
      <ClientsEntranceAlt />
    </>
  )
}
