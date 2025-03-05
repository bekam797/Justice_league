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
    const params = new URLSearchParams(searchParams)
    params.set('category', value.toLowerCase())
    replace(`${pathname}?${params.toString()}`)
  }

  const isActive = currentCategory === value.toLowerCase() || (!currentCategory && value === '')

  return (
    <button
      type="button"
      onClick={() => handleSelect(value)}
      className={`cursor-pointer rounded-full p-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
        isActive ? 'bg-[#3D3801] text-white' : 'bg-white/7 text-white hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  )
}
