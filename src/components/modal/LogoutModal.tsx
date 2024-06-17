import { BaseModal, BaseModalProps } from './BaseModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import BaseBtn from '../btn/BaseBtn'

type props = Omit<BaseModalProps, 'children'> & {
  onSubmit: () => void
}

export const LogoutModal = (props: props) => {
  const { handleOpenModal, isOpen, onSubmit } = props
  return (
    <BaseModal isOpen={isOpen} handleOpenModal={handleOpenModal}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        <PrimaryHeadline tag="h3">ログアウトしますか？</PrimaryHeadline>
        <div className="flex-center flex-row gap-[1em] mt-[3em]">
          <BaseBtn
            btnProps={{
              type: 'button',
            }}
            onClick={onSubmit}
            btnColor="primary"
          >
            はい
          </BaseBtn>
          <BaseBtn
            btnProps={{
              type: 'button',
            }}
            onClick={handleOpenModal}
            btnColor="cancel"
          >
            いいえ
          </BaseBtn>
        </div>
      </section>
    </BaseModal>
  )
}
