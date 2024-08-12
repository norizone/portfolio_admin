import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ToolData } from '@/types/api/admin'
import { baseURL, toolApiUrl } from '@/utils/apiUrl'
import { CreateForm } from '@/features/works/create/components/CreateForm'
import { fetchError } from '@/utils/fetchError'

export const metadata: Metadata = {
  title: '新規作成',
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

export default async function Works() {
  const toolData = await getToolList()
  return (
    <section>
      <PrimaryHeadline lang="jp" tag="h1">
        制作実績 新規作成
      </PrimaryHeadline>
      <div className="mt-[3em]">
        <CreateForm SSRToolData={toolData} />
      </div>
    </section>
  )
}
