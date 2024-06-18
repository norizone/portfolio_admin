'use client'
import { PrimaryBtn } from '@/components/btn/PrimaryBtn'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import { PrimaryPagination } from '@/components/pagination/PrimaryPagination'
import PrimaryTable from '@/components/table/PrimaryTable'

export default function UserManagement() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        ユーザー一覧
      </PrimaryHeadline>
      <div className="mt-[2em] text-right">
        <PrimaryBtn
          onClick={(e) => {
            e.preventDefault
          }}
          btnColor="primary"
          btnProps={{
            type: 'button',
          }}
        >
          新規作成
        </PrimaryBtn>
      </div>
      <div className="mt-[2em]">{/* <PrimaryTable/> */}</div>
      <div className="mt-[2em]">
        <PrimaryPagination totalPage={20} currentPage={3} />
      </div>
    </section>
  )
}
