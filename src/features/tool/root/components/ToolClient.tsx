'use client'

import { ToolList } from './ToolList'
import { ToolListButtons } from './ToolListButtons '
import { useGetToolList } from '@/hooks/api/admin.hooks'
import { DeleteModal } from '@/components/elements/modal/DeleatModal'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { CreateToolBody, ToolData } from '@/types/api/admin'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { ToolForm } from '../../../../components/organism/form/ToolForm'
import { styleModalFormWidth } from '@/styles/style'
import { ErrorMessageBox } from '@/components/elements/textBlock/ErrorMessageBox'
import { useCompleteModal } from '../hooks/useCompleteModal'
import { useDeleteTool } from '../hooks/useDeleteTool'
import { useCreateTool } from '../hooks/useCreateTool'
import { useEditTool } from '../hooks/useEditTool'

type Props = {
  SSRData: ToolData[]
}

export const ToolClient = (props: Props) => {
  const { SSRData } = props
  const { data: toolListData, isPending: isLoadingToolList } =
    useGetToolList(SSRData)

  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()

  const {
    deleteId,
    deleteTitle,
    isLoadingDelete,
    isOpenDeleteModal,
    toggleDeleteModal,
    onClickDelete,
    onSubmitDelete,
  } = useDeleteTool()

  const {
    createErrorMessage,
    isLoadingCreate,
    isErrorCreate,
    isOpenCreateModal,
    setCreateErrorMessage,
    toggleCreateModal,
    onSubmitCreate,
  } = useCreateTool()

  const {
    isEditMode,
    handleEditMode,
    editErrorMessage,
    isLoadingUpdate,
    isErrorUpdate,
    editData,
    setEditData,
    onSubmitEdit,
  } = useEditTool()

  const handlerSubmitEdit = () => {
    onSubmitEdit(setCompleteMessage, toggleCompleteModal)
  }

  const handlerSubmitCreate = (data: CreateToolBody) => {
    onSubmitCreate(data, setCompleteMessage, toggleCompleteModal)
  }

  const handlerSubmitDelete = () => {
    onSubmitDelete(setCompleteMessage, toggleCompleteModal)
  }

  return (
    <>
      <ToolListButtons
        onClickCreate={toggleCreateModal}
        isEditMode={isEditMode}
        toggleEdit={handleEditMode}
        onClickSubmitEdit={handlerSubmitEdit}
        isLoadingUpdate={isLoadingUpdate}
        dataLength={toolListData?.length}
      />
      {isEditMode && isErrorUpdate && (
        <ErrorMessageBox customClassName="max-w-[400px] mx-auto mt-[2em]">
          {editErrorMessage}
        </ErrorMessageBox>
      )}
      <ToolList
        toolItems={toolListData}
        isEditMode={isEditMode}
        isLoading={isLoadingToolList}
        onClickDelete={onClickDelete}
        setEditData={setEditData}
        editData={editData}
      />
      {isEditMode && (
        <div className="mt-[2em] flex-center flex-col">
          {isErrorUpdate && (
            <ErrorMessageBox customClassName="max-w-[400px]">
              {editErrorMessage}
            </ErrorMessageBox>
          )}
          <PrimaryBtn
            customClassName="mt-[2em]"
            btnColor="primary"
            btnProps={{ type: 'button' }}
            onClick={handlerSubmitEdit}
            isLoading={isLoadingUpdate}
          >
            保存
          </PrimaryBtn>
        </div>
      )}

      {/* 新規作成モーダル */}
      <PrimaryModal
        isOpen={isOpenCreateModal}
        handleToggleModal={() => {
          toggleCreateModal()
          setCreateErrorMessage('')
        }}
      >
        <ToolForm
          formClassName={styleModalFormWidth}
          onSubmit={handlerSubmitCreate}
          isLoading={isLoadingCreate}
          isError={isErrorCreate}
          submitErrorMessage={createErrorMessage}
        />
      </PrimaryModal>

      {/* 削除モーダル */}
      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleToggleModal={toggleDeleteModal}
        onSubmit={handlerSubmitDelete}
        title={deleteTitle ? `${deleteTitle} を削除しますか？` : ''}
      />

      {/* 完了モーダル */}
      <CompleteModal
        isOpen={isOpenCompleteModal}
        completeText={completeMessage}
        handleToggleModal={toggleCompleteModal}
      />
    </>
  )
}
