import { WarningMessage, WarningMessageProps } from './ErrorMessage'
import { LabelText, LabelTextProps } from './LabelText'
import { ReactNode } from 'react'

type Props = LabelTextProps &
  WarningMessageProps & {
    children: ReactNode
  }

export const FormLabel = (props: Props) => {
  const { errorMessage, children, ...labelProps } = props
  return (
    <div className="flex gap-[.4em] flex-col relative">
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
