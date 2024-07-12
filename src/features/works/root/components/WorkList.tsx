'use client'
import { PrimaryPagination } from '@/components/elements/pagination/PrimaryPagination'
import { useMemo, useState } from 'react'
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
import { useGetWorkList, useMutateDeleteWork } from '@/hooks/api/admin.hooks'
import { styleTableTRPadding } from '@/styles/style'
import { WorkListRes } from '@/types/api/admin'
import { CompleteModal } from '@/components/elements/modal/CompletModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { workKeys } from '@/hooks/api/queryKey'

type Props = {
  SSRData?: WorkListRes
  pageSize?: number
  defaultPage?: number
}

type WorkList = {
  id: number
  title: string
  order: number
  publication: PUBLICATION_STATUS
}

export const WorkList = (props: Props) => {
  const { SSRData, pageSize = 1, defaultPage = 1 } = props
  const [page, setPage] = useState(defaultPage)
  const [deleteId, setDeleteId] = useState<number>()
  const [selectTitle, setSelectTitle] = useState<string>()
  const { data, isPending } = useGetWorkList({ page, pageSize }, SSRData)
  const queryClient = useQueryClient()

  const { isOpenModal: isOpenDeleteModal, toggleModal: toggleDeleteModal } =
    useToggleModal()

  const { mutate: mutateDelete, isPending: isLoadingDelete } =
    useMutateDeleteWork()

  const onDeleteSubmit = () => {
    if (!deleteId) return
    mutateDelete(deleteId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: workKeys.list({ page, pageSize }),
        })
        toggleDeleteModal()
      },
      onError: () => {},
    })
  }

  const tableColumns: ColumnsType<WorkList>[] = [
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
      header: '並び順',
      key: 'order',
    },
    {
      header: '公開状況',
      key: 'publication',
      width: 2,
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
          onClick={() => {
            toggleDeleteModal()
            setSelectTitle(row.title)
            setDeleteId(row.id)
          }}
        />
      ),
    },
  ]

  return (
    <>
      <div className="mt-[2em]">
        <PrimaryTable columns={tableColumns} data={data?.items} />
      </div>
      <div className="mt-[2em]">
        {data && data?.totalPages > 1 && (
          <PrimaryPagination
            totalPage={data?.totalPages}
            currentPage={page}
            onClick={setPage}
          />
        )}
      </div>
      <DeleteModal
        title={`${selectTitle}を削除しますか？`}
        isOpen={isOpenDeleteModal}
        handleToggleModal={toggleDeleteModal}
        onSubmit={onDeleteSubmit}
      />
    </>
  )
}
