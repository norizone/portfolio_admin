import { twMerge } from 'tailwind-merge'
import { WarningMessage, WarningMessageProps } from './ErrorMessage'
import { LabelText, LabelTextProps } from './LabelText'
import { ReactNode } from 'react'

type Props = LabelTextProps &
  WarningMessageProps & {
    children: ReactNode
    customClassName?: string
  }

export const FormLabel = (props: Props) => {
  const { errorMessage, children, customClassName, ...labelProps } = props
  return (
    <div
      className={twMerge('flex gap-[.4em] flex-col relative', customClassName)}
    >
      <LabelText {...labelProps} />
      {children}
      {errorMessage && (
        <WarningMessage
          errorMessage={errorMessage}
          className="absolute bottom-[-1.8em] ml-[1em]"
        />
      )}
    </div>
  )
}
