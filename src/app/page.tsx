import { ListCard } from '@/components/elements/card/ListCard'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { AuthData, ResDashboardData } from '@/types/api/admin'
import { authApiUrl, baseURL, dashboardApiUrl } from '@/utils/apiUrl'

export const metadata: Metadata = {
  title: '管理者情報',
}

const getDashboard = async (): Promise<ResDashboardData> => {
  try {
    const cookie = cookies()
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')
    const res = await fetch(`${baseURL}${dashboardApiUrl.default}`, {
      headers: { cookie: cookies().toString(), },
      cache: "no-store",
      mode: "cors"
    })
    return res.json()
  } catch (error) {
    console.log(error)
    console.log(cookies().toString())
    return {}
  }
}

const getAuthData = async (): Promise<AuthData> => {
  try {
    const cookie = cookies()
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')
    const res = await fetch(`${baseURL}${authApiUrl.default}`, {
      headers: { cookie },
      cache: "no-store",
      mode: 'cors'
    })
    return res.json()
  } catch (error) {
    console.log(error)
    return {}
  }
}

export default async function Home() {
  const userData = await getAuthData()
  const accountData = [
    { title: 'id', value: userData.id },
    { title: 'email', value: userData.email },
  ]

  const data = await getDashboard()
  const countData = [
    {
      title: '制作実績',
      count: data?.workCount ?? 0,
    },
    { title: 'ユーザー', count: data?.userCount ?? 0 },
    {
      title: 'ツール',
      count: data?.toolCount ?? 0,
    },
  ]

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
