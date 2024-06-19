import { ReactNode, forwardRef } from 'react'
import BaseInput, { BaseInputProps } from '../input/BaseInput'

type Props = Omit<BaseInputProps, 'inputClassName' | 'type'> & {
  label: string | ReactNode
  checked?: boolean
}

export const PrimaryLabelCheckBox = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { label, checked, ...baseInputProps } = props
    return (
      <label className="font-normal flex-center flex-row flex-nowrap gap-x-[1em] cursor-pointer">
        <BaseInput
          ref={ref}
          type="checkbox"
          inputClassName="w-full "
          inputProps={{
            checked,
          }}
          {...baseInputProps}
        />
        {label}
      </label>
    )
  }
)

PrimaryLabelCheckBox.displayName = 'PrimaryLabelCheckBox'
