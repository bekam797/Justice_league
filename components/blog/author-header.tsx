import Image from 'next/image'
import { cn } from '../../lib/utils'

interface AuthorHeaderProps {
  name: string
  date: string | Date
  image?: string
  className?: string
}

export function AuthorHeader({
  name,
  date,
  image = '/placeholder.svg',
  className,
}: AuthorHeaderProps) {
  // Format the date to match the design
  const formattedDate =
    date instanceof Date
      ? date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : date

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Profile Image */}
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          className="mt-0 mb-0 object-cover"
          priority
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <h2 className="font-justice mt-0 mb-0 text-2xl font-medium tracking-wide text-white">
          {name.toUpperCase()}
        </h2>
        <p className="mt-1 mb-0 text-base font-light text-white/50">{formattedDate}</p>
      </div>
    </div>
  )
}
