import { useMutationLogout } from '../api/admin.hooks'
import { useToggleModal } from './useToggleModal'
import { useState } from 'react'

export const useLogoutModal = (
  setCompleteMessage?: (message: string) => void,
  toggleCompleteModal?: () => void,
  onSuccessEvent?: () => void,
) => {
  const { isOpenModal: isOpenLogoutModal, toggleModal: toggleLogoutModal } =
    useToggleModal()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    mutate,
    isPending: isLoadingLogout,
    isError: isErrorLogout,
  } = useMutationLogout()

  const onLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        toggleLogoutModal()
        setCompleteMessage && setCompleteMessage('ログアウトしました')
        toggleCompleteModal && toggleCompleteModal()
        onSuccessEvent && onSuccessEvent()
      },
      onError: () => {
        setErrorMessage('ログアウトに失敗しました')
      },
    })
  }
  return {
    onLogout,
    isOpenLogoutModal,
    toggleLogoutModal,
    isLoadingLogout,
    isErrorLogout,
    errorMessage,
  }
}
