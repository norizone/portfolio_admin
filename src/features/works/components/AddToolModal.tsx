'use client'
import { CreateToolForm } from '@/components/common/form/CreateToolForm'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { styleModalFormWidth } from '@/styles/style'
import { useCreateTool } from '@/hooks/common/useCreateTool'
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

  const onSuccess = () => {
    toggleCreateModal()
  }

  const {
    createErrorMessage,
    isLoadingCreate,
    isErrorCreate,
    setCreateErrorMessage,
    onSubmitCreate,
  } = useCreateTool(setCompleteMessage, toggleCompleteModal, onSuccess)

  const handleModal = () => {
    toggleCreateModal()
    setCreateErrorMessage('')
  }

  return (
    <>
      <PrimaryModal isOpen={isOpenCreateModal} handleToggleModal={handleModal}>
        <CreateToolForm
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
