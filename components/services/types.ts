export interface ServicesData {
  id: number
  title: string
  smallDescription: string
  image: Array<{
    url: string
    alternativeText: string
  }>
  slug: string
  cardNumber?: number
  totalCards?: number
  content?: string
  specialties?: { name: string }[]
  description?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}
