'use client'
import { BaseBtn } from '@/components/btn/BaseBtn'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import { BasePagination } from '@/components/pagination/BasePagination'
import { BaseTable } from '@/components/table/BaseTable'

export default function Works() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績一覧
      </PrimaryHeadline>
      <div className="mt-[2em] text-right">
        <BaseBtn
          onClick={(e) => {
            e.preventDefault
          }}
          btnColor="primary"
        >
          新規作成
        </BaseBtn>
      </div>
      <div className="mt-[2em]">
        <BaseTable />
      </div>
      <div className="mt-[2em]">
        <BasePagination allPage={20} currentPage={3} />
      </div>
    </section>
  )
}
