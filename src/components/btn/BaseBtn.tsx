'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'submit' | 'reset' | 'button' | undefined
  children: ReactNode
  btnColor: 'primary' | 'success' | 'error' | 'warning' | 'cancel'
  disabled?: boolean
}

export const BaseBtn = (props: Props) => {
  const {
    onClick,
    children,
    btnColor,
    disabled = false,
    type = 'button',
  } = props
  return (
    <button
      className={twMerge(
        'w-max p-[.4em] rounded-lg min-w-[10em] shadow-lg transition-all',
        clsx(
          btnColor === 'primary' &&
            'bg-primary-dark  hover:bg-primary text-white',
          btnColor === 'success' && '',
          btnColor === 'error' && 'bg-error-dark  hover:bg-error text-white',
          btnColor === 'warning' && '',
          btnColor === 'cancel' && 'bg-[#b2b2b2] hover:bg-[#c4c4c4]'
        )
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
