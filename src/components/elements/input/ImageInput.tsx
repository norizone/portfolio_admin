import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { PrimaryBtn, PrimaryBtnProps } from '../btn/PrimaryBtn'

export type Props = Omit<
  PrimaryBtnProps,
  'btnColor' | 'onClick' | 'children'
> & {
  customClassName?: string
  onChangeFile: (value: {
    imageFile?: File;
    uploadedUrl?: string;
  }) => void
  isNullable?: boolean
  defaultUrl?: string
  imageUrl?: string | null
}

const ImageInputInner = (
  props: Props,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    customClassName,
    onChangeFile,
    isNullable = false,
    defaultUrl = '',
    imageUrl = '',
    ...PrimaryBtnProps
  } = props
  const inputRef = useRef<HTMLInputElement | null>(null)


  const selectFile = () => {
    if (!inputRef.current) return
    inputRef.current.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    onChangeFile({
      imageFile: files[0],
      ...(imageUrl ? { uploadedUrl: imageUrl } : {}),
    })
  }

  const handleDeleteFile = () => {
    imageUrl && onChangeFile({ uploadedUrl: imageUrl })
  }

  return (
    <div className={customClassName} ref={ref}>
      {imageUrl && (
        <div className="mb-[.6em] max-h-[200px] max-w-[200px]">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="object-cover w-full h-full block"
            />
          }
        </div>
      )}
      <div className="flex flex-row gap-x-[1em]">
        <PrimaryBtn
          {...PrimaryBtnProps}
          btnProps={{ type: 'button' }}
          btnColor="success"
          onClick={selectFile}
        >
          {imageUrl ? '変更' : 'アップロード'}
        </PrimaryBtn>
        {imageUrl && isNullable && (
          <PrimaryBtn
            {...PrimaryBtnProps}
            btnProps={{ type: 'button' }}
            btnColor="cancel"
            onClick={handleDeleteFile}
          >
            削除
          </PrimaryBtn>
        )}
      </div>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  )
}

export const ImageInput = forwardRef(ImageInputInner);