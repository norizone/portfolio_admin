import { twMerge } from 'tailwind-merge'

export type WarningMessageProps = {
  errorMessage?: string
  className?: string
}

export const WarningMessage = (props: WarningMessageProps) => {
  const { errorMessage = '', className } = props
  return (
    <span className={twMerge('text-xs text-error', className)}>
      {errorMessage}
    </span>
  )
}
