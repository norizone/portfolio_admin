import { useMutateDeleteWork } from '@/hooks/api/admin.hooks'
import { workKeys } from '@/hooks/api/queryKey'
import { useToggleModal } from '@/hooks/ui/useToggleModal'
import { COMPLETE_MESSAGE_DELETE } from '@/utils/const'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const useDeleteWork = (
  setCompleteMessage: (message: string) => void,
  toggleCompleteModal: () => void,
) => {
  const queryClient = useQueryClient()
  const [deleteId, setDeleteId] = useState<number>()
  const [deleteError, setDeleteError] = useState<string>()
  const [deleteTitle, setDeleteTitle] = useState<string>()
  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()
  const {
    mutate: mutateDelete,
    isPending: isLoadingDelete,
    isError: isErrorDelete,
  } = useMutateDeleteWork()

  const onClickDelete = ({ id, title }: { id: number; title: string }) => {
    setDeleteTitle(title)
    setDeleteId(id)
    toggleDeleteModal()
  }

  const onDeleteSubmit = () => {
    if (!deleteId) return
    mutateDelete(deleteId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: workKeys.listAll(),
        })
        toggleDeleteModal()
        setCompleteMessage(COMPLETE_MESSAGE_DELETE)
        toggleCompleteModal()
      },
      onError: (error) => {
        setDeleteError(error.message)
      },
    })
  }

  return {
    deleteId,
    deleteTitle,
    setDeleteId,
    onDeleteSubmit,
    onClickDelete,
    isLoadingDelete,
    isOpenDeleteModal,
    isErrorDelete,
    deleteError,
    toggleDeleteModal,
  }
}
