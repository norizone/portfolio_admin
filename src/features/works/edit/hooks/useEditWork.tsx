import { useMutateEditWork } from '@/hooks/api/admin.hooks'
import { COMPLETE_MESSAGE_EDIT } from '@/utils/const'
import { WorkFormValues } from '../../types/workType'
import { useState } from 'react'

export const useEditWork = (
  setCompleteMessage: (message: string) => void,
  toggleCompleteModal: () => void,
  id: number,
) => {
  const {
    mutate: mutateEditWork,
    isPending: isLoadingEdit,
    isError: isErrorEdit,
  } = useMutateEditWork(id)

  const [errorMessageEdit, setErrorMessageEdit] = useState('')

  const onSubmitEdit = (data: WorkFormValues) => {
    const selectedTool = data.useTools
    const useTools = selectedTool.map((tool) => ({
      id: tool,
    }))

    const {
      uploadArchiveImg,
      uploadSingleImgMain,
      uploadSingleImgSub,
      uploadSingleImgSub2,
      ...formData
    } = data

    const body = {
      ...formData,
      permission: Number(data.permission),
      publication: Number(data.publication),
      isLinkToUrl: Number(data.isLinkToUrl),
      useTools,
    }

    mutateEditWork(body, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_EDIT)
        toggleCompleteModal()
      },
      onError: (error) => {
        setErrorMessageEdit(error.message ?? '保存に失敗しました')
      },
    })
  }

  return {
    onSubmitEdit,
    isLoadingEdit,
    isErrorEdit,
    errorMessageEdit,
  }
}
