import { useState } from 'react'
import { useMutateUpdateTools } from '@/hooks/api/admin.hooks'
import { COMPLETE_MESSAGE_EDIT } from '@/utils/const'
import { ToolData } from '@/types/api/admin'

export const useEditTool = () => {
  const {
    mutate: mutateUpdate,
    isPending: isLoadingUpdate,
    isError: isErrorUpdate,
  } = useMutateUpdateTools()
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editErrorMessage, setEditErrorMessage] = useState('')
  const [editData, setEditData] = useState<ToolData[]>([])

  const handleEditMode = () => {
    setIsEditMode(!isEditMode)
    setEditData([])
    setEditErrorMessage('')
  }

  const onSubmitEdit = (
    setCompleteMessage: (message: string) => void,
    toggleCompleteModal: () => void,
  ) => {
    const emptyTools = editData.some((tool) => tool.toolName === '')

    if (editData.length === 0) {
      setCompleteMessage('変更がありませんでした')
      toggleCompleteModal()
      return
    }
    if (emptyTools) {
      setCompleteMessage('入力漏れがあります')
      toggleCompleteModal()
      return
    }
    mutateUpdate(
      { tools: editData },
      {
        onSuccess: () => {
          setIsEditMode(false)
          setCompleteMessage(COMPLETE_MESSAGE_EDIT)
          toggleCompleteModal()
        },
        onError: (error) => {
          setEditErrorMessage(error.message)
        },
      },
    )
  }

  return {
    isEditMode,
    handleEditMode,
    editErrorMessage,
    isLoadingUpdate,
    isErrorUpdate,
    editData,
    setEditData,
    onSubmitEdit,
  }
}
