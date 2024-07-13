'use client'

import { UserForm } from '../../components/UserForm'
import { styleFormBgWhite, stylePageFormWidth } from '@/styles/style'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { useRouter } from 'next/navigation'
import { routers } from '@/routers/routers'
import { useCompleteModal } from '@/hooks/ui/useCompleteModal'
import { useCreateUser } from '../hooks/useCreateUser'

export const UserCreate = () => {
  const router = useRouter()
  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()

  const {
    isSuccess,
    isErrorCreate,
    errorMessage,
    isLoadingCreateUser,
    onSubmitCreate,
  } = useCreateUser(setCompleteMessage, toggleCompleteModal)

  return (
    <>
      <UserForm
        formType="create"
        formClassName={`mt-[2em] ${styleFormBgWhite} ${stylePageFormWidth}`}
        onSubmitCreate={onSubmitCreate}
        isLoading={isLoadingCreateUser}
        isError={isErrorCreate}
        submitErrorMessage={errorMessage}
      />
      <CompleteModal
        isOpen={isOpenCompleteModal}
        completeText={completeMessage}
        handleToggleModal={() => {
          toggleCompleteModal()
          isSuccess && router.push(routers.USER_MANAGEMENT)
        }}
      />
    </>
  )
}
