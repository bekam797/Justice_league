import CategoryButton from '@/components/blog/category-button'
import { getCategories } from 'datamain/loaders'
import { FilterByText, AllPostsButton, BlogSectionTitle } from './category-select-text'

interface CategorySelectProps {
  locale: string
}

export const CategorySelect = async ({ locale }: CategorySelectProps) => {
  const data = await getCategories(locale)
  const categories = data?.data
  if (!categories) return null

  return (
    <div className="flex flex-col gap-4 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
      <BlogSectionTitle />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <FilterByText />
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <AllPostsButton />
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
