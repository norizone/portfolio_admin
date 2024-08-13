import { ListCard } from '@/components/elements/card/ListCard'
import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { AuthData, ResDashboardData } from '@/types/api/admin'
import { authApiUrl, baseURL, dashboardApiUrl } from '@/utils/apiUrl'
import { fetchError } from '@/utils/fetchError'

export const metadata: Metadata = {
  title: '管理者情報',
}

const SSRData = async (): Promise<{ authData: AuthData, dashboardData: ResDashboardData }> => {
  let resStatus: Response['status'] = 0;
  try {
    const cookie = cookies()
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')

    const [authRes, dashboardRes] = await Promise.all([
      fetch(`${baseURL}${authApiUrl.default}`, {
        headers: { cookie },
        cache: "no-store",
      }),

      fetch(`${baseURL}${dashboardApiUrl.default}`, {
        headers: { cookie },
        cache: "no-store",
      })
    ])

    if (!authRes.ok) {
      resStatus = authRes.status
      throw new Error(`Auth API error: ${authRes.status}`);
    }
    if (!dashboardRes.ok) {
      resStatus = authRes.status
      throw new Error(`Auth API error: ${authRes.status}`);
    }

    return {
      authData: await authRes.json(),
      dashboardData: await dashboardRes.json()
    }
  } catch (error) {
    return {
      authData: {},
      dashboardData: {}
    }
  }
  if (resStatus !== 0) fetchError(resStatus)
}

export default async function Home() {
  const { authData, dashboardData } = await SSRData()
  const accountData = [
    { title: 'id', value: authData?.id ?? '' },
    { title: 'email', value: authData?.email ?? '' },
  ]

  const countData = [
    {
      title: '制作実績',
      count: dashboardData?.workCount ?? 0,
    },
    { title: 'ユーザー', count: dashboardData?.userCount ?? 0 },
    {
      title: 'ツール',
      count: dashboardData?.toolCount ?? 0,
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
