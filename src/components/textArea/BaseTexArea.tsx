'use client'
import { forwardRef, TextareaHTMLAttributes } from 'react'

export type BaseTextAreaProps = {
  name: string
  placeholder?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string | number
  textAreaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
  textAreaClassName: string
}

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  (props, ref) => {
    const {
      name,
      placeholder,
      disabled,
      onChange,
      value,
      textAreaClassName,
      textAreaProps,
    } = props
    return (
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        ref={ref}
        className={textAreaClassName}
        {...textAreaProps}
      />
    )
  }
)

BaseTextArea.displayName = 'BaseTextArea'

export default BaseTextArea
