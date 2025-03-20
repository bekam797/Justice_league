import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_BASE_URL
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null
  if (url.startsWith('data:')) return url
  if (url.startsWith('http') || url.startsWith('//')) return url

  return `${getStrapiURL()}${url}`
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
}

// Function to get a member's slug from their name
export function getMemberSlug(name: string): string {
  return slugify(name)
}
