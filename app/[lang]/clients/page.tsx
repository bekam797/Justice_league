import HeroWithAnimation from '@/components/common/HeroWithAnimation'
import ClientsEntranceAlt from '@/components/clients/ClientsEntrance'
import { Briefcase } from '@/components/icons/BriefCase'
import { getClientsPage } from 'datamain/loaders'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export default async function ClientsHome({ params }: Props) {
  const { lang } = await params
  const clientsPage = await getClientsPage(lang)

  const clients = clientsPage.data

  const formatedClients = clients?.client_image_galleries?.map((client) => formatClients(client))

  return (
    <>
      <HeroWithAnimation
        badgeTitle={clientsPage?.data?.title}
        sectionTitle={clientsPage?.data?.description}
        backgroundSvg={<Briefcase className="h-full w-full" />}
      />
      <ClientsEntranceAlt clientsPage={formatedClients} />
    </>
  )
}

function formatClients(client) {
  // Determine image size dimensions based on the size property
  let width = 170
  let height = 170

  switch (client.size) {
    case 'small':
      width = 80
      height = 80
      break
    case 'medium':
      width = 170
      height = 170
      break
    case 'large':
      width = 250
      height = 250
      break
    case 'featured':
      width = 300
      height = 300
      break
  }

  return {
    id: client.id,
    src: client.src,
    hoverSrc: client.hoveredSrc || client.src, // Fallback to src if hoveredSrc doesn't exist
    size: client.size,
    width,
    height,
  }
}
