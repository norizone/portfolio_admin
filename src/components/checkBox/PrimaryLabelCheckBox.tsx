import { ReactNode, forwardRef } from 'react'
import BaseInput, { BaseInputProps } from '../input/BaseInput'
import { selectItem } from '@/types/SelectItems'

type Props = Omit<BaseInputProps, 'inputClassName' | 'type' | 'value'> & {
  item: selectItem
  checked?: boolean
}

export const PrimaryLabelCheckBox = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { item, checked, ...baseInputProps } = props
    return (
      <label className="font-normal flex-center flex-row flex-nowrap gap-x-[.4em] cursor-pointer">
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
