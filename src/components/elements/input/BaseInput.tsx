'use client'
import {
  InputHTMLAttributes,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  forwardRef,
} from 'react'

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
  autocomplete?: HTMLInputAutoCompleteAttribute
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
      autocomplete,
    } = props

    // type="number"でスクロール対策
    const onWheelHandler = (e: React.WheelEvent<HTMLInputElement>) => {
      e.currentTarget.blur()
      e.stopPropagation()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      ;['-', '+', 'e', 'E'].includes(e.key) && e.preventDefault()
    }

    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        autoComplete={autocomplete}
        // onWheel={onWheelHandler}
        // onKeyDown={type==='number' ? handleKeyDown : ()=>{}}
        {...inputProps}
        ref={ref}
        className={inputClassName}
      />
    )
  }
)

BaseInput.displayName = 'BaseInput'

export default BaseInput
