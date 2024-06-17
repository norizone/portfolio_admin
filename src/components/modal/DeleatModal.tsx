import BaseModal, { BaseModalProps } from './BaseModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import BaseBtn from '../btn/BaseBtn'
import { useState } from 'react'

type props = Omit<BaseModalProps, 'children'> & {
  onSubmit: () => void
  isSuccess?: boolean
  modalType: 'confirm' | 'complete'
}

export const DeleteModal = (props: props) => {
  const { handleOpenModal, isOpen, onSubmit, isSuccess } = props
  const [modalType, setModalType] = useState<'confirm' | 'complete'>('confirm')

  return (
    <BaseModal isOpen={isOpen} handleOpenModal={handleOpenModal}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        {modalType === 'confirm' && (
          <>
            <PrimaryHeadline tag="h3">削除しますか？</PrimaryHeadline>
            <div className="flex-center flex-row gap-[1em] mt-[3em]">
              <BaseBtn
                onClick={() => {
                  onSubmit
                  setModalType('complete')
                }}
                btnProps={{
                  type: 'button',
                }}
                btnColor="error"
              >
                削除する
              </BaseBtn>
              <BaseBtn
                btnProps={{
                  type: 'button',
                }}
                onClick={handleOpenModal}
                btnColor="cancel"
              >
                削除しない
              </BaseBtn>
            </div>
          </>
        )}
        {modalType === 'complete' && (
          <>
            <PrimaryHeadline tag="h3">
              {isSuccess ? '削除しました' : '削除できませんでした'}
            </PrimaryHeadline>
            <div className="flex-center flex-row gap-[2em] mt-[3em]">
              <BaseBtn
                btnProps={{
                  type: 'button',
                }}
                onClick={handleOpenModal}
                btnColor="cancel"
              >
                閉じる
              </BaseBtn>
            </div>
          </>
        )}
      </section>
    </BaseModal>
  )
}
