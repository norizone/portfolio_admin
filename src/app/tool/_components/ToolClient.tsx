'use client'

import { useState } from 'react'
import { ToolList } from './ToolList'
import { ToolListButtons } from './ToolListButtons '
import {
  useGetToolList,
  useMutateCreateTool,
  useMutateDeleteTool,
  useMutateUpdateTools,
} from '@/hooks/api/admin.hooks'
import { DeleteModal } from '@/components/elements/modal/DeleatModal'
import { useToggleModal } from '@/hooks/useToggleModal'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { CreateToolBody, ToolData } from '@/types/api/admin'
import {
  COMPLETE_MESSAGE_CREATE,
  COMPLETE_MESSAGE_DELETE,
  COMPLETE_MESSAGE_EDIT,
} from '@/utils/const'
import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { ToolForm } from './ToolForm'
import { styleModalFormWidth } from '@/styles/style'

type Props = {
  SSRData: ToolData[]
}

export const ToolClient = (props: Props) => {
  const { SSRData } = props
  const { data: toolListData, isPending: isLoadingToolList } =
    useGetToolList(SSRData)

  // 完了
  const [completeMessage, setCompleteMessage] = useState<string>()
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()

  // 削除
  const [deleteId, setDeleteId] = useState<number>()
  const [deleteTitle, setDeleteTitle] = useState<string>()
  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useMutateDeleteTool()
  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()
  const onClickDelete = (id: number, title: string) => {
    if (!id) return
    setDeleteId(id)
    setDeleteTitle(title)
    toggleDeleteModal()
  }
  const onSubmitDelete = () => {
    if (!deleteId) return toggleDeleteModal()
    mutateDelete(deleteId, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_DELETE)
        toggleDeleteModal()
        toggleCompleteModal()
      },
    })
  }

  // 新規作成
  const { mutate: mutateCreate, isPending: isLoadingCreate } =
    useMutateCreateTool()
  const { isOpenModal: isOpenCreateModal, toggleModal: toggleCreateModal } =
    useToggleModal()
  const onSubmitCreate = (data: CreateToolBody) => {
    mutateCreate(data, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_CREATE)
        toggleCreateModal()
        toggleCompleteModal()
      },
    })
  }

  // 編集
  const { mutate: mutateUpdate, isPending: isLoadingUpdate } =
    useMutateUpdateTools()
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editData, setEditData] = useState<ToolData[]>([])
  const onSubmitEdit = () => {
    const emptyTools = editData.some((tool) => tool.toolName === '')

    if (editData.length === 0) {
      setCompleteMessage('変更がありませんでした')
      toggleCompleteModal()
      return
    }
    if (emptyTools) {
      setCompleteMessage('入力漏れがあります')
      toggleCompleteModal()
      return
    }
    mutateUpdate(
      { tools: editData },
      {
        onSuccess: () => {
          setIsEditMode(false)
          setCompleteMessage(COMPLETE_MESSAGE_EDIT)
          toggleCompleteModal()
        },
      }
    )
  }

  return (
    <>
      <ToolListButtons
        onClickCreate={toggleCreateModal}
        isEditMode={isEditMode}
        toggleEdit={() => setIsEditMode(!isEditMode)}
        onClickSubmitEdit={onSubmitEdit}
        isLoadingUpdate={isLoadingUpdate}
      />
      <ToolList
        toolItems={toolListData}
        isEditMode={isEditMode}
        isLoading={isLoadingToolList}
        onClickDelete={onClickDelete}
        setEditData={setEditData}
        editData={editData}
      />
      {isEditMode && (
        <div className="mt-[2em] flex-center">
          <PrimaryBtn
            btnColor="primary"
            btnProps={{ type: 'button' }}
            onClick={onSubmitEdit}
            isLoading={isLoadingUpdate}
          >
            保存
          </PrimaryBtn>
        </div>
      )}

      {/* 新規作成モーダル */}
      <PrimaryModal
        isOpen={isOpenCreateModal}
        handleToggleModal={toggleCreateModal}
      >
        <ToolForm
          formClassName={styleModalFormWidth}
          onSubmit={onSubmitCreate}
          isLoading={isLoadingCreate}
        />
      </PrimaryModal>

      {/* 削除モーダル */}
      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleToggleModal={toggleDeleteModal}
        onSubmit={onSubmitDelete}
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
