import { BaseModal, BaseModalProps } from './BaseModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import { BaseBtn } from '../btn/BaseBtn'

type props = Omit<BaseModalProps, 'children'> & {
  onSubmit: () => void
}

export const LogoutModal = (props: props) => {
  const { handleOpenModal, isOpen, onSubmit } = props
  return (
    <BaseModal isOpen={isOpen} handleOpenModal={handleOpenModal}>
      <section className="text-center p-[1em] flex-center flex-col m-auto">
        <PrimaryHeadline tag="h3">ログアウトしますか？</PrimaryHeadline>
        <div className="flex-center flex-row gap-[2em] mt-[3em]">
          <BaseBtn type="button" onClick={onSubmit} btnColor="primary">
            はい
          </BaseBtn>
          <BaseBtn type="button" onClick={handleOpenModal} btnColor="cancel">
            いいえ
          </BaseBtn>
        </div>
      </section>
    </BaseModal>
  )
}
