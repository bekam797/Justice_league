export type PostData = {
  id: string
  title: string
  featured: boolean
  publishedAt: string
  updatedAt: string
  description: string
  slug: string
  category?: { name: string }
  cover?: { url: string }
  author?: { name: string }
}

// Add type for Strapi pagination meta
export type StrapiMeta = {
  pagination: {
    pageCount: number
    page: number
    pageSize: number
    total: number
  }
}

// Add or update the Blog interface to include the featured property
export interface Blog {
  // existing properties...
  featured?: boolean
  // other properties...
}
