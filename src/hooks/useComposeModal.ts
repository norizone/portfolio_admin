import { useState } from 'react'
import { useToggleModal } from './useToggleModal'

export const useCompleteModal = () => {
  const [completeMessage, setCompleteMessage] = useState<string | undefined>(
    undefined,
  )
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()

  const showCompleteMessage = (message: string) => {
    setCompleteMessage(message)
    toggleCompleteModal()
  }

  return {
    completeMessage,
    isOpenCompleteModal,
    showCompleteMessage,
    toggleCompleteModal,
  }
}
