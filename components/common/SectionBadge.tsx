import React from 'react'

export default function SectionBadge({ title }: { title: string }) {
  return (
    <div className="flex items-center">
      <div className="blink_me mr-3 h-1.5 w-1.5 rounded-full bg-[#006837]"></div>
      <div className="font-helvetica text-base tracking-wider text-white uppercase">{title}</div>
    </div>
  )
}
