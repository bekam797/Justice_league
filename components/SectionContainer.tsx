import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="mx-auto max-w-[930px] px-4 pt-28 lg:px-0">{children}</section>
}
