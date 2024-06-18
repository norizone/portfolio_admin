'use client'
import { PrimaryPagination } from '@/components/pagination/PrimaryPagination'
import { useState } from 'react'
import { useFixBody } from '@/hooks/useFixeBody'
import { DeleteModal } from '@/components/modal/DeleatModal'
import { converterPublication } from '@/utils/converter'
import PrimaryTable from '@/components/table/PrimaryTable'
import { EditBtn } from '@/components/btn/EditBtn'
import { DeleteBtn } from '@/components/btn/DeleteBtn'
import { ColumnsType } from '@/components/table/PrimaryTable/type'
import { PUBLICATION_STATUS } from '@/utils/enum'
import Link from 'next/link'
import { routers } from '@/routers/routers'

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

export const ListWorks = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>()
  const { fixBody, unfixedBody } = useFixBody()
  const handleOpenModal = () => {
    isOpenModal ? unfixedBody() : fixBody()
    setIsOpenModal(!isOpenModal)
  }

  const handleDeleteModal = (id: number) => {
    handleOpenModal()
    setDeleteId(id)
  }

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
      converter: (row) => converterPublication(row.publicationStatus),
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
          onClick={() => handleDeleteModal(row.id)}
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
        isOpen={isOpenModal}
        handleOpenModal={handleOpenModal}
        modalType="confirm"
        onSubmit={() => {}}
      />
    </>
  )
}
