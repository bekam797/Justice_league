'use client'

import { useTranslation } from 'lib/contexts/TranslationContext'
import UppercaseText from '@/components/common/UppercaseText'
import CategoryButton from '@/components/blog/category-button'
import SectionBadge from '@/components/common/SectionBadge'

export function FilterByText() {
  const { t } = useTranslation()
  return (
    <UppercaseText
      className="font-helvetica text-base tracking-wider text-white uppercase"
      tag="span"
    >
      {t('common.filterBy', 'Filter By:')}
    </UppercaseText>
  )
}

export function AllPostsButton({ ...props }) {
  const { t } = useTranslation()
  return (
    <CategoryButton value="" {...props}>
      {t('common.allPost', 'All Posts')}
    </CategoryButton>
  )
}

export function BlogSectionTitle({ ...props }) {
  const { t } = useTranslation()
  return <SectionBadge title={t('common.blog', 'Blog')} />
}
