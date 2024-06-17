'use client'
import BaseBtn from '@/components/btn/BaseBtn'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import { BasePagination } from '@/components/pagination/BasePagination'
import { BaseTable } from '@/components/table/BaseTable'

export default function UserManagement() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        ユーザー一覧
      </PrimaryHeadline>
      <div className="mt-[2em] text-right">
        <BaseBtn
          onClick={(e) => {
            e.preventDefault
          }}
          btnColor="primary"
          btnProps={{
            type: 'button',
          }}
        >
          新規作成
        </BaseBtn>
      </div>
      <div className="mt-[2em]">
        <BaseTable />
      </div>
      <div className="mt-[2em]">
        <BasePagination totalPage={20} currentPage={3} />
      </div>
    </section>
  )
}
