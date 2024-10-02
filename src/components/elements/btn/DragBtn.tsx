import { twMerge } from 'tailwind-merge'
import BaseBtn, { BaseBtnProps } from './BaseBtn'
import { DragIcon } from '../icon/DragIcon'

type Props = Omit<BaseBtnProps, 'btnClassName' | 'ariaLabel' | 'children'> & {
  customClassName?: string
  ariaLabel?: string
}

export const DragBtn = (props: Props) => {
  const { customClassName, ariaLabel = '並び替え', ...baseBtnProps } = props
  const defaultClassName = `w-full flex-center hover:bg-hover transition-all fill-fc hover:fill-primary`
  return (
    <BaseBtn
      btnClassName={twMerge(defaultClassName, customClassName)}
      ariaLabel={ariaLabel}
      {...baseBtnProps}
    >
      <DragIcon />
    </BaseBtn>
  )
}
