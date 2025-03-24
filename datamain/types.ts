interface TeamMemberResponse {
  data: TeamMember[]
  meta: object
}

interface TeamMember {
  id: number
  documentId: string
  name: string
  position: string
  imageUrl: {
    id: number
    url: string
    alternativeText: string
    name: string
    // other properties as needed
  }
  description: string
  socialLinks: {
    id: number
    linkedin: string
    twitter: string
    email: string
  }[]
  // other properties as needed
}

interface ServicesResponse {
  data: {
    id: number
    title: string
    description: string
    services: Array<{
      id: number
      Title: string
      slug: string
      small_description: string
      image: Array<{ url: string; alternativeText: string }>
      service_content: Array<{ body: string }>
    }>
    createdAt: string
    documentId: string
    locale: string
    publishedAt: string
    updatedAt: string
  }
  meta: object
}
