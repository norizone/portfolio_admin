import { useState } from 'react'
import { useMutateDeleteTool } from '@/hooks/api/admin.hooks'
import { useToggleModal } from '@/hooks/useToggleModal'
import { COMPLETE_MESSAGE_DELETE } from '@/utils/const'

export const useDeleteTool = () => {
  const [deleteId, setDeleteId] = useState<number>()
  const [deleteTitle, setDeleteTitle] = useState<string>()
  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useMutateDeleteTool()
  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()
  const onClickDelete = (id: number, title: string) => {
    if (!id) return
    setDeleteId(id)
    setDeleteTitle(title)
    toggleDeleteModal()
  }
  const onSubmitDelete = (
    setCompleteMessage: (message: string) => void,
    toggleCompleteModal: () => void,
  ) => {
    if (!deleteId) return toggleDeleteModal()
    mutateDelete(deleteId, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_DELETE)
        toggleDeleteModal()
        toggleCompleteModal()
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
  }
}
