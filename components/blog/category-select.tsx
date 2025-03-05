import CategoryButton from '@/components/blog/category-button'
import { getCategories } from 'datamain/loaders'

export async function CategorySelect() {
  const data = await getCategories()
  const categories = data?.data
  if (!categories) return null

  return (
    <div className="flex flex-col gap-4 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center">
        <div className="mr-3 h-1.5 w-1.5 rounded-full bg-[#006837]"></div>
        <div className="font-helvetica text-base tracking-wider text-white uppercase">Blog</div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="font-helvetica text-base tracking-wider text-white uppercase">
          Filter By:
        </span>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <CategoryButton value="">All Posts</CategoryButton>
          {categories.map((category) => (
            <CategoryButton key={category.id} value={category.name}>
              {category.name}
            </CategoryButton>
          ))}
        </div>
      </div>
    </div>
  )
}
