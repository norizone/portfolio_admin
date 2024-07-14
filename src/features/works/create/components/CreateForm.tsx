'use client'

import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { WorkForm } from '../../components/WorkForm'
import { useCompleteModal } from '@/hooks/ui/useCompleteModal'
import { useRouter } from 'next/navigation'
import { routers } from '@/routers/routers'
import { useCreateWork } from '../hooks/useCreateWork'
import { ToolData } from '@/types/api/admin'
import { useGetToolList } from '@/hooks/api/admin.hooks'
import { workFormDefaultValues } from '../../utils/const'

type Props = {
  SSRToolData?: ToolData[]
}

export const CreateForm = (props: Props) => {
  const { SSRToolData } = props

  const { data: toolData, isPending: isLoadingToolData } =
    useGetToolList(SSRToolData)

  const router = useRouter()

  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()

  const { onSubmitCreate, isLoadingCreate, isErrorCreate, errorMessageCreate } =
    useCreateWork(setCompleteMessage, toggleCompleteModal)

  const onCloseCompleteModal = () => {
    toggleCompleteModal()
    router.push(routers.WORKS)
  }

  return (
    <>
      <WorkForm
        toolData={toolData}
        formType="create"
        onHandlerSubmit={onSubmitCreate}
        isLoadingSubmit={isLoadingCreate}
        isErrorSubmit={isErrorCreate}
        sendErrorMessage={errorMessageCreate}
        defaultValues={workFormDefaultValues}
      />
      <CompleteModal
        completeText={completeMessage}
        isOpen={isOpenCompleteModal}
        handleToggleModal={onCloseCompleteModal}
      />
    </>
  )
}
