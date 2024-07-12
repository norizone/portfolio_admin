'use client'

import { useState } from 'react'
import { DeleteModal } from '@/components/elements/modal/DeleatModal'
import PrimaryTable from '@/components/elements/table/PrimaryTable'
import { EditBtn } from '@/components/elements/btn/EditBtn'
import { DeleteBtn } from '@/components/elements/btn/DeleteBtn'
import { ColumnsType } from '@/components/elements/table/PrimaryTable/type'
import { useToggleModal } from '@/hooks/useToggleModal'
import { USER_ROLE } from '@/utils/enum'
import { convertUserRole } from '@/utils/converter'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { UserForm } from '../../components/UserForm'
import { styleModalFormWidth, styleTableTRPadding } from '@/styles/style'
import {
  useGetUserList,
  useMutateDeleteUser,
  useMutateEditUser,
} from '@/hooks/api/admin.hooks'
import { EditUserBody, UserData } from '@/types/api/admin'
import { COMPLETE_MESSAGE_DELETE, COMPLETE_MESSAGE_EDIT } from '@/utils/const'

type Props = {
  SSRData: UserData[]
}

export const UserList = (props: Props) => {
  const { SSRData } = props
  const { data: userList, isPending: isLoadingUserList } =
    useGetUserList(SSRData)

  // 完了
  const [completeMessage, setCompleteMessage] = useState<string>()
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()

  // 削除
  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useMutateDeleteUser()
  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()
  const [deleteId, setDeleteId] = useState<number>()
  const [deleteTitle, setDeleteTitle] = useState<string>()

  const onSubmitDelete = () => {
    if (!deleteId) return toggleDeleteModal()
    mutateDelete(deleteId, {
      onSuccess: () => {
        setCompleteMessage(COMPLETE_MESSAGE_DELETE)
        toggleDeleteModal()
        toggleCompleteModal()
      },
      onError: (error) => {
        setEditErrorMessage(error.message)
      },
    })
  }

  // 編集
  const {
    mutate: mutateEdit,
    isPending: isLoadingEdit,
    isError: isErrorEdit,
  } = useMutateEditUser()
  const { isOpenModal: isOpenEditModal, toggleModal: toggleEditModal } =
    useToggleModal()
  const [editId, setEditId] = useState<number>()
  const [editErrorMessage, setEditErrorMessage] = useState('')
  const onSubmitEdit = (data: EditUserBody) => {
    if (!editId) return toggleEditModal()
    mutateEdit(
      { userId: editId, body: data },
      {
        onSuccess: () => {
          setCompleteMessage(COMPLETE_MESSAGE_EDIT)
          toggleEditModal()
          toggleCompleteModal()
        },
        onError: (error) => {
          console.log(error)
          setEditErrorMessage(error.message)
        },
      },
    )
  }

  const tableColumns: ColumnsType<UserData>[] = [
    {
      header: 'ID',
      key: 'id',
      tHeaderTHClassName: styleTableTRPadding,
    },
    {
      header: 'email',
      key: 'email',
      width: 5,
    },
    {
      header: '権限',
      key: 'permission',
      width: 2,
      converter: (row) => convertUserRole[row.permission as USER_ROLE],
    },
    {
      header: '編集',
      key: 'action',
      renderCell: (row) => (
        <EditBtn
          customClassName={styleTableTRPadding}
          onClick={() => {
            toggleEditModal()
            setEditId(row.id)
          }}
        />
      ),
    },
    {
      header: '削除',
      key: 'action',
      renderCell: (row) => (
        <DeleteBtn
          customClassName={styleTableTRPadding}
          onClick={() => {
            toggleDeleteModal()
            setDeleteTitle(row.email)
            setDeleteId(row.id)
          }}
        />
      ),
    },
  ]

  return (
    <>
      <div className="mt-[2em]">
        <PrimaryTable
          columns={tableColumns}
          data={userList}
          isLoading={isLoadingUserList}
        />
      </div>

      {/* 編集モーダル */}
      <PrimaryModal
        isOpen={isOpenEditModal}
        handleToggleModal={toggleEditModal}
      >
        <UserForm
          formType="edit"
          defaultValues={userList?.find((user) => user.id === editId)}
          formClassName={styleModalFormWidth}
          onSubmitEdit={onSubmitEdit}
          isLoading={isLoadingEdit}
          isError={isErrorEdit}
          submitErrorMessage={editErrorMessage}
        />
      </PrimaryModal>

      {/* 削除モーダル */}
      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleToggleModal={toggleDeleteModal}
        onSubmit={onSubmitDelete}
        title={deleteTitle ? `${deleteTitle} を削除しますか？` : ''}
        isLoading={isLoadingDelete}
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
