import { useState } from 'react'
import { useToggleModal } from '@/hooks/useToggleModal'
import { useMutateCreateTool } from '@/hooks/api/admin.hooks'
import { COMPLETE_MESSAGE_CREATE } from '@/utils/const'
import { CreateToolBody } from '@/types/api/admin'

export const useCreateTool = () => {
  const [createErrorMessage, setCreateErrorMessage] = useState('')
  const {
    mutate: mutateCreate,
    isPending: isLoadingCreate,
    isError: isErrorCreate,
  } = useMutateCreateTool()
  const { isOpenModal: isOpenCreateModal, toggleModal: toggleCreateModal } =
    useToggleModal()

  const onSubmitCreate = (
    data: CreateToolBody,
    setCompleteMessage: (message: string) => void,
    toggleCompleteModal: () => void,
  ) => {
    mutateCreate(data, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_CREATE)
        toggleCreateModal()
        toggleCompleteModal()
      },
      onError: (error) => {
        setCreateErrorMessage(error.message)
      },
    })
  }

  return {
    createErrorMessage,
    isLoadingCreate,
    isErrorCreate,
    isOpenCreateModal,
    setCreateErrorMessage,
    toggleCreateModal,
    onSubmitCreate,
  }
}
