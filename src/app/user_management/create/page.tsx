import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { UserCreate } from '../_components/UserCreate'

export const metadata: Metadata = {
  title: 'ユーザー新規作成',
}

export default function UserManagement() {
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        ユーザー新規作成
      </PrimaryHeadline>
      <UserCreate />
    </section>
  )
}
