'use client'
import { ToolForm } from '@/features/tool/components/ToolForm'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { styleModalFormWidth } from '@/styles/style'
import { useCreateTool } from '@/features/tool/hooks/useCreateTool'
import { useCompleteModal } from '@/hooks/ui/useCompleteModal'

type Props = {
  isOpenCreateModal: boolean
  toggleCreateModal: () => void
}

export const AddToolModal = (props: Props) => {
  const { isOpenCreateModal, toggleCreateModal } = props
  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()

  const {
    createErrorMessage,
    isLoadingCreate,
    isErrorCreate,
    setCreateErrorMessage,
    onSubmitCreate,
  } = useCreateTool(setCompleteMessage, toggleCompleteModal)

  const handleModal = () => {
    toggleCreateModal()
    setCreateErrorMessage('')
  }

  return (
    <>
      <PrimaryModal isOpen={isOpenCreateModal} handleToggleModal={handleModal}>
        <ToolForm
          formClassName={styleModalFormWidth}
          onSubmit={onSubmitCreate}
          isLoading={isLoadingCreate}
          isError={isErrorCreate}
          submitErrorMessage={createErrorMessage}
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
