import { forwardRef, useRef, useState } from 'react'
import BaseInput, { BaseInputProps } from './BaseInput'
import { twMerge } from 'tailwind-merge'
import { PrimaryBtn } from '../btn/PrimaryBtn'

export type Props<T> = {
  customClassName?: string
  onChangeFile: (value: T) => void
  isNullable?: boolean
}

export const ImageInput = <T extends File | undefined>(props: Props<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { customClassName, onChangeFile, isNullable } = props
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
    // img要素のsrc属性に渡す画像データを生成
    generateImageSource(files)
    setImageFile(files[0])
    onChangeFile(files[0] as T)
  }

  const handleDeleteFIle = () => {
    setImageFile(null)
    setImageSource('')
    onChangeFile(undefined as T)
  }

  return (
    <div className={customClassName}>
      {imageFile && (
        <div className="mb-[.6em] max-h-[200px] max-w-[200px]">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSource}
              alt=""
              className=" object-cover w-full h-full block"
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
          アップロード
        </PrimaryBtn>
        {imageFile && (
          <PrimaryBtn
            btnProps={{ type: 'button' }}
            btnColor={isNullable ? 'cancel' : 'primary'}
            onClick={isNullable ? handleDeleteFIle : selectFile}
          >
            {isNullable ? '削除' : '削除'}
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
