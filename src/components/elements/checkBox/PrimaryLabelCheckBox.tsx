import { ReactNode, forwardRef } from 'react'
import BaseInput, { BaseInputProps } from '../input/BaseInput'
import { selectItem } from '@/types/SelectItems'
import { twMerge } from 'tailwind-merge'

type Props = Omit<BaseInputProps, 'inputClassName' | 'type' | 'value'> & {
  item: selectItem
  checked?: boolean
  customClassName?: string
}

export const PrimaryLabelCheckBox = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { item, checked, customClassName, ...baseInputProps } = props
    return (
      <label
        className={twMerge(
          'font-normal flex-center flex-row flex-nowrap gap-x-[.4em] cursor-pointer',
          customClassName
        )}
      >
        <BaseInput
          ref={ref}
          type="checkbox"
          inputClassName=""
          inputProps={{
            checked,
          }}
          value={item.value}
          {...baseInputProps}
        />
        {item.label}
      </label>
    )
  }
)

PrimaryLabelCheckBox.displayName = 'PrimaryLabelCheckBox'
