import { ListCard } from '@/components/elements/card/ListCard'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import { Metadata } from 'next'
import axios from 'axios'
import { cookies } from 'next/headers'
import { ADMIN_API_URL } from '@/utils/const'
import { axiosClient } from '@/utils/axios'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '管理者情報',
}

const getDashboard = async (): Promise<any> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axiosClient.get(`${ADMIN_API_URL}/dashboard`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
    return []
  }
}

const getAuthData = async (): Promise<any> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${ADMIN_API_URL}/auth`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
    return []
  }
}

export default async function Home() {
  const userData = await getAuthData()
  const accountData = [
    ,
    { title: 'id', value: userData.id },
    { title: 'email', value: userData.email },
  ]

  const data = await getDashboard()
  const countData = [
    {
      title: '制作実績',
      count: data.workCount,
    },
    { title: 'ユーザー', count: data.userCount },
    {
      title: 'ツール',
      count: data.toolCount,
    },
  ]

  const authData = await getAuthData()
  return (
    <section>
      <PrimaryHeadline tag="h1">管理者情報</PrimaryHeadline>
      <ul className="flex flex-col mt-[2em] gap-[1em]">
        {accountData.map((data, index) => (
          <ListCard key={index}>
            <div className="grid grid-cols-[6em_1fr] gap-[1em] px-[2em]">
              <p>{data?.title}</p>
              <p>{data?.value}</p>
            </div>
          </ListCard>
        ))}
      </ul>
      <div className="mt-[4em]">
        <PrimaryHeadline tag="h2">ダッシュボード</PrimaryHeadline>
        <ul className="grid grid-cols-3 mt-[2em] gap-[1em]">
          {countData.map((data, index) => (
            <ListCard key={index}>
              <div className="flex-center flex-col gap-[.6em]">
                <p>{data.title}</p>
                <p>{data.count} 件</p>
              </div>
            </ListCard>
          ))}
        </ul>
      </div>
    </section>
  )
}
