'use client'

import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { ToolForm } from './ToolForm'
import { styleModalFormWidth } from '@/styles/style'
import { useToggleModal } from '@/hooks/useToggleModal'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { useState } from 'react'

export const ToolCreate = () => {
  const { isOpenModal: isOpenCreateModal, toggleModal: toggleCreateModal } =
    useToggleModal()
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()
  const [completeMessage, setCompleteMessage] = useState<string>()

  const onComplete = () => {
    toggleCreateModal()
    toggleCompleteModal()
  }

  return (
    <>
      <PrimaryBtn btnColor="primary" onClick={toggleCreateModal}>
        新規作成
      </PrimaryBtn>
      <PrimaryModal
        isOpen={isOpenCreateModal}
        handleToggleModal={toggleCreateModal}
      >
        <ToolForm
          formType="create"
          formClassName={styleModalFormWidth}
          setCompleteMessage={setCompleteMessage}
          onComplete={onComplete}
        />
      </PrimaryModal>

      <CompleteModal
        isOpen={isOpenCompleteModal}
        completeText={completeMessage}
        handleToggleModal={toggleCompleteModal}
      />
    </>
  )
}
