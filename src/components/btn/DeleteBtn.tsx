import { DeleteIcon } from '../icon/DeleteIcon'
import { twMerge } from 'tailwind-merge'
import BaseBtn, { BaseBtnProps } from './BaseBtn'

type Props = Omit<BaseBtnProps, 'btnClassName' | 'ariaLabel' | 'children'> & {
  customClassName?: string
  ariaLabel?: string
}

export const DeleteBtn = (props: Props) => {
  const { customClassName, ariaLabel = '削除', ...baseBtnProps } = props
  const defaultClassName = `w-full flex-center hover:bg-hover-alert transition-all fill-base-text hover:fill-error`
  return (
    <BaseBtn
      btnClassName={twMerge(defaultClassName, customClassName)}
      ariaLabel={ariaLabel}
      {...baseBtnProps}
    >
      <DeleteIcon />
    </BaseBtn>
  )
}
