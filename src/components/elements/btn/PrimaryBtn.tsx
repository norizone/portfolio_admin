'use client'

import BaseBtn, { BaseBtnProps } from './BaseBtn'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { LoadingIcon } from '../icon/LodingIcon'

export type PrimaryBtnProps = Omit<BaseBtnProps, 'btnClassName'> & {
  btnColor: 'primary' | 'success' | 'error' | 'warning' | 'cancel'
  customClassName?: string
  isLoading?: boolean
}

export const PrimaryBtn = (props: PrimaryBtnProps) => {
  const { btnColor, customClassName, children, isLoading, ...baseBtnProps } =
    props
  return (
    <BaseBtn
      btnClassName={twMerge(
        'w-max p-[.4em] rounded-lg min-w-[10em] shadow-lg transition-all block text-center min-h-[38px]',
        clsx(
          btnColor === 'primary' &&
            'bg-primary-dark  hover:bg-primary text-white',
          btnColor === 'success' &&
            'bg-success-dark  hover:bg-success text-white',
          btnColor === 'error' && 'bg-error-dark  hover:bg-error text-white',
          btnColor === 'warning' && 'bg-warning-dark  hover:bg-warning text-fc',
          btnColor === 'cancel' && 'bg-[#b2b2b2] hover:bg-[#c4c4c4]',
          isLoading && 'opacity-60 pointer-events-none flex-center',
        ),
        customClassName,
      )}
      disabled={isLoading}
      {...baseBtnProps}
    >
      {isLoading ? <LoadingIcon /> : children}
    </BaseBtn>
  )
}
