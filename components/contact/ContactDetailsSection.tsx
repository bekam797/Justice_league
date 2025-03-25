import Link from 'next/link'

export interface ContactDetail {
  label: string
  value: string
  type?: 'email' | 'phone' | 'link'
}

interface ContactSectionProps {
  contactDetails: ContactDetail[]
}

export default function ContactSection({ contactDetails }: ContactSectionProps) {
  const getLink = (detail: ContactDetail) => {
    switch (detail.type) {
      case 'email':
        return `mailto:${detail.value}`
      case 'phone':
        return `tel:${detail.value}`
      case 'link':
        return detail.value
      default:
        return detail.value.startsWith('http') ? detail.value : `mailto:${detail.value}`
    }
  }

  return (
    <div className="relative overflow-hidden py-8 text-white">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {contactDetails.map((detail, index) => (
          <div key={index}>
            <p className="font-helvetica text-base text-white/50">{detail.label}</p>
            <Link
              href={getLink(detail)}
              className="font-helvetica text-base font-medium text-white underline transition-colors hover:text-gray-200"
            >
              {detail.value}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
