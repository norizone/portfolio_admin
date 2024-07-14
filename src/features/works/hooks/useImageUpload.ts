import { useMutateUploadImage } from '@/hooks/api/admin.hooks'
import { useState } from 'react'

interface UploadState {
  [key: string]: boolean
}

export const useImageUpload = () => {
  const [uploadStates, setUploadStates] = useState<UploadState>({})
  const { mutate: mutateUploadImage } = useMutateUploadImage()

  const setUploadState = (key: string, isLoading: boolean) => {
    setUploadStates((prev) => ({
      ...prev,
      [key]: isLoading,
    }))
  }

  const onSubmitUpload = ({
    key,
    file,
    setValue,
    setError,
  }: {
    key: string
    file: File
    setValue?: (url: string) => void
    setError?: (message: string) => void
  }) => {
    setUploadState(key, true)
    const formData = new FormData()
    formData.append('uploadImg', file)
    mutateUploadImage(formData, {
      onSuccess: (res) => {
        setValue && setValue(res)
        return res
      },
      onError: (error) => {
        setError && setError(error.message)
        return error.message
      },
      onSettled: () => {
        setUploadState(key, false)
      },
    })
  }

  return {
    onSubmitUpload,
    isLoadingUpload: (key: string) => !!uploadStates[key],
    isErrorUpload: (key: string) => false,
  }
}
