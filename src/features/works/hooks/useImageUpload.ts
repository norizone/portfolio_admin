import {
  useMutateDeleteImage,
  useMutateEditImage,
  useMutateUploadImage,
} from '@/hooks/api/admin.hooks'
import { useState } from 'react'
interface UploadState {
  [key: string]: boolean
}

type DefaultSubmitUpload = {
  key: string
  setValue?: (url: string) => void
  setError?: (message: string) => void
}

export const useImageUpload = () => {
  const [uploadStates, setUploadStates] = useState<UploadState>({})
  const { mutate: mutateUploadImage } = useMutateUploadImage()
  const { mutate: mutateDelete } = useMutateDeleteImage()
  const { mutate: mutateEdit } = useMutateEditImage()

  const setUploadState = (key: string, isLoading: boolean) => {
    setUploadStates((prev) => ({
      ...prev,
      [key]: isLoading,
    }))
  }

  const handleFileUpload = ({
    key,
    file,
    setValue,
    setError,
  }: DefaultSubmitUpload & { file: File }) => {
    setUploadState(key, true)
    const formData = new FormData()
    formData.append('uploadImg', file)
    mutateUploadImage(formData, {
      onSuccess: (res) => {
        setValue && setValue(res)
      },
      onError: (error) => {
        setError && setError(error.message)
      },
      onSettled: () => {
        setUploadState(key, false)
      },
    })
  }

  const handleDeleteFile = ({
    key,
    deletePath,
    setValue,
    setError,
  }: DefaultSubmitUpload & { deletePath: string }) => {
    setUploadState(key, true)
    const parts = deletePath.split('/')
    const fileName = parts[parts.length - 1]
    mutateDelete(
      { fileName },
      {
        onSuccess: (res) => {
          setValue && setValue('')
        },
        onError: (error) => {
          setError && setError(error.message)
        },
        onSettled: () => {
          setUploadState(key, false)
        },
      }
    )
  }

  const handleEditFile = ({
    key,
    file,
    deletePath,
    setValue,
    setError,
  }: DefaultSubmitUpload & { file: File; deletePath: string }) => {
    setUploadState(key, true)
    const formData = new FormData()
    formData.append('uploadImg', file)
    formData.append('oldFileName', deletePath)
    mutateEdit(formData, {
      onSuccess: (res) => {
        setValue && setValue(res)
      },
      onError: (error) => {
        setError && setError(error.message)
      },
      onSettled: () => {
        setUploadState(key, false)
      },
    })
  }

  const onSubmitUpload = ({
    key,
    file,
    deletePath,
    setValue,
    setError,
  }: DefaultSubmitUpload & {
    file?: File
    deletePath?: string
  }) => {
    if (file && !deletePath) {
      handleFileUpload({
        key,
        file,
        setValue,
        setError,
      })
    } else if (file && deletePath) {
      handleEditFile({
        key,
        file,
        deletePath,
        setValue,
        setError,
      })
    } else if (!file && deletePath) {
      handleDeleteFile({
        key,
        deletePath,
        setValue,
        setError,
      })
    }
  }

  return {
    onSubmitUpload,
    isLoadingUpload: (key: string) => !!uploadStates[key],
    isErrorUpload: (key: string) => false,
  }
}
