import React, { forwardRef, useState, useRef } from 'react'
import { PrimaryBtn } from '../btn/PrimaryBtn'

export type Props<T> = {
  customClassName?: string
  onChangeFile: (value: T) => void
  isNullable?: boolean
}

const ImageInputInner = <T extends File | undefined>(
  props: Props<T>,
  ref: React.Ref<HTMLDivElement>
) => {
  const { customClassName, onChangeFile, isNullable = false } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageSource, setImageSource] = useState('')

  const selectFile = () => {
    if (!inputRef.current) return
    inputRef.current.click()
  }

  const generateImageSource = (files: FileList) => {
    const file = files[0]
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setImageSource(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    generateImageSource(files)
    setImageFile(files[0])
    onChangeFile(files[0] as T)
  }

  const handleDeleteFile = () => {
    setImageSource('')
    setImageFile(null)
    onChangeFile(undefined as T)
  }

  return (
    <div className={customClassName} ref={ref}>
      {imageFile && (
        <div className="mb-[.6em] max-h-[200px] max-w-[200px]">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSource}
              alt=""
              className="object-cover w-full h-full block"
            />
          }
        </div>
      )}
      <div className="flex flex-row gap-x-[1em]">
        <PrimaryBtn
          btnProps={{ type: 'button' }}
          btnColor="success"
          onClick={selectFile}
        >
          {imageFile ? '変更' : 'アップロード'}
        </PrimaryBtn>
        {imageFile && isNullable && (
          <PrimaryBtn
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
        accept=".jpg,.jpeg,.png,.webp"
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  )
}

export const ImageInput = forwardRef(ImageInputInner) as <T>(
  props: Props<T> & { ref?: React.Ref<HTMLDivElement> }
) => ReturnType<typeof ImageInputInner>
