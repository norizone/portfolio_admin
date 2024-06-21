import { forwardRef } from 'react'
import BaseInput, { BaseInputProps } from './BaseInput'
import { twMerge } from 'tailwind-merge'

export type Props = Omit<BaseInputProps, 'inputClassName'> & {
  customClassName?: string
}

export const PrimaryInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { customClassName, ...baseInputProps } = props

    return (
      <BaseInput
        ref={ref}
        inputClassName={twMerge(
          'border border-border w-full py-[.4em] px-[.6em] rounded-sm font-normal placeholder-fc-placeholder',
          customClassName
        )}
        {...baseInputProps}
      />
    )
  }
)

PrimaryInput.displayName = 'PrimaryInput'
