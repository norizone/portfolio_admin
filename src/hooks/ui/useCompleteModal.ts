import { useState } from 'react'
import { useToggleModal } from '@/hooks/ui/useToggleModal'

export const useCompleteModal = () => {
  const [completeMessage, setCompleteMessage] = useState<string>()
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()

  return {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  }
}
