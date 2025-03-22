import UppercaseText from '@/components/common/UppercaseText'
import React from 'react'

export default function SectionBadge({ title }: { title: string }) {
  return (
    <div className="flex items-center">
      <div className="blink_me mr-3 h-1.5 w-1.5 rounded-full bg-[#006837]"></div>
      <UppercaseText
        className="font-helvetica text-base tracking-wider text-white uppercase"
        tag="h5"
      >
        {title}
      </UppercaseText>
    </div>
  )
}
