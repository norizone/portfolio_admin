import clsx from 'clsx'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type LabelTextProps = {
  children: ReactNode
  lang?: 'jp' | 'en'
  required?: boolean
}

export const LabelText = (props: LabelTextProps) => {
  const { children, lang = 'jp', required = false } = props
  return (
    <p
      className={twMerge(
        'w-full font-normal',
        clsx(lang === 'en' && 'font-en')
      )}
    >
      {required && <span className="text-error">* </span>}
      <span>{children}</span>
    </p>
  )
}
