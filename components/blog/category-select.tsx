import CategoryButton from '@/components/blog/category-button'
import SectionBadge from '@/components/common/SectionBadge'
import { getCategories } from 'datamain/loaders'

interface CategorySelectProps {
  locale: string
}

export const CategorySelect = async ({ locale }: CategorySelectProps) => {
  const data = await getCategories(locale)
  const categories = data?.data
  if (!categories) return null

  return (
    <div className="flex flex-col gap-4 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
      <SectionBadge title="Blog" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="font-helvetica text-base tracking-wider text-white uppercase">
          Filter By:
        </span>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <CategoryButton value="">All Posts</CategoryButton>
          {categories?.map((category) => (
            <CategoryButton key={category.id} value={category.name}>
              {category.name}
            </CategoryButton>
          ))}
        </div>
      </div>
    </div>
  )
}
