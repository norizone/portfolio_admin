'use client'

import { PrimaryPagination } from '@/components/pagination/PrimaryPagination'
import { useState } from 'react'
import { useFixBody } from '@/hooks/useFixeBody'
import { DeleteModal } from '@/components/modal/DeleatModal'
import PrimaryTable from '@/components/table/PrimaryTable'
import { EditBtn } from '@/components/btn/EditBtn'
import { DeleteBtn } from '@/components/btn/DeleteBtn'
import { ColumnsType } from '@/components/table/PrimaryTable/type'
import Link from 'next/link'
import { routers } from '@/routers/routers'
import { Tool } from '@prisma/client'
import PrimaryModal from '@/components/modal/PrimaryModal'
import { ToolForm } from './ToolForm'
import { styleModalFormWidth } from '@/styles/style'
import { useToggleModal } from '@/hooks/useToggleModal'
import { CompleteModal } from '@/components/modal/CompletModal'

const tableElementClassName = 'p-[.6em]'

type ToolListData = Pick<Tool, 'id' | 'toolName'>

const data = [
  {
    id: 1,
    toolName: 'React',
  },
  {
    id: 2,
    toolName: 'Vue',
  },
]

export const ToolList = () => {
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

  const tableColumns: ColumnsType<ToolListData>[] = [
    {
      header: 'ID',
      key: 'id',
    },
    {
      header: 'タイトル',
      key: 'toolName',
      width: 8,
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
        <ToolForm
          formType="edit"
          defaultValues={data.find((tool) => tool.id === editId)}
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
