import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { ToolClient } from '../../features/tool/root/components/ToolClient'
import { cookies } from 'next/headers'
import { ToolData } from '@/types/api/admin'
import { baseURL, toolApiUrl } from '@/utils/apiUrl'
import { fetchError } from '@/utils/fetchError'

export const metadata: Metadata = {
  title: 'ツール一覧',
}
const getToolList = async (): Promise<ToolData[]> => {
  let resStatus: Response['status'] = 0
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await fetch(`${baseURL}${toolApiUrl.all()}`, {
      headers: { cookie },
      cache: "no-store"
    })
    if (!res.ok) {
      resStatus = res.status
      throw new Error(`HTTPエラー: ステータスコード ${res.status}`);
    }
    return await res.json()
  } catch (error) {
    fetchError(resStatus)
    return []
  }
}

export default async function Tool() {
  const data = await getToolList()
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        ツール一覧
      </PrimaryHeadline>
      <ToolClient SSRData={data} />
    </section>
  )
}
