import PrimaryModal, { PrimaryModalProps } from './PrimaryModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import { PrimaryBtn } from '../btn/PrimaryBtn'

type props = Omit<PrimaryModalProps, 'children'> & {
  onSubmit: () => void
}

export const LogoutModal = (props: props) => {
  const { handleToggleModal, isOpen, onSubmit } = props
  return (
    <PrimaryModal isOpen={isOpen} handleToggleModal={handleToggleModal}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        <PrimaryHeadline tag="h3">ログアウトしますか？</PrimaryHeadline>
        <div className="flex-center flex-row gap-[1em] mt-[3em]">
          <PrimaryBtn
            btnProps={{
              type: 'button',
            }}
            onClick={onSubmit}
            btnColor="primary"
          >
            はい
          </PrimaryBtn>
          <PrimaryBtn
            btnProps={{
              type: 'button',
            }}
            onClick={handleToggleModal}
            btnColor="cancel"
          >
            いいえ
          </PrimaryBtn>
        </div>
      </section>
    </PrimaryModal>
  )
}
