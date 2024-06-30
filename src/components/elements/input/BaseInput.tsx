'use client'
import { InputHTMLAttributes, HTMLInputTypeAttribute, forwardRef } from 'react'

export type BaseInputProps = {
  type: HTMLInputTypeAttribute
  name: string
  placeholder?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  inputClassName: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  defaultValue?: string | number
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const {
      type,
      name,
      placeholder,
      disabled,
      onChange,
      value,
      inputClassName,
      inputProps,
      defaultValue,
    } = props
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        {...inputProps}
        ref={ref}
        className={inputClassName}
      />
    )
  }
)

BaseInput.displayName = 'BaseInput'

export default BaseInput