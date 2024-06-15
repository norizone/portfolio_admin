'use client'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  link?: string
}

export const ListCard = (props: Props) => {
  const { children, link } = props
  return (
    <li className="bg-white hover:bg-hover transition-all shadow-sm rounded-md p-[1em]">
      {children}
    </li>
  )
}
