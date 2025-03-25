import ContactContent from '@/components/contact/ContactContent'
import { getContactPage } from 'datamain/loaders'
import * as React from 'react'

interface Props {
  params: Promise<{
    lang: string
  }>
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  const contactPageData = await getContactPage(lang)

  return (
    <div>
      <ContactContent
        badgeTitle={contactPageData.data.title}
        sectionTitle={contactPageData.data.address}
        contactDetails={contactPageData.data.contactDetails}
        nameLabel={contactPageData.data.nameLabel}
        surnameLabel={contactPageData.data.surnameLabel}
        emailLabel={contactPageData.data.emailLabel}
        messageLabel={contactPageData.data.messageLabel}
        submitButtonText={contactPageData.data.submitButtonText}
      />
    </div>
  )
}
