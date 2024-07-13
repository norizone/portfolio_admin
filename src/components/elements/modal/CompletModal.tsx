import PrimaryModal, { PrimaryModalProps } from './PrimaryModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import { ReactNode } from 'react'
import { PrimaryBtn } from '../btn/PrimaryBtn'

type props = Omit<PrimaryModalProps, 'children'> & {
  completeText: ReactNode | string
  children?: ReactNode
}

export const CompleteModal = (props: props) => {
  const { handleToggleModal, completeText, children, ...primaryModalProps } =
    props

  return (
    <PrimaryModal handleToggleModal={handleToggleModal} {...primaryModalProps}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        <>
          <PrimaryHeadline tag="h3">{completeText}</PrimaryHeadline>
          {children}
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
    </PrimaryModal>
  )
}
