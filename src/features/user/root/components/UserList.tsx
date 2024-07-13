'use client'

import { DeleteModal } from '@/components/elements/modal/DeleatModal'
import PrimaryTable from '@/components/elements/table/PrimaryTable'
import { EditBtn } from '@/components/elements/btn/EditBtn'
import { DeleteBtn } from '@/components/elements/btn/DeleteBtn'
import { ColumnsType } from '@/components/elements/table/PrimaryTable/type'
import { USER_ROLE } from '@/utils/enum'
import { convertUserRole } from '@/utils/converter'
import PrimaryModal from '@/components/elements/modal/PrimaryModal'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { UserForm } from '../../components/UserForm'
import { styleModalFormWidth, styleTableTRPadding } from '@/styles/style'
import { useGetUserList } from '@/hooks/api/admin.hooks'
import { UserData } from '@/types/api/admin'
import { useCompleteModal } from '@/hooks/ui/useCompleteModal'
import { useDeleteUser } from '../hooks/useDeleteUser'
import { useEditUser } from '../hooks/useEditUser'

type Props = {
  SSRData: UserData[]
}

export const UserList = (props: Props) => {
  const { SSRData } = props
  const { data: userList, isPending: isLoadingUserList } =
    useGetUserList(SSRData)

  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()

  const {
    deleteTitle,
    isLoadingDelete,
    isOpenDeleteModal,
    toggleDeleteModal,
    onClickDelete,
    onSubmitDelete,
    isDeleteError,
    deleteErrorMessage,
  } = useDeleteUser(setCompleteMessage, toggleCompleteModal)

  const {
    editId,
    setEditId,
    isLoadingEdit,
    isErrorEdit,
    isOpenEditModal,
    toggleEditModal,
    onSubmitEdit,
    editErrorMessage,
  } = useEditUser(setCompleteMessage, toggleCompleteModal)

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
            onClickDelete(row.id, row.email)
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
        isError={isDeleteError}
        errorMessage={deleteErrorMessage}
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
