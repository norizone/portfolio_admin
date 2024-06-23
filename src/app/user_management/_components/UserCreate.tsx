'use client'

import { useMutateCreateUser } from '@/hooks/api/admin.hooks'
import { UserForm } from './UserForm'
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
  const { mutate: mutateCreateUser, isPending: isLoadingCreateUser } =
    useMutateCreateUser()

  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = (data: CreateUserBody) => {
    mutateCreateUser(data, {
      onSuccess: () => {
        toggleCompleteModal()
        setIsSuccess(true)
      },
    })
  }

  return (
    <>
      <UserForm
        formType="create"
        formClassName={`mt-[2em] ${styleFormBgWhite} ${stylePageFormWidth}`}
        onSubmitCreate={onSubmit}
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
