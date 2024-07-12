'use client'
import { ToolForm } from '@/components/organism/form/ToolForm'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { useMutateCreateTool } from '@/hooks/api/admin.hooks'
import { useToggleModal } from '@/hooks/useToggleModal'
import { styleModalFormWidth } from '@/styles/style'
import { CreateToolBody } from '@/types/api/admin'
import { COMPLETE_MESSAGE_CREATE } from '@/utils/const'
import { useState } from 'react'

type Props = {
  isOpenCreateModal: boolean
  toggleCreateModal: () => void
}

export const AddToolModal = (props: Props) => {
  const { isOpenCreateModal, toggleCreateModal } = props
  const [completeMessage, setCompleteMessage] = useState<string>()
  const [createErrorMessage, setCreateErrorMessage] = useState('')
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()
  const {
    mutate: mutateCreate,
    isPending: isLoadingCreate,
    isError,
  } = useMutateCreateTool()
  const onSubmitCreate = (data: CreateToolBody) => {
    mutateCreate(data, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_CREATE)
        toggleCreateModal()
        toggleCompleteModal()
      },
      onError: (error) => {
        setCreateErrorMessage(error.message)
      },
    })
  }

  const handleModal = () => {
    toggleCreateModal()
    setCreateErrorMessage('')
  }

  return (
    <>
      {/* 新規作成モーダル */}
      <PrimaryModal isOpen={isOpenCreateModal} handleToggleModal={handleModal}>
        <ToolForm
          formClassName={styleModalFormWidth}
          onSubmit={onSubmitCreate}
          isLoading={isLoadingCreate}
          isError={isError}
          submitErrorMessage={createErrorMessage}
        />
      </PrimaryModal>

      {/* 完了モーダル */}
      <CompleteModal
        isOpen={isOpenCompleteModal}
        completeText={completeMessage}
        handleToggleModal={toggleCompleteModal}
      />
    </>
  )
}
