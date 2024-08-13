'use client'

import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { WorkForm } from '@/features/works/components/WorkForm'
import {
  useGetToolList,
  useGetWork,
} from '@/hooks/api/admin.hooks'
import { useCompleteModal } from '@/hooks/ui/useCompleteModal'
import { useRouter } from 'next/navigation'
import { routers } from '@/routers/routers'
import { DetailWork, ToolData } from '@/types/api/admin'
import { useMemo, useState } from 'react'
import { WorkFormValues } from '../../types/workType'
import { workFormDefaultValues } from '../../utils/const'
import { isEmpty } from '@/utils/dataFilters'
import { useEditWork } from '../hooks/useEditWork'

type Props = {
  SSRToolData?: ToolData[]
  SSRWorkData?: DetailWork
  id: number
}

export const EditWork = (props: Props) => {
  const { SSRToolData, SSRWorkData, id } = props
  const { data: toolData, isPending: isLoadingToolData } =
    useGetToolList(SSRToolData)
  const {
    data: workData,
    isLoading: isLoadingWorkData,
    isError: isErrorWorkData,
  } = useGetWork(id, SSRWorkData)
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<WorkFormValues>()

  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()

  const { onSubmitEdit, isLoadingEdit, isErrorEdit, errorMessageEdit } =
    useEditWork(setCompleteMessage, toggleCompleteModal, id)

  const onCloseCompleteModal = () => {
    toggleCompleteModal()
    router.push(routers.WORKS)
  }

  useMemo(() => {
    if (!workData) return
    const formatDefaultData: WorkFormValues = {
      ...workFormDefaultValues,
      ...workData,
      permission: isEmpty(workData.permission) ? '' : `${workData.permission}`,
      publication: isEmpty(workData.publication)
        ? ''
        : `${workData.publication}`,
      useTools: workData.useTools.map((tool) => tool.id),
    }
    setDefaultValues(formatDefaultData)
  }, [workData])

  return (
    <>
      {defaultValues && (
        <WorkForm
          toolData={toolData}
          formType={'edit'}
          defaultValues={defaultValues}
          onHandlerSubmit={onSubmitEdit}
          isLoadingSubmit={isLoadingEdit}
          isErrorSubmit={isErrorEdit}
          sendErrorMessage={errorMessageEdit}
        />
      )}

      <CompleteModal
        completeText={completeMessage}
        isOpen={isOpenCompleteModal}
        handleToggleModal={onCloseCompleteModal}
      />
    </>
  )
}
