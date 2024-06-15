'use client'
import { InputHTMLAttributes, HTMLInputTypeAttribute, forwardRef } from 'react'

export type BaseInputProps = {
  type: HTMLInputTypeAttribute
  name: string
  placeholder?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  inputProps?: InputHTMLAttributes<HTMLInputElement>
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
      ...inputProps
    } = props
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        {...inputProps}
        ref={ref}
        className="border border-border w-full py-[.2em] px-[.6em] rounded-sm  font-normal"
      />
    )
  }
)

BaseInput.displayName = 'BaseInput'

export default BaseInput
