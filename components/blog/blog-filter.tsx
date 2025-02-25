'use client'

import { useState } from 'react'

interface BlogFilterProps {
  title: string
  filters: string[]
  onFilterChange?: (filter: string) => void
}

export function BlogFilter({ title, filters, onFilterChange }: BlogFilterProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    onFilterChange?.(filter)
  }

  return (
    <div className="flex flex-col gap-4 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center">
        <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#006837]"></div>
        <div className="font-helvetica text-base tracking-wider text-white uppercase">{title}</div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="font-helvetica text-base tracking-wider text-white uppercase">
          Filter By:
        </span>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`cursor-pointer rounded-full p-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-[#3D3801] text-white'
                  : 'bg-white/7 text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
