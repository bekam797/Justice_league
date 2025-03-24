export interface TeamMember {
  id: number
  name: string
  position: string
  imageUrl: string
  slug: string
  specialties?: { name: string }[]
  description?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}
