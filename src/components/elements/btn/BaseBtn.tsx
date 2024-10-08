'use client'

import {
  ReactNode,
  ElementType,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
} from 'react'

export type BaseBtnProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
  btnClassName: string
  as?: ElementType
  btnProps?: ButtonHTMLAttributes<HTMLButtonElement>
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>
  ariaLabel?: string
  disabled?: boolean
}

const BaseBtn = forwardRef<ElementType, BaseBtnProps>((props, ref) => {
  const {
    onClick,
    children,
    as: CustomTag = 'button',
    btnProps,
    linkProps,
    btnClassName,
    ariaLabel,
    disabled,
  } = props
  return (
    <CustomTag
      className={btnClassName}
      onClick={onClick}
      aria-label={ariaLabel}
      ref={ref}
      disabled={disabled}
      {...btnProps}
      {...linkProps}
    >
      {children}
    </CustomTag>
  )
})

BaseBtn.displayName = 'BaseBtn'

export default BaseBtn
