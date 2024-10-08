import { forwardRef } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import BaseSelectBox, { BaseSelectBoxProps } from './BaseSelectBox'
import { isEmpty } from '@/utils/dataFilters'

export type Props = Omit<BaseSelectBoxProps, 'selectClassName'> & {
  customClassName?: string
}

export const PrimarySelectBox = forwardRef<HTMLSelectElement, Props>(
  (props, ref) => {
    const { customClassName, value, ...baseSelectBoxProps } = props
    return (
      <BaseSelectBox
        ref={ref}
        value={value}
        selectClassName={twMerge(
          'border border-border w-full py-[.4em] px-[.6em] rounded-sm font-normal',
          clsx(isEmpty(value) ? 'text-fc-placeholder' : 'text-fc'),
          customClassName,
        )}
        {...baseSelectBoxProps}
      />
    )
  },
)

PrimarySelectBox.displayName = 'PrimarySelectBox'
