import { twMerge } from 'tailwind-merge'
import BaseBtn, { BaseBtnProps } from './BaseBtn'
import { EditIcon } from '../icon/EditIcon'

type Props = Omit<BaseBtnProps, 'btnClassName' | 'ariaLabel' | 'children'> & {
  customClassName?: string
  ariaLabel?: string
}

export const EditBtn = (props: Props) => {
  const { customClassName, ariaLabel = '編集', ...baseBtnProps } = props
  const defaultClassName = `w-full flex-center hover:bg-hover transition-all fill-base-text hover:fill-primary`
  return (
    <BaseBtn
      btnClassName={twMerge(defaultClassName, customClassName)}
      ariaLabel={ariaLabel}
      {...baseBtnProps}
    >
      <EditIcon />
    </BaseBtn>
  )
}
