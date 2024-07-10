'use client'

import { useMutateCreateUser } from '@/hooks/api/admin.hooks'
import { UserForm } from '../../main/components/UserForm'
import { styleFormBgWhite, stylePageFormWidth } from '@/styles/style'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { useToggleModal } from '@/hooks/useToggleModal'
import { COMPLETE_MESSAGE_CREATE } from '@/utils/const'
import { CreateUserBody } from '@/types/api/admin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routers } from '@/routers/routers'

export const UserCreate = () => {
  const router = useRouter()
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()
  const {
    mutate: mutateCreateUser,
    isPending: isLoadingCreateUser,
    isError: isErrorCreateUser,
  } = useMutateCreateUser()

  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data: CreateUserBody) => {
    mutateCreateUser(data, {
      onSuccess: () => {
        toggleCompleteModal()
        setIsSuccess(true)
      },
      onError: (error) => {
        setErrorMessage(error.message)
      },
    })
  }

  return (
    <>
      <UserForm
        formType="create"
        formClassName={`mt-[2em] ${styleFormBgWhite} ${stylePageFormWidth}`}
        onSubmitCreate={onSubmit}
        isLoading={isLoadingCreateUser}
        isError={isErrorCreateUser}
        submitErrorMessage={errorMessage}
      />
      <CompleteModal
        isOpen={isOpenCompleteModal}
        completeText={COMPLETE_MESSAGE_CREATE}
        handleToggleModal={() => {
          toggleCompleteModal()
          isSuccess && router.push(routers.USER_MANAGEMENT)
        }}
      />
    </>
  )
}
