import { PrimaryHeadline } from '@/components/elements/headline/PrimaryHeadline'
import { WorkForm } from '../../../features/works/main/components/WorkForm'
import type { Metadata } from 'next'
import axios from 'axios'
import { cookies } from 'next/headers'
import { ToolData } from '@/types/api/admin'
import { baseURL, toolApiUrl } from '@/utils/apiUrl'

export const metadata: Metadata = {
  title: '新規作成',
}

const getToolList = async (): Promise<ToolData[]> => {
  const cookie = cookies()
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  try {
    const res = await axios.get(`${baseURL}${toolApiUrl.all}`, {
      headers: { cookie },
    })
    return res.data
  } catch (error) {
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
        <WorkForm SSRToolData={toolData} formType={'create'} />
      </div>
    </section>
  )
}
