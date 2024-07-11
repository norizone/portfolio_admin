import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import Link from 'next/link'
import { UserList } from '../../features/user/root/components/UserList'
import { routers } from '@/routers/routers'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ADMIN_API_URL } from '@/utils/const'
import { UserData } from '@/types/api/admin'
import axios from 'axios'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'ユーザー一覧',
}

const getUserList = async (): Promise<UserData[]> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${ADMIN_API_URL}/user/list`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
    console.log(error)
    notFound()
  }
}

export default async function UserManagement() {
  const data = await getUserList()
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
            href: routers.USER_CREATE,
          }}
        >
          新規作成
        </PrimaryBtn>
      </div>
      <UserList SSRData={data} />
    </section>
  )
}
