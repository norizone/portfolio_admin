import PrimaryModal, { PrimaryModalProps } from './PrimaryModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import { PrimaryBtn } from '../btn/PrimaryBtn'

type props = Omit<PrimaryModalProps, 'children'> & {
  onSubmit: () => void
  isLoading?: boolean
}

export const DeleteModal = (props: props) => {
  const { handleToggleModal, isOpen, onSubmit, isLoading } = props

  return (
    <PrimaryModal isOpen={isOpen} handleToggleModal={handleToggleModal}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        <PrimaryHeadline tag="h3">削除しますか？</PrimaryHeadline>
        <div className="flex-center flex-row gap-[1em] mt-[3em]">
          <PrimaryBtn
            onClick={() => {
              onSubmit()
            }}
            btnProps={{
              type: 'button',
            }}
            btnColor="error"
            isLoading={isLoading}
          >
            削除する
          </PrimaryBtn>
          <PrimaryBtn
            btnProps={{
              type: 'button',
            }}
            onClick={handleToggleModal}
            btnColor="cancel"
          >
            削除しない
          </PrimaryBtn>
        </div>
      </section>
    </PrimaryModal>
  )
}
