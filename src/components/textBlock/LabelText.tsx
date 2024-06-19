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
    <CustomTag className="grid grid-cols-[.8em_1fr]" {...labelProps}>
      {required ? (
        <strong aria-label="必須" className="text-error font-en">
          *
        </strong>
      ) : (
        <span></span>
      )}
      <span
        className={twMerge(clsx(lang === 'en' && 'font-en'), labelClassName)}
      >
        {label}
      </span>
    </CustomTag>
  )
}
