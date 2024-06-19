import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import BaseTextArea, { BaseTextAreaProps } from './BaseTexArea'

export type Props = Omit<BaseTextAreaProps, 'textAreaClassName'> & {
  customClassName?: string
}

export const PrimaryTextArea = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const { customClassName, value, ...baseInputProps } = props

    return (
      <BaseTextArea
        ref={ref}
        value={value}
        textAreaClassName={twMerge(
          'border border-border w-full py-[.4em] px-[.6em] rounded-sm  font-normal placeholder-fc-placeholder min-h-[10em]',
          customClassName
        )}
        {...baseInputProps}
      />
    )
  }
)

PrimaryTextArea.displayName = 'PrimaryTextArea'
