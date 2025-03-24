'use client'

import { useEffect, useState } from 'react'
import { ServicesData } from './types'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

interface ServicesModalProps {
  isOpen: boolean
  onClose: () => void
  services: ServicesData | null
}

const ServicesModalContent: React.FC<ServicesModalProps> = ({ services }) => {
  const [htmlContent, setHtmlContent] = useState<string>('')

  useEffect(() => {
    // Move the async operation into useEffect
    const processMarkdown = async () => {
      const result = await remark().use(remarkGfm).use(remarkHtml).process(services?.content)
      setHtmlContent(result.toString())
    }

    processMarkdown()
  }, [services])

  return (
    <div className="mt-8 flex h-full flex-col pr-8">
      {/* Modal Content - explicitly set height and make it scrollable */}
      <div
        className="overflow-y-auto"
        style={{
          height:
            'calc(90vh - 150px)' /* Adjust the 150px value based on your header height + padding */,
          scrollbarWidth: 'thin',
          scrollbarColor: '#6B7280 transparent',
        }}
      >
        <div className="prose dark:prose-invert services-modal-content max-w-none text-white">
          <div className="font-helvetica pb-12" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0"
        style={{
          height: '100px',
          background: 'linear-gradient(0deg, #0D0D0D 30.39%, rgba(13, 13, 13, 0.00) 100%)',
          zIndex: 10,
        }}
      ></div>
    </div>
  )
}

export default ServicesModalContent
