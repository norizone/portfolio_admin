'use client'

import BaseBtn, { BaseBtnProps } from './BaseBtn'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

type Props = Omit<BaseBtnProps, 'btnClassName'> & {
  btnColor: 'primary' | 'success' | 'error' | 'warning' | 'cancel'
  customClassName?: string
}

export const PrimaryBtn = (props: Props) => {
  const { btnColor, customClassName, children, ...baseBtnProps } = props
  return (
    <BaseBtn
      btnClassName={twMerge(
        'w-max p-[.4em] rounded-lg min-w-[10em] shadow-lg transition-all block text-center',
        clsx(
          btnColor === 'primary' &&
            'bg-primary-dark  hover:bg-primary text-white',
          btnColor === 'success' && '',
          btnColor === 'error' && 'bg-error-dark  hover:bg-error text-white',
          btnColor === 'warning' && '',
          btnColor === 'cancel' && 'bg-[#b2b2b2] hover:bg-[#c4c4c4]'
        ),
        customClassName
      )}
      {...baseBtnProps}
    >
      {children}
    </BaseBtn>
  )
}
