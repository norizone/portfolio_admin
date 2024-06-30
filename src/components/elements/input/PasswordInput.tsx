import { HTMLInputTypeAttribute, forwardRef, useState } from 'react'
import BaseInput, { BaseInputProps } from './BaseInput'
import { twMerge } from 'tailwind-merge'
import { VisibilityIcon } from '../icon/VisibilityIcon'

export type Props = Omit<BaseInputProps, 'inputClassName' | 'type'> & {
  customClassName?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { customClassName, ...baseInputProps } = props
    const [inputType, setInputType] =
      useState<HTMLInputTypeAttribute>('password')

    const handlerPasswordType = () => {
      const newType = inputType === 'password' ? 'text' : 'password'
      setInputType(newType)
    }

    return (
      <div
        className={twMerge(
          'flex flex-row flex-nowrap border border-border w-full rounded-sm overflow-hidden',
          customClassName
        )}
      >
        <BaseInput
          ref={ref}
          inputClassName="font-normal placeholder-fc-placeholder w-full py-[.4em] px-[.6em] rounded-sm"
          type={inputType}
          {...baseInputProps}
        />
        <button
          type="button"
          onClick={handlerPasswordType}
          className="fill-border hover:fill-primary transition-all w-[30px] px-[5px] rounded-sm"
          aria-label={
            inputType === 'password'
              ? 'パスワードを表示する'
              : 'パスワードを隠す'
          }
        >
          <VisibilityIcon isVisibility={inputType === 'password'} />
        </button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
