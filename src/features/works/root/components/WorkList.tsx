'use client'
import { PrimaryPagination } from '@/components/elements/pagination/PrimaryPagination'
import { useState } from 'react'
import { DeleteModal } from '@/components/elements/modal/DeleatModal'
import { convertPublication, convertViewPermission } from '@/utils/converter'
import PrimaryTable from '@/components/elements/table/PrimaryTable'
import { EditBtn } from '@/components/elements/btn/EditBtn'
import { DeleteBtn } from '@/components/elements/btn/DeleteBtn'
import { ColumnsType } from '@/components/elements/table/PrimaryTable/type'
import { PUBLICATION_STATUS, VIEW_PERMISSION } from '@/utils/enum'
import Link from 'next/link'
import { routers } from '@/routers/routers'
import { useGetWorkList, useGetWorkListAll } from '@/hooks/api/admin.hooks'
import { styleTableTRPadding } from '@/styles/style'
import { WorkListItemWithOrder, WorkListRes } from '@/types/api/admin'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { useCompleteModal } from '@/hooks/ui/useCompleteModal'
import { useDeleteWork } from '../hooks/useDeleteWork'
import { DragBtn } from '@/components/elements/btn/DragBtn'
import { useEditOrderWoke } from '../hooks/useEditOrderWork'

type Props = {
  SSRData?: WorkListItemWithOrder[]
}

type WorkList = {
  id: number
  title: string
  permission: VIEW_PERMISSION
  publication: PUBLICATION_STATUS,
  order: number
}

export const WorkList = (props: Props) => {
  const { SSRData } = props
  const { data, isPending } = useGetWorkListAll(SSRData)

  const {
    completeMessage,
    setCompleteMessage,
    isOpenCompleteModal,
    toggleCompleteModal,
  } = useCompleteModal()

  const {
    deleteTitle,
    onDeleteSubmit,
    isLoadingDelete,
    isOpenDeleteModal,
    onClickDelete,
    isErrorDelete,
    deleteError,
    toggleDeleteModal,
  } = useDeleteWork(setCompleteMessage, toggleCompleteModal)

  const { onEditOrder } = useEditOrderWoke(data)

  const tableColumns: ColumnsType<WorkList>[] = [
    {
      header: '',
      key: 'drag',
      width: 0.5,
      renderCell: (row) => (
        <DragBtn
          customClassName={styleTableTRPadding}
        />
      ),
    },
    {
      header: 'ID',
      key: 'id',
      tHeaderTHClassName: styleTableTRPadding,
    },
    {
      header: 'タイトル',
      key: 'title',
      width: 4,
    },
    {
      header: '表示権限',
      key: 'permission',
      converter: (row) => convertViewPermission[row.permission],
      width: 2,
    },
    {
      header: '公開状況',
      key: 'publication',
      width: 1,
      converter: (row) => convertPublication[row.publication],
    },
    {
      header: '編集',
      key: 'action',
      renderCell: (row) => (
        <EditBtn
          as={Link}
          linkProps={{ href: `${routers.WORKS_EDIT}${row.id}` }}
          customClassName={styleTableTRPadding}
        />
      ),
    },
    {
      header: '削除',
      key: 'action',
      renderCell: (row) => (
        <DeleteBtn
          customClassName={styleTableTRPadding}
          onClick={() =>
            onClickDelete({
              id: row.id,
              title: row.title,
            })
          }
        />
      ),
    },
  ]

  return (
    <>
      <div className="mt-[2em]">
        <PrimaryTable columns={tableColumns} data={data} handleDragEnd={onEditOrder} />
      </div>
      <DeleteModal
        title={`${deleteTitle}を削除しますか？`}
        isOpen={isOpenDeleteModal}
        handleToggleModal={toggleDeleteModal}
        onSubmit={onDeleteSubmit}
        isLoading={isLoadingDelete}
        isError={isErrorDelete}
        errorMessage={deleteError}
      />
      <CompleteModal
        isOpen={isOpenCompleteModal}
        completeText={completeMessage}
        handleToggleModal={toggleCompleteModal}
      />
    </>
  )
}
