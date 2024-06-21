'use client'
import { PrimaryPagination } from '@/components/elements/pagination/PrimaryPagination'
import { useState } from 'react'
import { useFixBody } from '@/hooks/useFixeBody'
import { DeleteModal } from '@/components/elements/modal/DeleatModal'
import { convertPublication } from '@/utils/converter'
import PrimaryTable from '@/components/elements/table/PrimaryTable'
import { EditBtn } from '@/components/elements/btn/EditBtn'
import { DeleteBtn } from '@/components/elements/btn/DeleteBtn'
import { ColumnsType } from '@/components/elements/table/PrimaryTable/type'
import { PUBLICATION_STATUS } from '@/utils/enum'
import Link from 'next/link'
import { routers } from '@/routers/routers'
import { useToggleModal } from '@/hooks/useToggleModal'

const tableElementClassName = 'p-[.6em]'

type WorkList = {
  id: number
  title: string
  order: number
  publicationStatus: PUBLICATION_STATUS
}

const data = [
  {
    id: 1,
    title: 'spafooopa',
    order: 1,
    publicationStatus: 0,
  },
  {
    id: 2,
    title: 'spafooopa',
    order: 2,
    publicationStatus: 1,
  },
]

export const WorkList = () => {
  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()
  const [deleteId, setDeleteId] = useState<number>()

  const onDeleteSubmit = () => {
    console.log(deleteId)
  }

  const tableColumns: ColumnsType<WorkList>[] = [
    {
      header: 'ID',
      key: 'id',
    },
    {
      header: 'タイトル',
      key: 'title',
      width: 4,
    },
    {
      header: '並び順',
      key: 'order',
    },
    {
      header: '公開状況',
      key: 'publicationStatus',
      width: 2,
      converter: (row) => convertPublication[row.publicationStatus],
    },
    {
      header: '編集',
      key: 'action',
      renderCell: (row) => (
        <EditBtn
          as={Link}
          linkProps={{ href: `${routers.WORKS_EDIT}${row.id}` }}
          customClassName={tableElementClassName}
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
        onSubmit={() => {}}
      />
    </>
  )
}
