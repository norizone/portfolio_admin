import { useState } from 'react'
import { useToggleModal } from '@/hooks/ui/useToggleModal'
import { useMutateDeleteUser } from '@/hooks/api/admin.hooks'
import { COMPLETE_MESSAGE_DELETE } from '@/utils/const'

export const useDeleteUser = (
  setCompleteMessage: (message: string) => void,
  toggleCompleteModal: () => void,
) => {
  const {
    mutate: mutateDelete,
    isPending: isLoadingDelete,
    isError: isDeleteError,
  } = useMutateDeleteUser()
  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()
  const [deleteId, setDeleteId] = useState<number>()
  const [deleteTitle, setDeleteTitle] = useState<string>()
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>('')

  const onClickDelete = (id: number, title: string) => {
    if (!id) return
    setDeleteId(id)
    setDeleteTitle(title)
    toggleDeleteModal()
  }

  const onSubmitDelete = () => {
    if (!deleteId) return toggleDeleteModal()
    mutateDelete(deleteId, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_DELETE)
        toggleDeleteModal()
        toggleCompleteModal()
      },
      onError: (error) => {
        setDeleteErrorMessage(error.message)
      },
    })
  }

  return {
    deleteId,
    deleteTitle,
    isLoadingDelete,
    isOpenDeleteModal,
    toggleDeleteModal,
    onClickDelete,
    onSubmitDelete,
    isDeleteError,
    deleteErrorMessage,
  }
}
