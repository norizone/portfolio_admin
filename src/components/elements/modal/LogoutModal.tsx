import PrimaryModal, { PrimaryModalProps } from './PrimaryModal'
import { PrimaryHeadline } from '../headline/PrimaryHeadline'
import { PrimaryBtn } from '../btn/PrimaryBtn'
import { ErrorMessageBox } from '../textBlock/ErrorMessageBox'

type props = Omit<PrimaryModalProps, 'children'> & {
  onSubmit: () => void
  isLoading?: boolean
  errorMessage?: string
  isError?: boolean
}

export const LogoutModal = (props: props) => {
  const {
    handleToggleModal,
    onSubmit,
    isLoading,
    errorMessage,
    isError,
    ...primaryModalProps
  } = props
  return (
    <PrimaryModal handleToggleModal={handleToggleModal} {...primaryModalProps}>
      <section className="text-center p-[1em] flex-center flex-col m-auto min-w-[30vw]">
        <PrimaryHeadline tag="h3">ログアウトしますか？</PrimaryHeadline>
        <div className="flex-center flex-row gap-[1em] mt-[3em]">
          <PrimaryBtn
            btnProps={{
              type: 'button',
            }}
            onClick={onSubmit}
            btnColor="primary"
            isLoading={isLoading}
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
        {isError && <ErrorMessageBox>{errorMessage}</ErrorMessageBox>}
      </section>
    </PrimaryModal>
  )
}
