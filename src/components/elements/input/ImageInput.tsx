import { forwardRef } from 'react'
import BaseInput, { BaseInputProps } from './BaseInput'
import { twMerge } from 'tailwind-merge'

export type Props = Omit<BaseInputProps, 'inputClassName' | 'type'> & {
  customClassName?: string
}

export const ImageInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { customClassName, ...baseInputProps } = props
  return (
    <BaseInput
      type="file"
      inputProps={{
        accept: '.jpg,.jpeg,.png,.pdf',
      }}
      inputClassName={twMerge(
        'border-none w-full py-[.4em] px-[.6em] rounded-sm font-normal placeholder-fc-placeholder',
        customClassName
      )}
      {...baseInputProps}
    />
  )
})

ImageInput.displayName = 'ImageInput'
