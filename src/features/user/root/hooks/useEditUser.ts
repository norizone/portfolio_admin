import { useState } from 'react'
import { useToggleModal } from '@/hooks/useToggleModal'
import { useMutateEditUser } from '@/hooks/api/admin.hooks'
import { COMPLETE_MESSAGE_EDIT } from '@/utils/const'
import { EditUserBody } from '@/types/api/admin'

export const useEditUser = (
  setCompleteMessage: (message: string) => void,
  toggleCompleteModal: () => void,
) => {
  const {
    mutate: mutateEdit,
    isPending: isLoadingEdit,
    isError: isErrorEdit,
  } = useMutateEditUser()
  const { isOpenModal: isOpenEditModal, toggleModal: toggleEditModal } =
    useToggleModal()
  const [editId, setEditId] = useState<number>()
  const [editErrorMessage, setEditErrorMessage] = useState('')

  const onSubmitEdit = (data: EditUserBody) => {
    if (!editId) return toggleEditModal()
    mutateEdit(
      { userId: editId, body: data },
      {
        onSuccess: () => {
          setCompleteMessage(COMPLETE_MESSAGE_EDIT)
          toggleEditModal()
          toggleCompleteModal()
        },
        onError: (error) => {
          console.log(error)
          setEditErrorMessage(error.message)
        },
      },
    )
  }

  return {
    editId,
    setEditId,
    isLoadingEdit,
    isErrorEdit,
    isOpenEditModal,
    toggleEditModal,
    onSubmitEdit,
    editErrorMessage,
  }
}
