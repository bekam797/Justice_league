'use client'

import { useTextTransform } from 'lib/use-text-transform'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function PageTitle({ children, className, tag = 'h1' }: Props) {
  const textStyle = useTextTransform()
  const Tag = tag

  return (
    <Tag className={className} style={textStyle}>
      {children}
    </Tag>
  )
}
