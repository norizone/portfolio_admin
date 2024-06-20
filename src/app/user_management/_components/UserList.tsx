'use client'
import { PrimaryPagination } from '@/components/pagination/PrimaryPagination'
import { useState } from 'react'
import { DeleteModal } from '@/components/modal/DeleatModal'
import PrimaryTable from '@/components/table/PrimaryTable'
import { EditBtn } from '@/components/btn/EditBtn'
import { DeleteBtn } from '@/components/btn/DeleteBtn'
import { ColumnsType } from '@/components/table/PrimaryTable/type'
import { User } from '@prisma/client'
import { useToggleModal } from '@/hooks/useToggleModal'
import { USER_ROLE } from '@/utils/enum'
import { convertUserRole } from '@/utils/converter'
import PrimaryModal from '@/components/modal/PrimaryModal'
import { CompleteModal } from '@/components/modal/CompletModal'
import { UserForm } from './UserForm'
import { styleModalFormWidth } from '@/styles/style'

const tableElementClassName = 'p-[.6em]'

type UserList = Pick<User, 'id' | 'email'> & {
  permission: USER_ROLE
}

const data: UserList[] = [
  {
    id: 1,
    email: 'Name1',
    permission: 1,
  },
  {
    id: 2,
    email: 'Name2',
    permission: 2,
  },
]

export const UserList = () => {
  const [deleteId, setDeleteId] = useState<number>()
  const [editId, setEditId] = useState<number>()
  const [completeMessage, setCompleteMessage] = useState<string>()
  const { isOpenModal: isOpenEditModal, toggleModal: toggleEditModal } =
    useToggleModal()
  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()
  const { isOpenModal: isOpenCompleteModal, toggleModal: toggleCompleteModal } =
    useToggleModal()

  const onDeleteSubmit = () => {
    setCompleteMessage('削除しました')
    toggleDeleteModal()
    toggleCompleteModal()
    console.log(deleteId)
  }

  const onCompleteEdit = () => {
    toggleEditModal()
    toggleCompleteModal()
  }

  const tableColumns: ColumnsType<UserList>[] = [
    {
      header: 'ID',
      key: 'id',
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
      converter: (row) => convertUserRole[row.permission],
    },
    {
      header: '編集',
      key: 'action',
      renderCell: (row) => (
        <EditBtn
          customClassName={tableElementClassName}
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
          customClassName={tableElementClassName}
          onClick={() => {
            toggleDeleteModal()
            setDeleteId(row.id)
          }}
        />
      ),
    },
  ]

  return (
    <>
      <div className="mt-[2em]">
        <PrimaryTable columns={tableColumns} data={data} />
      </div>
      <div className="mt-[2em]">
        <PrimaryPagination totalPage={20} currentPage={3} />
      </div>

      <DeleteModal
        isOpen={isOpenDeleteModal}
        handleToggleModal={toggleDeleteModal}
        onSubmit={onDeleteSubmit}
      />

      <PrimaryModal
        isOpen={isOpenEditModal}
        handleToggleModal={toggleEditModal}
      >
        <UserForm
          formType="edit"
          defaultValues={data.find((user) => user.id === editId)}
          formClassName={styleModalFormWidth}
          onComplete={onCompleteEdit}
          setCompleteMessage={setCompleteMessage}
        />
      </PrimaryModal>

      <CompleteModal
        isOpen={isOpenCompleteModal}
        completeText={completeMessage}
        handleToggleModal={toggleCompleteModal}
      />
    </>
  )
}
