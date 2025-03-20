'use client'

import Link from 'next/link'
import { cn } from '../../lib/utils'
import { DoubleArrowLeft, DoubleArrowRight, PrevArrow, NextArrow } from '@/components/icons/arrows'

interface PaginationProps {
  totalPages: number
  currentPage: number
  basePath: string
}

export default function Pagination({ totalPages, currentPage, basePath }: PaginationProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 10) {
      // If 10 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      // For more than 10 pages, show a window around current page
      if (currentPage <= 6) {
        // Near the start
        for (let i = 1; i <= 8; i++) pages.push(i)
        pages.push('...', totalPages)
      } else if (currentPage >= totalPages - 5) {
        // Near the end
        pages.push(1, '...')
        for (let i = totalPages - 7; i <= totalPages; i++) pages.push(i)
      } else {
        // In the middle
        pages.push(1, '...')
        for (let i = currentPage - 3; i <= currentPage + 3; i++) pages.push(i)
        pages.push('...', totalPages)
      }
    }
    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center gap-2">
      {/* First page */}
      <Link
        href={`/${basePath}`}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#061A31]"
      >
        <DoubleArrowLeft />
        <span className="sr-only">First page</span>
      </Link>

      {/* Previous page */}
      {!prevPage ? (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/40"
          disabled
        >
          <PrevArrow className="opacity-40" />
          <span className="sr-only">Previous page</span>
        </button>
      ) : (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}` : `/${basePath}/page/${currentPage - 1}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#061A31]"
        >
          <PrevArrow />
          <span className="sr-only">Previous page</span>
        </Link>
      )}

      {/* Page numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-white"
            >
              ...
            </span>
          )
        }

        const isCurrentPage = page === currentPage

        return (
          <Link
            key={page}
            href={page === 1 ? `/${basePath}` : `/${basePath}/page/${page}`}
            className={cn(
              'font-helvetica flex h-10 w-10 items-center justify-center rounded-full text-sm text-white transition-colors',
              isCurrentPage ? 'bg-[#061A31]' : 'bg-white/10 hover:bg-[#061A31]'
            )}
            aria-current={isCurrentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        )
      })}

      {/* Next page */}
      {!nextPage ? (
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/40"
          disabled
        >
          <DoubleArrowRight className="opacity-40" />
          <span className="sr-only">Next page</span>
        </button>
      ) : (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#061A31]"
        >
          <NextArrow />
          <span className="sr-only">Next page</span>
        </Link>
      )}

      {/* Last page */}
      <Link
        href={`/${basePath}/page/${totalPages}`}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#061A31]"
      >
        <DoubleArrowRight />
        <span className="sr-only">Last page</span>
      </Link>
    </div>
  )
}
