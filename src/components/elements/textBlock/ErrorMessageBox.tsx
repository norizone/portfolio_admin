import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  children?: string | ReactNode
  customClassName?: string
}

export const ErrorMessageBox = (props: Props) => {
  const { children, customClassName } = props
  const bgStyle = {
    ['--tw-bg-opacity' as string]: '.1',
  }
  return children ? (
    <p
      style={bgStyle}
      className={twMerge(
        'w-full bg-error text-error text-[12px] py-[.5em] text-center',
        customClassName
      )}
    >
      {children}
    </p>
  ) : null
}
