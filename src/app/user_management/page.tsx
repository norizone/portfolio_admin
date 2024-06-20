'use client'
import { PrimaryBtn } from '@/components/btn/PrimaryBtn'
import { PrimaryHeadline } from '@/components/headline/PrimaryHeadline'
import { PrimaryPagination } from '@/components/pagination/PrimaryPagination'
import PrimaryTable from '@/components/table/PrimaryTable'
import Link from 'next/link'
import { UserList } from './_components/UserList'

export default function UserManagement() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        ユーザー一覧
      </PrimaryHeadline>
      <div className="mt-[2em] w-max ml-auto">
        <PrimaryBtn
          as={Link}
          btnColor="primary"
          linkProps={{
            href: '',
          }}
        >
          新規作成
        </PrimaryBtn>
      </div>
      <UserList />
    </section>
  )
}
