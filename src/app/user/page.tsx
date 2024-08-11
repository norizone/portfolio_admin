import { PrimaryBtn } from '@/components/elements/btn/PrimaryBtn'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import Link from 'next/link'
import { UserList } from '../../features/user/root/components/UserList'
import { routers } from '@/routers/routers'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { UserData } from '@/types/api/admin'
import axios from 'axios'
import { baseURL, userApiUrl } from '@/utils/apiUrl'

export const metadata: Metadata = {
  title: 'ユーザー一覧',
}

const getUserList = async (): Promise<UserData[]> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await fetch(`${baseURL}${userApiUrl.all()}`, {
      headers: { cookie },
      cache: "no-store"
    })
    return await res.json()
  } catch (error) {
    console.log(error)
    return []
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
