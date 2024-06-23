import { forwardRef } from 'react'
import BaseInput, { BaseInputProps } from './BaseInput'
import { twMerge } from 'tailwind-merge'
import { PrimaryBtn } from '../btn/PrimaryBtn'

export type Props = Omit<BaseInputProps, 'inputClassName' | 'type'> & {
  customClassName?: string
}

export const ImageInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { customClassName, ...baseInputProps } = props
  const onUploadBtnClick = (ref: HTMLInputElement) => {
    if (ref && 'current' in ref && ref.current) {
      ref.click()
    }
  }
  return (
    <div className={customClassName}>
      <PrimaryBtn
        btnProps={{ type: 'button' }}
        btnColor="primary"
        onClick={() => onUploadBtnClick}
      >
        <BaseInput
          type="file"
          inputProps={{
            accept: '.jpg,.jpeg,.png,.pdf',
            hidden: true,
          }}
          ref={ref}
          inputClassName=""
          {...baseInputProps}
        />
        アップロード
      </PrimaryBtn>
    </div>
  )
})

ImageInput.displayName = 'ImageInput'
