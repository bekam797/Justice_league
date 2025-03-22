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
