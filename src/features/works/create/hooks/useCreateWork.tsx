import { useMutateCreateWork } from '@/hooks/api/admin.hooks'
import { COMPLETE_MESSAGE_CREATE } from '@/utils/const'
import { WorkFormValues } from '../../types/workType'
import { useState } from 'react'
import { EditCreateWorkBody } from '@/types/api/admin'

export const useCreateWork = (
  setCompleteMessage: (message: string) => void,
  toggleCompleteModal: () => void,
) => {
  const {
    mutate: mutateCreateWork,
    isPending: isLoadingCreate,
    isError: isErrorCreate,
  } = useMutateCreateWork()

  const [errorMessageCreate, setErrorMessageCreate] = useState('')

  const onSubmitCreate = (data: WorkFormValues) => {
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

    const body: EditCreateWorkBody = {
      ...formData,
      permission: Number(data.permission),
      publication: Number(data.publication),
      useTools,
    }

    mutateCreateWork(body, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_CREATE)
        toggleCompleteModal()
      },
      onError: (error) => {
        setErrorMessageCreate(error.message ?? '保存に失敗しました')
      },
    })
  }

  return {
    onSubmitCreate,
    isLoadingCreate,
    isErrorCreate,
    errorMessageCreate,
  }
}
