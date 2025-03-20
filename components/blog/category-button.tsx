'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function CategoryButton({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const currentCategory = searchParams.get('category')

  const handleSelect = (value: string) => {
    // Create a new URLSearchParams object with the current search params
    const params = new URLSearchParams(searchParams.toString())

    if (value === '') {
      params.delete('category')
    } else {
      params.set('category', value)
    }

    // Reset to main blog page when changing category
    // Handle different URL patterns
    let basePath = '/blog'

    // Check if we're on a paginated page
    if (pathname.includes('/blog/page/')) {
      // We're on a paginated page, go back to main blog page
      basePath = '/blog'
    } else if (pathname === '/blog') {
      // We're already on the main blog page
      basePath = '/blog'
    } else {
      // Fallback or other blog-related pages
      basePath = pathname.split('/page/')[0]
    }

    // Generate the new path with the updated search params
    const newPath = `${basePath}?${params.toString()}`
    replace(newPath)
  }

  const isActive = currentCategory === value || (!currentCategory && value === '')

  return (
    <button
      type="button"
      onClick={() => handleSelect(value)}
      className={`cursor-pointer rounded-full p-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
        isActive ? 'bg-[#061A31] text-white' : 'bg-white/7 text-white hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  )
}
