import { useState } from 'react'
import { useToggleModal } from '@/hooks/ui/useToggleModal'
import { useMutateCreateTool } from '@/hooks/api/admin.hooks'
import { COMPLETE_MESSAGE_CREATE } from '@/utils/const'
import { CreateToolBody } from '@/types/api/admin'

export const useCreateTool = (
  setCompleteMessage: (message: string) => void,
  toggleCompleteModal: () => void,
  onSuccess?: () => void,
) => {
  const [createErrorMessage, setCreateErrorMessage] = useState('')
  const {
    mutate: mutateCreate,
    isPending: isLoadingCreate,
    isError: isErrorCreate,
  } = useMutateCreateTool()
  const { isOpenModal: isOpenCreateModal, toggleModal: toggleCreateModal } =
    useToggleModal()

  const onSubmitCreate = (data: CreateToolBody) => {
    mutateCreate(data, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_CREATE)
        toggleCreateModal()
        onSuccess && onSuccess()
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
