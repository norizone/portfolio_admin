import clsx from 'clsx'
import { ElementType, LabelHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type LabelTextProps = {
  label: string
  as?: ElementType
  lang?: 'jp' | 'en'
  required?: boolean
  labelClassName?: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

export const LabelText = (props: LabelTextProps) => {
  const {
    as: CustomTag = 'label',
    label,
    lang = 'jp',
    required = false,
    labelClassName,
    labelProps,
  } = props
  return (
    <CustomTag {...labelProps}>
      <span
        className={twMerge(clsx(lang === 'en' && 'font-en'), labelClassName)}
      >
        {label}
      </span>
      {required && (
        <strong aria-label="必須" className="text-error font-en ml-[.2em]">
          *
        </strong>
      )}
    </CustomTag>
  )
}
