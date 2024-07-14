'use client'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ListCard = (props: Props) => {
  const { children } = props
  return <li className="bg-white shadow-sm rounded-md p-[1em]">{children}</li>
}
