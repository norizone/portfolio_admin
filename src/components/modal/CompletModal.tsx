import BaseModal, { BaseModalProps } from './BaseModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import { ReactNode, useState } from 'react'
import { PrimaryBtn } from '../btn/PrimaryBtn'

type props = Omit<BaseModalProps, 'children'> & {
  completeText: ReactNode | string
}

export const completeModal = (props: props) => {
  const { handleToggleModal, isOpen, completeText } = props

  return (
    <BaseModal isOpen={isOpen} handleToggleModal={handleToggleModal}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        <>
          <PrimaryHeadline tag="h3">{completeText}</PrimaryHeadline>
          <div className="flex-center flex-row gap-[2em] mt-[3em]">
            <PrimaryBtn
              btnProps={{
                type: 'button',
              }}
              onClick={handleToggleModal}
              btnColor="cancel"
            >
              閉じる
            </PrimaryBtn>
          </div>
        </>
      </section>
    </BaseModal>
  )
}
