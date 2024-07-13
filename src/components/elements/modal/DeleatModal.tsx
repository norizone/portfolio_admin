import PrimaryModal, { PrimaryModalProps } from './PrimaryModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import { PrimaryBtn } from '../btn/PrimaryBtn'
import { ErrorMessageBox } from '../textBlock/ErrorMessageBox'

type props = Omit<PrimaryModalProps, 'children'> & {
  onSubmit: () => void
  isLoading?: boolean
  title?: string
  errorMessage?: string
  isError?: boolean
}

export const DeleteModal = (props: props) => {
  const {
    handleToggleModal,
    onSubmit,
    isLoading,
    title = '削除しますか？',
    errorMessage,
    isError,
    ...primaryModalProps
  } = props

  return (
    <PrimaryModal handleToggleModal={handleToggleModal} {...primaryModalProps}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        <PrimaryHeadline tag="h3">{title}</PrimaryHeadline>
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
        {isError && <ErrorMessageBox>{errorMessage}</ErrorMessageBox>}
      </section>
    </PrimaryModal>
  )
}
