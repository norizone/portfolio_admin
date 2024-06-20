'use client'
import { forwardRef, SelectHTMLAttributes } from 'react'
import { selectItem } from '@/types/SelectItems'

export type BaseSelectBoxProps = {
  name: string
  placeholder?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string | number
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>
  optionItems: selectItem[]
  selectClassName: string
}

export const BaseSelectBox = forwardRef<HTMLSelectElement, BaseSelectBoxProps>(
  (props, ref) => {
    const {
      name,
      placeholder,
      disabled,
      onChange,
      value,
      optionItems,
      selectClassName,
      selectProps,
    } = props
    return (
      <select
        name={name}
        onChange={onChange}
        disabled={disabled}
        value={value}
        // defaultValue={!value ? '' : value}
        ref={ref}
        className={selectClassName}
        {...selectProps}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {optionItems.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    )
  }
)

BaseSelectBox.displayName = 'BaseSelectBox'

export default BaseSelectBox
