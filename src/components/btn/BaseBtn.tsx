'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  btnColor: 'primary' | 'success' | 'error' | 'warning'
  disabled?: boolean
}

export const BaseBtn = (props: Props) => {
  const { onClick, children, btnColor, disabled = false } = props
  return (
    <button
      className={twMerge(
        'w-max p-[.4em] rounded-lg min-w-[10em] shadow-lgtransition-all',
        clsx(
          btnColor === 'primary' &&
            'bg-primary-dark  hover:bg-primary text-white'
        )
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
