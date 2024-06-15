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
    <label className="flex gap-[.2em] flex-col relative">
      <LabelText {...labelProps} />
      {children}
      {errorMessage && (
        <WarningMessage
          errorMessage={errorMessage}
          className="absolute bottom-[-1.6em]"
        />
      )}
    </label>
  )
}
