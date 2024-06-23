'use client'

import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'

type Props = {
  isEditMode: boolean
  toggleEdit: () => void
  onClickCreate: () => void
  onClickSubmitEdit: () => void
  isLoadingUpdate?: boolean
}

export const ToolListButtons = (props: Props) => {
  const {
    isEditMode,
    toggleEdit,
    onClickCreate,
    onClickSubmitEdit,
    isLoadingUpdate,
  } = props

  return (
    <>
      <div className="mt-[2em] w-max ml-auto flex flex-row gap-x-[2em]">
        <PrimaryBtn
          btnColor={!isEditMode ? 'success' : 'cancel'}
          btnProps={{ type: 'button' }}
          onClick={toggleEdit}
        >
          {!isEditMode ? '編集' : 'キャンセル'}
        </PrimaryBtn>

        {isEditMode ? (
          <PrimaryBtn
            btnColor="primary"
            onClick={onClickSubmitEdit}
            isLoading={isLoadingUpdate}
          >
            保存
          </PrimaryBtn>
        ) : (
          <PrimaryBtn btnColor="primary" onClick={onClickCreate}>
            新規作成
          </PrimaryBtn>
        )}
      </div>
    </>
  )
}
