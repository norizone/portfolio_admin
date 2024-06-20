import { useState } from 'react'
import { useFixBody } from './useFixeBody'

type UseToggleModal = {
  isOpenModal: boolean
  toggleModal: () => void
}

export const useToggleModal = (): UseToggleModal => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { fixBody, unfixedBody } = useFixBody()

  const toggleModal = () => {
    isOpenModal ? unfixedBody() : fixBody()
    setIsOpenModal(!isOpenModal)
  }

  return {
    isOpenModal,
    toggleModal,
  }
}
