import { useTranslation } from 'lib/contexts/TranslationContext'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="flex flex-col items-center">
        <div className="font-helvetica my-6 flex space-x-2 text-base text-white">
          <span className="pr-1 text-xs">©</span>{' '}
          {t('footer.copyright', 'Justice League All rights reserved')}
        </div>
      </div>
    </footer>
  )
}
