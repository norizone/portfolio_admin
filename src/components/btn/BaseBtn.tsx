'use client'

import clsx from 'clsx'
import {
  ReactNode,
  ElementType,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
} from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  btnColor: 'primary' | 'success' | 'error' | 'warning' | 'cancel'
  as?: ElementType
  btnProps?: ButtonHTMLAttributes<HTMLButtonElement>
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>
}

const BaseBtn = forwardRef<ElementType, Props>((props, ref) => {
  const {
    onClick,
    children,
    btnColor,
    as: CustomTag = 'button',
    btnProps,
    linkProps,
  } = props
  return (
    <CustomTag
      className={twMerge(
        'w-max p-[.4em] rounded-lg min-w-[10em] shadow-lg transition-all block text-center',
        clsx(
          btnColor === 'primary' &&
            'bg-primary-dark  hover:bg-primary text-white',
          btnColor === 'success' && '',
          btnColor === 'error' && 'bg-error-dark  hover:bg-error text-white',
          btnColor === 'warning' && '',
          btnColor === 'cancel' && 'bg-[#b2b2b2] hover:bg-[#c4c4c4]'
        )
      )}
      {...btnProps}
      {...linkProps}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </CustomTag>
  )
})

BaseBtn.displayName = 'BaseBtn'

export default BaseBtn
