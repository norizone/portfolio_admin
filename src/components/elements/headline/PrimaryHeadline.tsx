import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Props = {
  children: ReactNode
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  lang?: 'en' | 'jp'
}
export const PrimaryHeadline = (props: Props) => {
  const { children, tag: Tag, lang = 'jp' } = props
  return (
    <Tag
      className={twMerge(
        `block -tracking-tight font-jp border-b border-border py-[.2em] px-[.25em]`,
        `${clsx(
          lang === 'jp' && 'text-2xl',
          lang === 'en' && 'font-en text-3xl'
        )}`
      )}
    >
      {children}
    </Tag>
  )
}
