import { useMutateCreateUser } from '@/hooks/api/admin.hooks'
import { CreateUserBody } from '@/types/api/admin'
import { COMPLETE_MESSAGE_CREATE } from '@/utils/const'
import { useState } from 'react'

export const useCreateUser = (
  setCompleteMessage: (message: string) => void,
  toggleCompleteModal: () => void,
) => {
  const {
    mutate: mutateCreateUser,
    isPending: isLoadingCreateUser,
    isError: isErrorCreate,
  } = useMutateCreateUser()

  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmitCreate = (data: CreateUserBody) => {
    mutateCreateUser(data, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_CREATE)
        toggleCompleteModal()
        setIsSuccess(true)
      },
      onError: (error) => {
        setErrorMessage(error.message)
      },
    })
  }

  return {
    isSuccess,
    isErrorCreate,
    errorMessage,
    isLoadingCreateUser,
    onSubmitCreate,
  }
}
